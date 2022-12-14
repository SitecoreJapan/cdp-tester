export function createInitialValue(type, pos) {
    return {
        channel: "WEB",
        type: type,
        language: "en",
        currency: "USD",
        page: "/",
        pos: pos,
        browser_id: "",
        product_name: "",
        product_type: "",
        identifier: {
            id: "",
            provider: "",
            expiry_date: ""
        },
        email: "",
        title: "",
        firstname: "",
        lastname: "",
        gender: "",
        dob: "",
        mobile: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        product: {
            type: "",
            item_id: "",
            name: "",
            orderedAt: "",
            quantity: 0,
            price: 0.0,
            productId: "",
            currency: "USD",
            originalPrice: 0,
            originalCurrencyCode: "",
            referenceId: ""
        },
        contact: {
            title: "",
            firstname: "",
            lastname: "",
            mobile: "",
            phone: "",
            street: "",
            city: "",
            state: "",
            country_code:"",
            postal_code:"",
            dob: "",
            email: "",
            gender: "",
            identifier: {
                id: "",
                provider: "",
                expiry_date: ""
            }
        },
        reference_id: "",
        status: "",
        order: {
            referenceId: "",
            orderedAt: "",
            status: "",
            currencyCode: "",
            price: 0,
            paymentType: "Card",
            cardType: "Mastercard",
            orderItem: {
                type: "",
                referenceId: "",
                orderedAt: "",
                status: "",
                currencyCode: "",
                price: 0,
                name: "",
                productId: "",
                quantity: 0
            }
        }
    };
}

export function getChannelOptions() {
    return (
        <>
            <option value="WEB">WEB</option>
            <option value="MOBILE_WEB">MOBILE_WEB</option>
            <option value="MOBILE_APP">MOBILE_APP</option>
        </>
    );
}

export function getTypeOptions(type) {
    return(
        <>
            {(() => {
                if(type === "VIEW") {
                    return <option value="VIEW">VIEW</option>;
                } else if (type === "SEARCH") {
                    return <option value="SEARCH">SEARCH</option>;
                } else if (type === "IDENTITY") {
                    return <option value="IDENTITY">IDENTITY</option>;
                } else if (type === "ADD") {
                    return <option value="ADD">ADD</option>;
                } else if (type === "ADD_CONTACTS") {
                    return <option value="ADD_CONTACTS">ADD_CONTACTS</option>;
                } else if (type === "CONFIRM") {
                    return <option value="CONFIRM">CONFIRM</option>;
                } else if (type === "CHECKOUT") {
                    return <option value="CHECKOUT">CHECKOUT</option>;
                } else if (type === "ORDER_CHECKOUT") {
                    return <option value="ORDER_CHECKOUT">ORDER_CHECKOUT</option>;
                } else {
                    return (
                        <>
                            <option value="VIEW">VIEW</option>
                            <option value="SEARCH">SEARCH</option>
                            <option value="IDENTITY">IDENTITY</option>
                            <option value="ADD">ADD</option>
                            <option value="ADD_CONTACTS">ADD_CONTACTS</option>
                            <option value="CONFIRM">CONFIRM</option>
                            <option value="CHECKOUT">CHECKOUT</option>
                            <option value="ORDER_CHECKOUT">ORDER_CHECKOUT</option>
                        </>
                    );
                }
            })()}
        </>
    );
}

export function getLanguageOptions() {
    return (
        <>
            <option value="af">Afrikaans</option>
            <option value="sq">Albanian - shqip</option>
            <option value="am">Amharic - ????????????</option>
            <option value="ar">Arabic - ??????????????</option>
            <option value="an">Aragonese - aragon??s</option>
            <option value="hy">Armenian - ??????????????</option>
            <option value="ast">Asturian - asturianu</option>
            <option value="az">Azerbaijani - az??rbaycan dili</option>
            <option value="eu">Basque - euskara</option>
            <option value="be">Belarusian - ????????????????????</option>
            <option value="bn">Bengali - ???????????????</option>
            <option value="bs">Bosnian - bosanski</option>
            <option value="br">Breton - brezhoneg</option>
            <option value="bg">Bulgarian - ??????????????????</option>
            <option value="ca">Catalan - catal??</option>
            <option value="ckb">Central Kurdish - ?????????? (???????????????? ????????????)</option>
            <option value="zh">Chinese - ??????</option>
            <option value="zh-HK">Chinese (Hong Kong) - ??????????????????</option>
            <option value="zh-CN">Chinese (Simplified) - ??????????????????</option>
            <option value="zh-TW">Chinese (Traditional) - ??????????????????</option>
            <option value="co">Corsican</option>
            <option value="hr">Croatian - hrvatski</option>
            <option value="cs">Czech - ??e??tina</option>
            <option value="da">Danish - dansk</option>
            <option value="nl">Dutch - Nederlands</option>
            <option value="en">English</option>
            <option value="en-AU">English (Australia)</option>
            <option value="en-CA">English (Canada)</option>
            <option value="en-IN">English (India)</option>
            <option value="en-NZ">English (New Zealand)</option>
            <option value="en-ZA">English (South Africa)</option>
            <option value="en-GB">English (United Kingdom)</option>
            <option value="en-US">English (United States)</option>
            <option value="eo">Esperanto - esperanto</option>
            <option value="et">Estonian - eesti</option>
            <option value="fo">Faroese - f??royskt</option>
            <option value="fil">Filipino</option>
            <option value="fi">Finnish - suomi</option>
            <option value="fr">French - fran??ais</option>
            <option value="fr-CA">French (Canada) - fran??ais (Canada)</option>
            <option value="fr-FR">French (France) - fran??ais (France)</option>
            <option value="fr-CH">French (Switzerland) - fran??ais (Suisse)</option>
            <option value="gl">Galician - galego</option>
            <option value="ka">Georgian - ?????????????????????</option>
            <option value="de">German - Deutsch</option>
            <option value="de-AT">German (Austria) - Deutsch (??sterreich)</option>
            <option value="de-DE">German (Germany) - Deutsch (Deutschland)</option>
            <option value="de-LI">German (Liechtenstein) - Deutsch (Liechtenstein)</option>
            <option value="de-CH">German (Switzerland) - Deutsch (Schweiz)</option>
            <option value="el">Greek - ????????????????</option>
            <option value="gn">Guarani</option>
            <option value="gu">Gujarati - ?????????????????????</option>
            <option value="ha">Hausa</option>
            <option value="haw">Hawaiian - ????lelo Hawai??i</option>
            <option value="he">Hebrew - ??????????</option>
            <option value="hi">Hindi - ??????????????????</option>
            <option value="hu">Hungarian - magyar</option>
            <option value="is">Icelandic - ??slenska</option>
            <option value="id">Indonesian - Indonesia</option>
            <option value="ia">Interlingua</option>
            <option value="ga">Irish - Gaeilge</option>
            <option value="it">Italian - italiano</option>
            <option value="it-IT">Italian (Italy) - italiano (Italia)</option>
            <option value="it-CH">Italian (Switzerland) - italiano (Svizzera)</option>
            <option value="ja">Japanese - ?????????</option>
            <option value="kn">Kannada - ???????????????</option>
            <option value="kk">Kazakh - ?????????? ????????</option>
            <option value="km">Khmer - ???????????????</option>
            <option value="ko">Korean - ?????????</option>
            <option value="ku">Kurdish - Kurd??</option>
            <option value="ky">Kyrgyz - ????????????????</option>
            <option value="lo">Lao - ?????????</option>
            <option value="la">Latin</option>
            <option value="lv">Latvian - latvie??u</option>
            <option value="ln">Lingala - ling??la</option>
            <option value="lt">Lithuanian - lietuvi??</option>
            <option value="mk">Macedonian - ????????????????????</option>
            <option value="ms">Malay - Bahasa Melayu</option>
            <option value="ml">Malayalam - ??????????????????</option>
            <option value="mt">Maltese - Malti</option>
            <option value="mr">Marathi - ???????????????</option>
            <option value="mn">Mongolian - ????????????</option>
            <option value="ne">Nepali - ??????????????????</option>
            <option value="no">Norwegian - norsk</option>
            <option value="nb">Norwegian Bokm??l - norsk bokm??l</option>
            <option value="nn">Norwegian Nynorsk - nynorsk</option>
            <option value="oc">Occitan</option>
            <option value="or">Oriya - ???????????????</option>
            <option value="om">Oromo - Oromoo</option>
            <option value="ps">Pashto - ????????</option>
            <option value="fa">Persian - ??????????</option>
            <option value="pl">Polish - polski</option>
            <option value="pt">Portuguese - portugu??s</option>
            <option value="pt-BR">Portuguese (Brazil) - portugu??s (Brasil)</option>
            <option value="pt-PT">Portuguese (Portugal) - portugu??s (Portugal)</option>
            <option value="pa">Punjabi - ??????????????????</option>
            <option value="qu">Quechua</option>
            <option value="ro">Romanian - rom??n??</option>
            <option value="mo">Romanian (Moldova) - rom??n?? (Moldova)</option>
            <option value="rm">Romansh - rumantsch</option>
            <option value="ru">Russian - ??????????????</option>
            <option value="gd">Scottish Gaelic</option>
            <option value="sr">Serbian - ????????????</option>
            <option value="sh">Serbo-Croatian - Srpskohrvatski</option>
            <option value="sn">Shona - chiShona</option>
            <option value="sd">Sindhi</option>
            <option value="si">Sinhala - ???????????????</option>
            <option value="sk">Slovak - sloven??ina</option>
            <option value="sl">Slovenian - sloven????ina</option>
            <option value="so">Somali - Soomaali</option>
            <option value="st">Southern Sotho</option>
            <option value="es">Spanish - espa??ol</option>
            <option value="es-AR">Spanish (Argentina) - espa??ol (Argentina)</option>
            <option value="es-419">Spanish (Latin America) - espa??ol (Latinoam??rica)</option>
            <option value="es-MX">Spanish (Mexico) - espa??ol (M??xico)</option>
            <option value="es-ES">Spanish (Spain) - espa??ol (Espa??a)</option>
            <option value="es-US">Spanish (United States) - espa??ol (Estados Unidos)</option>
            <option value="su">Sundanese</option>
            <option value="sw">Swahili - Kiswahili</option>
            <option value="sv">Swedish - svenska</option>
            <option value="tg">Tajik - ????????????</option>
            <option value="ta">Tamil - ???????????????</option>
            <option value="tt">Tatar</option>
            <option value="te">Telugu - ??????????????????</option>
            <option value="th">Thai - ?????????</option>
            <option value="ti">Tigrinya - ????????????</option>
            <option value="to">Tongan - lea fakatonga</option>
            <option value="tr">Turkish - T??rk??e</option>
            <option value="tk">Turkmen</option>
            <option value="tw">Twi</option>
            <option value="uk">Ukrainian - ????????????????????</option>
            <option value="ur">Urdu - ????????</option>
            <option value="ug">Uyghur</option>
            <option value="uz">Uzbek - o???zbek</option>
            <option value="vi">Vietnamese - Ti???ng Vi???t</option>
            <option value="wa">Walloon - wa</option>
            <option value="cy">Welsh - Cymraeg</option>
            <option value="fy">Western Frisian</option>
            <option value="xh">Xhosa</option>
            <option value="yi">Yiddish</option>
            <option value="yo">Yoruba - ??d?? Yor??b??</option>
            <option value="zu">Zulu - isiZulu</option>
        </>
    );
}

export function getCurrencyOptions() {
    return (
        <>
            <option value="AFN">Afghan Afghani</option>
            <option value="ALL">Albanian Lek</option>
            <option value="DZD">Algerian Dinar</option>
            <option value="AOA">Angolan Kwanza</option>
            <option value="ARS">Argentine Peso</option>
            <option value="AMD">Armenian Dram</option>
            <option value="AWG">Aruban Florin</option>
            <option value="AUD">Australian Dollar</option>
            <option value="AZN">Azerbaijani Manat</option>
            <option value="BSD">Bahamian Dollar</option>
            <option value="BHD">Bahraini Dinar</option>
            <option value="BDT">Bangladeshi Taka</option>
            <option value="BBD">Barbadian Dollar</option>
            <option value="BYR">Belarusian Ruble</option>
            <option value="BEF">Belgian Franc</option>
            <option value="BZD">Belize Dollar</option>
            <option value="BMD">Bermudan Dollar</option>
            <option value="BTN">Bhutanese Ngultrum</option>
            <option value="BTC">Bitcoin</option>
            <option value="BOB">Bolivian Boliviano</option>
            <option value="BAM">Bosnia-Herzegovina Convertible Mark</option>
            <option value="BWP">Botswanan Pula</option>
            <option value="BRL">Brazilian Real</option>
            <option value="GBP">British Pound Sterling</option>
            <option value="BND">Brunei Dollar</option>
            <option value="BGN">Bulgarian Lev</option>
            <option value="BIF">Burundian Franc</option>
            <option value="KHR">Cambodian Riel</option>
            <option value="CAD">Canadian Dollar</option>
            <option value="CVE">Cape Verdean Escudo</option>
            <option value="KYD">Cayman Islands Dollar</option>
            <option value="XOF">CFA Franc BCEAO</option>
            <option value="XAF">CFA Franc BEAC</option>
            <option value="XPF">CFP Franc</option>
            <option value="CLP">Chilean Peso</option>
            <option value="CNY">Chinese Yuan</option>
            <option value="COP">Colombian Peso</option>
            <option value="KMF">Comorian Franc</option>
            <option value="CDF">Congolese Franc</option>
            <option value="CRC">Costa Rican Col????n</option>
            <option value="HRK">Croatian Kuna</option>
            <option value="CUC">Cuban Convertible Peso</option>
            <option value="CZK">Czech Republic Koruna</option>
            <option value="DKK">Danish Krone</option>
            <option value="DJF">Djiboutian Franc</option>
            <option value="DOP">Dominican Peso</option>
            <option value="XCD">East Caribbean Dollar</option>
            <option value="EGP">Egyptian Pound</option>
            <option value="ERN">Eritrean Nakfa</option>
            <option value="EEK">Estonian Kroon</option>
            <option value="ETB">Ethiopian Birr</option>
            <option value="EUR">Euro</option>
            <option value="FKP">Falkland Islands Pound</option>
            <option value="FJD">Fijian Dollar</option>
            <option value="GMD">Gambian Dalasi</option>
            <option value="GEL">Georgian Lari</option>
            <option value="DEM">German Mark</option>
            <option value="GHS">Ghanaian Cedi</option>
            <option value="GIP">Gibraltar Pound</option>
            <option value="GRD">Greek Drachma</option>
            <option value="GTQ">Guatemalan Quetzal</option>
            <option value="GNF">Guinean Franc</option>
            <option value="GYD">Guyanaese Dollar</option>
            <option value="HTG">Haitian Gourde</option>
            <option value="HNL">Honduran Lempira</option>
            <option value="HKD">Hong Kong Dollar</option>
            <option value="HUF">Hungarian Forint</option>
            <option value="ISK">Icelandic Kr????na</option>
            <option value="INR">Indian Rupee</option>
            <option value="IDR">Indonesian Rupiah</option>
            <option value="IRR">Iranian Rial</option>
            <option value="IQD">Iraqi Dinar</option>
            <option value="ILS">Israeli New Sheqel</option>
            <option value="ITL">Italian Lira</option>
            <option value="JMD">Jamaican Dollar</option>
            <option value="JPY">Japanese Yen</option>
            <option value="JOD">Jordanian Dinar</option>
            <option value="KZT">Kazakhstani Tenge</option>
            <option value="KES">Kenyan Shilling</option>
            <option value="KWD">Kuwaiti Dinar</option>
            <option value="KGS">Kyrgystani Som</option>
            <option value="LAK">Laotian Kip</option>
            <option value="LVL">Latvian Lats</option>
            <option value="LBP">Lebanese Pound</option>
            <option value="LSL">Lesotho Loti</option>
            <option value="LRD">Liberian Dollar</option>
            <option value="LYD">Libyan Dinar</option>
            <option value="LTL">Lithuanian Litas</option>
            <option value="MOP">Macanese Pataca</option>
            <option value="MKD">Macedonian Denar</option>
            <option value="MGA">Malagasy Ariary</option>
            <option value="MWK">Malawian Kwacha</option>
            <option value="MYR">Malaysian Ringgit</option>
            <option value="MVR">Maldivian Rufiyaa</option>
            <option value="MRO">Mauritanian Ouguiya</option>
            <option value="MUR">Mauritian Rupee</option>
            <option value="MXN">Mexican Peso</option>
            <option value="MDL">Moldovan Leu</option>
            <option value="MNT">Mongolian Tugrik</option>
            <option value="MAD">Moroccan Dirham</option>
            <option value="MZM">Mozambican Metical</option>
            <option value="MMK">Myanmar Kyat</option>
            <option value="NAD">Namibian Dollar</option>
            <option value="NPR">Nepalese Rupee</option>
            <option value="ANG">Netherlands Antillean Guilder</option>
            <option value="TWD">New Taiwan Dollar</option>
            <option value="NZD">New Zealand Dollar</option>
            <option value="NIO">Nicaraguan C????rdoba</option>
            <option value="NGN">Nigerian Naira</option>
            <option value="KPW">North Korean Won</option>
            <option value="NOK">Norwegian Krone</option>
            <option value="OMR">Omani Rial</option>
            <option value="PKR">Pakistani Rupee</option>
            <option value="PAB">Panamanian Balboa</option>
            <option value="PGK">Papua New Guinean Kina</option>
            <option value="PYG">Paraguayan Guarani</option>
            <option value="PEN">Peruvian Nuevo Sol</option>
            <option value="PHP">Philippine Peso</option>
            <option value="PLN">Polish Zloty</option>
            <option value="QAR">Qatari Rial</option>
            <option value="RON">Romanian Leu</option>
            <option value="RUB">Russian Ruble</option>
            <option value="RWF">Rwandan Franc</option>
            <option value="SVC">Salvadoran Col????n</option>
            <option value="WST">Samoan Tala</option>
            <option value="SAR">Saudi Riyal</option>
            <option value="RSD">Serbian Dinar</option>
            <option value="SCR">Seychellois Rupee</option>
            <option value="SLL">Sierra Leonean Leone</option>
            <option value="SGD">Singapore Dollar</option>
            <option value="SKK">Slovak Koruna</option>
            <option value="SBD">Solomon Islands Dollar</option>
            <option value="SOS">Somali Shilling</option>
            <option value="ZAR">South African Rand</option>
            <option value="KRW">South Korean Won</option>
            <option value="XDR">Special Drawing Rights</option>
            <option value="LKR">Sri Lankan Rupee</option>
            <option value="SHP">St. Helena Pound</option>
            <option value="SDG">Sudanese Pound</option>
            <option value="SRD">Surinamese Dollar</option>
            <option value="SZL">Swazi Lilangeni</option>
            <option value="SEK">Swedish Krona</option>
            <option value="CHF">Swiss Franc</option>
            <option value="SYP">Syrian Pound</option>
            <option value="STD">S??o Tom?? and Pr??ncipe Dobra</option>
            <option value="TJS">Tajikistani Somoni</option>
            <option value="TZS">Tanzanian Shilling</option>
            <option value="THB">Thai Baht</option>
            <option value="TOP">Tongan pa'anga</option>
            <option value="TTD">Trinidad & Tobago Dollar</option>
            <option value="TND">Tunisian Dinar</option>
            <option value="TRY">Turkish Lira</option>
            <option value="TMT">Turkmenistani Manat</option>
            <option value="UGX">Ugandan Shilling</option>
            <option value="UAH">Ukrainian Hryvnia</option>
            <option value="AED">United Arab Emirates Dirham</option>
            <option value="UYU">Uruguayan Peso</option>
            <option value="USD">US Dollar</option>
            <option value="UZS">Uzbekistan Som</option>
            <option value="VUV">Vanuatu Vatu</option>
            <option value="VEF">Venezuelan Bol????var</option>
            <option value="VND">Vietnamese Dong</option>
            <option value="YER">Yemeni Rial</option>
            <option value="ZMK">Zambian Kwacha</option>
        </>
    );
}

export function getCountryOptions() {
    return (
        <>
            <option value="">-</option>
            <option value="AF">Afghanistan</option>
            <option value="AX">&Aring;land Islands</option>
            <option value="AL">Albania</option>
            <option value="DZ">Algeria</option>
            <option value="AS">American Samoa</option>
            <option value="AD">Andorra</option>
            <option value="AO">Angola</option>
            <option value="AI">Anguilla</option>
            <option value="AQ">Antarctica</option>
            <option value="AG">Antigua and Barbuda</option>
            <option value="AR">Argentina</option>
            <option value="AM">Armenia</option>
            <option value="AW">Aruba</option>
            <option value="AU">Australia</option>
            <option value="AT">Austria</option>
            <option value="AZ">Azerbaijan</option>
            <option value="BS">Bahamas</option>
            <option value="BH">Bahrain</option>
            <option value="BD">Bangladesh</option>
            <option value="BB">Barbados</option>
            <option value="BY">Belarus</option>
            <option value="BE">Belgium</option>
            <option value="BZ">Belize</option>
            <option value="BJ">Benin</option>
            <option value="BM">Bermuda</option>
            <option value="BT">Bhutan</option>
            <option value="BO">Bolivia, Plurinational State of</option>
            <option value="BA">Bosnia and Herzegovina</option>
            <option value="BW">Botswana</option>
            <option value="BV">Bouvet Island</option>
            <option value="BR">Brazil</option>
            <option value="IO">British Indian Ocean Territory</option>
            <option value="BN">Brunei Darussalam</option>
            <option value="BG">Bulgaria</option>
            <option value="BF">Burkina Faso</option>
            <option value="BI">Burundi</option>
            <option value="KH">Cambodia</option>
            <option value="CM">Cameroon</option>
            <option value="CA">Canada</option>
            <option value="CV">Cape Verde</option>
            <option value="KY">Cayman Islands</option>
            <option value="CF">Central African Republic</option>
            <option value="TD">Chad</option>
            <option value="CL">Chile</option>
            <option value="CN">China</option>
            <option value="CX">Christmas Island</option>
            <option value="CC">Cocos (Keeling) Islands</option>
            <option value="CO">Colombia</option>
            <option value="KM">Comoros</option>
            <option value="CG">Congo</option>
            <option value="CD">Congo, the Democratic Republic of the</option>
            <option value="CK">Cook Islands</option>
            <option value="CR">Costa Rica</option>
            <option value="CI">C&ocirc;te d'Ivoire</option>
            <option value="HR">Croatia</option>
            <option value="CU">Cuba</option>
            <option value="CY">Cyprus</option>
            <option value="CZ">Czech Republic</option>
            <option value="DK">Denmark</option>
            <option value="DJ">Djibouti</option>
            <option value="DM">Dominica</option>
            <option value="DO">Dominican Republic</option>
            <option value="EC">Ecuador</option>
            <option value="EG">Egypt</option>
            <option value="SV">El Salvador</option>
            <option value="GQ">Equatorial Guinea</option>
            <option value="ER">Eritrea</option>
            <option value="EE">Estonia</option>
            <option value="ET">Ethiopia</option>
            <option value="FK">Falkland Islands (Malvinas)</option>
            <option value="FO">Faroe Islands</option>
            <option value="FJ">Fiji</option>
            <option value="FI">Finland</option>
            <option value="FR">France</option>
            <option value="GF">French Guiana</option>
            <option value="PF">French Polynesia</option>
            <option value="TF">French Southern Territories</option>
            <option value="GA">Gabon</option>
            <option value="GM">Gambia</option>
            <option value="GE">Georgia</option>
            <option value="DE">Germany</option>
            <option value="GH">Ghana</option>
            <option value="GI">Gibraltar</option>
            <option value="GR">Greece</option>
            <option value="GL">Greenland</option>
            <option value="GD">Grenada</option>
            <option value="GP">Guadeloupe</option>
            <option value="GU">Guam</option>
            <option value="GT">Guatemala</option>
            <option value="GG">Guernsey</option>
            <option value="GN">Guinea</option>
            <option value="GW">Guinea-Bissau</option>
            <option value="GY">Guyana</option>
            <option value="HT">Haiti</option>
            <option value="HM">Heard Island and McDonald Islands</option>
            <option value="VA">Holy See (Vatican City State)</option>
            <option value="HN">Honduras</option>
            <option value="HK">Hong Kong</option>
            <option value="HU">Hungary</option>
            <option value="IS">Iceland</option>
            <option value="IN">India</option>
            <option value="ID">Indonesia</option>
            <option value="IR">Iran, Islamic Republic of</option>
            <option value="IQ">Iraq</option>
            <option value="IE">Ireland</option>
            <option value="IM">Isle of Man</option>
            <option value="IL">Israel</option>
            <option value="IT">Italy</option>
            <option value="JM">Jamaica</option>
            <option value="JP">Japan</option>
            <option value="JE">Jersey</option>
            <option value="JO">Jordan</option>
            <option value="KZ">Kazakhstan</option>
            <option value="KE">Kenya</option>
            <option value="KI">Kiribati</option>
            <option value="KP">Korea, Democratic People's Republic of</option>
            <option value="KR">Korea, Republic of</option>
            <option value="KW">Kuwait</option>
            <option value="KG">Kyrgyzstan</option>
            <option value="LA">Lao People's Democratic Republic</option>
            <option value="LV">Latvia</option>
            <option value="LB">Lebanon</option>
            <option value="LS">Lesotho</option>
            <option value="LR">Liberia</option>
            <option value="LY">Libyan Arab Jamahiriya</option>
            <option value="LI">Liechtenstein</option>
            <option value="LT">Lithuania</option>
            <option value="LU">Luxembourg</option>
            <option value="MO">Macao</option>
            <option value="MK">Macedonia, the former Yugoslav Republic of</option>
            <option value="MG">Madagascar</option>
            <option value="MW">Malawi</option>
            <option value="MY">Malaysia</option>
            <option value="MV">Maldives</option>
            <option value="ML">Mali</option>
            <option value="MT">Malta</option>
            <option value="MH">Marshall Islands</option>
            <option value="MQ">Martinique</option>
            <option value="MR">Mauritania</option>
            <option value="MU">Mauritius</option>
            <option value="YT">Mayotte</option>
            <option value="MX">Mexico</option>
            <option value="FM">Micronesia, Federated States of</option>
            <option value="MD">Moldova, Republic of</option>
            <option value="MC">Monaco</option>
            <option value="MN">Mongolia</option>
            <option value="ME">Montenegro</option>
            <option value="MS">Montserrat</option>
            <option value="MA">Morocco</option>
            <option value="MZ">Mozambique</option>
            <option value="MM">Myanmar</option>
            <option value="NA">Namibia</option>
            <option value="NR">Nauru</option>
            <option value="NP">Nepal</option>
            <option value="NL">Netherlands</option>
            <option value="AN">Netherlands Antilles</option>
            <option value="NC">New Caledonia</option>
            <option value="NZ">New Zealand</option>
            <option value="NI">Nicaragua</option>
            <option value="NE">Niger</option>
            <option value="NG">Nigeria</option>
            <option value="NU">Niue</option>
            <option value="NF">Norfolk Island</option>
            <option value="MP">Northern Mariana Islands</option>
            <option value="NO">Norway</option>
            <option value="OM">Oman</option>
            <option value="PK">Pakistan</option>
            <option value="PW">Palau</option>
            <option value="PS">Palestinian Territory, Occupied</option>
            <option value="PA">Panama</option>
            <option value="PG">Papua New Guinea</option>
            <option value="PY">Paraguay</option>
            <option value="PE">Peru</option>
            <option value="PH">Philippines</option>
            <option value="PN">Pitcairn</option>
            <option value="PL">Poland</option>
            <option value="PT">Portugal</option>
            <option value="PR">Puerto Rico</option>
            <option value="QA">Qatar</option>
            <option value="RE">R&eacute;union</option>
            <option value="RO">Romania</option>
            <option value="RU">Russian Federation</option>
            <option value="RW">Rwanda</option>
            <option value="BL">Saint Barth&eacute;lemy</option>
            <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
            <option value="KN">Saint Kitts and Nevis</option>
            <option value="LC">Saint Lucia</option>
            <option value="MF">Saint Martin (French part)</option>
            <option value="PM">Saint Pierre and Miquelon</option>
            <option value="VC">Saint Vincent and the Grenadines</option>
            <option value="WS">Samoa</option>
            <option value="SM">San Marino</option>
            <option value="ST">Sao Tome and Principe</option>
            <option value="SA">Saudi Arabia</option>
            <option value="SN">Senegal</option>
            <option value="RS">Serbia</option>
            <option value="SC">Seychelles</option>
            <option value="SL">Sierra Leone</option>
            <option value="SG">Singapore</option>
            <option value="SK">Slovakia</option>
            <option value="SI">Slovenia</option>
            <option value="SB">Solomon Islands</option>
            <option value="SO">Somalia</option>
            <option value="ZA">South Africa</option>
            <option value="GS">South Georgia and the South Sandwich Islands</option>
            <option value="ES">Spain</option>
            <option value="LK">Sri Lanka</option>
            <option value="SD">Sudan</option>
            <option value="SR">Suriname</option>
            <option value="SJ">Svalbard and Jan Mayen</option>
            <option value="SZ">Swaziland</option>
            <option value="SE">Sweden</option>
            <option value="CH">Switzerland</option>
            <option value="SY">Syrian Arab Republic</option>
            <option value="TW">Taiwan, Province of China</option>
            <option value="TJ">Tajikistan</option>
            <option value="TZ">Tanzania, United Republic of</option>
            <option value="TH">Thailand</option>
            <option value="TL">Timor-Leste</option>
            <option value="TG">Togo</option>
            <option value="TK">Tokelau</option>
            <option value="TO">Tonga</option>
            <option value="TT">Trinidad and Tobago</option>
            <option value="TN">Tunisia</option>
            <option value="TR">Turkey</option>
            <option value="TM">Turkmenistan</option>
            <option value="TC">Turks and Caicos Islands</option>
            <option value="TV">Tuvalu</option>
            <option value="UG">Uganda</option>
            <option value="UA">Ukraine</option>
            <option value="AE">United Arab Emirates</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States</option>
            <option value="UM">United States Minor Outlying Islands</option>
            <option value="UY">Uruguay</option>
            <option value="UZ">Uzbekistan</option>
            <option value="VU">Vanuatu</option>
            <option value="VE">Venezuela, Bolivarian Republic of</option>
            <option value="VN">Viet Nam</option>
            <option value="VG">Virgin Islands, British</option>
            <option value="VI">Virgin Islands, U.S.</option>
            <option value="WF">Wallis and Futuna</option>
            <option value="EH">Western Sahara</option>
            <option value="YE">Yemen</option>
            <option value="ZM">Zambia</option>
            <option value="ZW">Zimbabwe</option>
        </>
    );
}

export function getOrderStatusOptions() {
    return (
        <>
            <option value="">-</option>
            <option value="RESERVED">RESERVED</option>
            <option value="PAYMENT_PENDING">PAYMENT_PENDING</option>
            <option value="DECLINED">DECLINED</option>
            <option value="PURCHASED">PURCHASED</option>
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="PARTIALY_CONFIRMED">PARTIALY_CONFIRMED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="REFUNDED">REFUNDED</option>
            <option value="PARTIALY_REFUNDED">PARTIALY_REFUNDED</option>
            <option value="UNKNOWN">UNKNOWN</option>
        </>
    );
}

export function getOrderPaymentTypeOptions() {
    return (
        <>
            <option value="Card">Card</option>
            <option value="Paypal">Paypal</option>
            <option value="Voucher">Voucher</option>
            <option value="ATM">ATM</option>
            <option value="Cash">Cash</option>
            <option value="Other">Other</option>
        </>
    );
}

export function getOrderCardTypeOptions() {
    return (
        <>
            <option value="Mastercard">Mastercard</option>
            <option value="Visa">Visa</option>
            <option value="Diners">Diners</option>
            <option value="American Express">American Express</option>
        </>
    );
}

export function genDatetimeString() {
    return (new Date()).toISOString().replaceAll("T", "-").replaceAll(":", "-").replaceAll(/\.[0-9]+Z$/g, "");
}

export function genRandomProductId() {
    return Math.random().toString(36).replaceAll("0.","").toUpperCase();
}

export function genRandomProductReferenceId(productId) {
    if(productId) {
        return `${productId}-${genDatetimeString()}`;
    } else {
        return `${genRandomProductId()}-${genDatetimeString()}`;
    }
}

export function genRandomOrderReferenceId(productId) {
    let randomRefId = genRandomProductReferenceId(productId);
    return `ORDER-${randomRefId}`;
}