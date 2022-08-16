export function getDomain() {
    const domain_regex = /\.[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/;
    let current_domain = window.location.host;
    if(domain_regex.test(window.location.host)) {
        current_domain = domain_regex.exec(window.location.host)[0];
    }
    return current_domain;
}