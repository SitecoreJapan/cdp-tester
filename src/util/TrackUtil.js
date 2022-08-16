export default function sendEvent(json, callback) {
    if(window.Boxever === undefined || window._boxeverq === undefined) return;
    window._boxeverq.push(() => {
       window.Boxever.eventCreate(json, data => {
           if(callback && typeof callback === "function") {
               callback(data);
           }
       }, 'json');
    });
};

export function generateTrackingCode(json) {
    let code = `_boxeverq.push(function() { 
    var event = ${JSON.stringify(json, null, "\t").replaceAll("\n", "\n\t")}
    Boxever.eventCreate(event, function(data){}, 'json');
});`;
    return code;
}

export function generateActivationCode(trackingSetting) {
    let code =
`var _boxeverq = _boxeverq || [];

var _boxever_settings = {
    client_key: '${trackingSetting.client_key ? trackingSetting.client_key : ""}',
    target: '${trackingSetting.target}',
    cookie_domain: '${trackingSetting.cookie_domain}',
    javascriptLibraryVersion: '${trackingSetting.javascriptLibraryVersion}',
    pointOfSale: '${trackingSetting.pointOfSale}',
    web_flow_target: '${trackingSetting.web_flow_target}',
    web_flow_config: { async: ${trackingSetting.web_flow_config.async}, defer: ${trackingSetting.web_flow_config.defer} }
};
 
(function() {
     var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;  
     s.src = 'https://d1mj578wat5n4o.cloudfront.net/boxever-${trackingSetting.javascriptLibraryVersion}.min.js';
     var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
})();`;
    return code;
}

export function generateJson(parameter) {
    let json = {};
    for(const prop in parameter) {
        if(prop === "identifier") {
            // change parameter.identifier format to sitecore cdp's identifiers format
            let identifier = {...parameter.identifier};

            if(identifier.id && identifier.provider) {
                if(identifier.expiry_date) {
                    identifier.expiry_date = (new Date(identifier.expiry_date)).toISOString();
                } else {
                    delete identifier.expiry_date;
                }
                // identifier should be array and paremeter name is identifiers
                json.identifiers = [{...identifier}];
            }
        } else if(prop === "product") {
            // check if parameter.product has empty attributes
            let product = {...parameter.product};
            if(product.orderedAt) {
                product.orderedAt = (new Date(product.orderedAt)).toISOString();

            }
            if(parameter.type === "CONFIRM") {
                if(product && product.item_id) {
                    // CONFIRM event format
                    json[prop] = [{item_id: product.item_id}];
                }
            } else {
                if(product
                    && product.type
                    && product.item_id
                    && product.name
                    && product.orderedAt
                    && product.quantity
                    && product.price
                    && product.productId
                    && product.currency
                    && product.referenceId) {
                    // ADD event format
                    if(!product.originalPrice) delete product.originalPrice;
                    if(!product.originalCurrencyCode) delete product.originalCurrencyCode;
                    json[prop] = product;
                }
            }
        } else if(prop === "contact") {
            // check if parameter.contact has empty attributes and change format to sitecore cdp's contact format
            let contact = {...parameter.contact};
            if(contact
                && contact.identifier
                && contact.identifier.id
                && contact.identifier.provider) {
                // identifier format change
                let contactIdentifier = {...contact.identifier};
                if(contactIdentifier.expiry_date) {
                    contactIdentifier.expiry_date = (new Date(contactIdentifier.expiry_date)).toISOString();
                } else {
                    delete contactIdentifier.expiry_date;
                }
                contact = {...contact, identifiers: [{...contactIdentifier}]};
                delete contact.identifier; // identifier should be identifiers, delete contact.identifier pro

                // birthday format change
                if(contact.dob) {
                    contact.dob = (new Date(contact.dob)).toISOString();
                }
                // street should be an array
                if(contact.street) {
                    contact.street = [contact.street];
                }
                // delete empty attributes
                for(const contactProp in contact) {
                    if(!contact[contactProp]) delete contact[contactProp];
                }

                // contact should be array
                json[prop] = [{...contact}];
            }
        } else if(prop === "dob") {
            if(parameter.dob) {
                json[prop] = (new Date(parameter.dob)).toISOString();
            }
        } else if(prop === "street") {
            if(parameter.street) {
                json[prop] = [parameter.street]
            }
        } else if(prop === "order") {
            let order = {...parameter.order};
            if(order
                && order.referenceId
                && order.orderedAt
                && order.status
                && order.currencyCode
                && order.price
                && order.paymentType
                && order.orderItem
            ) {
                let orderItem = {...order.orderItem};
                delete order.orderItem;
                orderItem.orderedAt = (new Date(orderItem.orderedAt)).toISOString();
                order.orderItems = [{...orderItem}];
                order.orderedAt = (new Date(order.orderedAt)).toISOString();
                json[prop] = {...order};
            }
        } else if(parameter[prop]) {
            json[prop] = parameter[prop];
        }
    }

    return json;
}

export function convertJsonToParameter(json, currentParam = {}) {
    let newParam = {...currentParam};

    for(const prop in json) {
        if(prop === "identifiers") {
            // convert identifiers array to identifier object
            if(json[prop] instanceof Array && json[prop].length > 0) {
                let identifier = {...json[prop][0]};
                newParam.identifier = {...newParam.identifier, ...identifier};
            }
        } else if(prop === "product") {
            let product = {...json[prop]};
            if(product.orderedAt) {
                let orderedAt = new Date(product.orderedAt);
                if(!Number.isNaN(orderedAt.getTime())) {
                    orderedAt = (orderedAt.toISOString()).split("T")[0];
                }
                product.orderedAt = orderedAt;
            } else {
                delete product.orderedAt;
            }
            if(json.type === "CONFIRM") {
                // convert product array to product object and merge product parameter
                if(product && product instanceof Array && product.length > 0) {
                    newParam.product = {...newParam.product, ...product[0]}; // convert array to a object
                }
            } else {
                // merge product parameter
                newParam.product = {...newParam.product, ...product};
            }
        } else if(prop === "contact") {
            if(json[prop] instanceof Array && json[prop].length > 0) {
                let contact = {...json[prop][0]};
                // convert street array to street string
                if(contact.street && contact.street instanceof Array && contact.street.length > 0) {
                    contact.street = contact.street[0];
                } else {
                    delete contact.street;
                }
                // convert ISO datetime string to local date string
                if(contact.dob) {
                    let dob = new Date(contact.dob);
                    if(!Number.isNaN(dob.getTime())) {
                        contact.dob = (dob.toISOString()).split("T")[0];
                    } else {
                        // if format is wrong, delete the property to avoid change wrong value
                        delete contact.dob;
                    }
                }
                // convert identifiers array to identifier object
                if(contact.identifiers && contact.identifiers instanceof Array && contact.identifiers.length > 0) {
                    let identifier = {...contact.identifiers[0]};
                    contact.identifier = identifier;
                }
                delete contact.identifiers;
                // merge contact parameter
                newParam.contact = {...newParam.contact, ...contact};
            }
        } else if(prop === "dob") {
            // convert ISO datetime string to local date string
            let dob = json[prop];
            dob = new Date(dob);
            if(!Number.isNaN(dob.getTime())) {
                newParam[prop] = (dob.toISOString()).split("T")[0];
            }
        } else if(prop === "street") {
            // convert street array to street string
            if(json[prop] instanceof Array && json[prop].length > 0) {
                newParam[prop] = json[prop][0];
            }
        } else if(prop === "order") {
            let order = {...json[prop]};
            if(order.orderedAt) {
                // convert ISO datetime string to local date string
                let orderedAt = new Date(order.orderedAt);
                if(!Number.isNaN(orderedAt.getTime())) {
                    order.orderedAt = (orderedAt.toISOString()).split("T")[0];
                } else {
                    // if format is wrong, delete the property to avoid change wrong value
                    delete order.orderedAt;
                }
            }
            // convert orderItems array to orderItem object
            if(order.orderItems && order.orderItems instanceof Array && order.orderItems.length > 0) {
                let orderItem = {...order.orderItems[0]};
                if(orderItem.orderedAt) {
                    // convert ISO datetime string to local date string
                    let orderedAt = new Date(orderItem.orderedAt);
                    if(!Number.isNaN(orderedAt.getTime())) {
                        orderItem.orderedAt = (orderedAt.toISOString()).split("T")[0];
                    } else {
                        delete orderItem.orderedAt;
                    }
                }
                order.orderItem = orderItem;
            }
            delete order.orderItems;
            newParam.order = {...newParam.order, ...order};
        } else {
            newParam[prop] = json[prop];
        }
    }

    return newParam;
}