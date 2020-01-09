const BACKEND_BASE_URL = process.env.NODE_ENV === 'production' ? "http://api.weesnerDevelopment.com" : "http://0.0.0.0:23567"

const backendUrls = {
    FederalIncomeTax: "federalIncomeTax",
    SocialSecurity: "socialSecurity",
    Medicare: "medicare",
    TaxWithholding: "taxWithholding",
}

async function addItem(itemType, info) {
    let request = await fetch(`${BACKEND_BASE_URL}/${itemType}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
    return await request.json()
}

async function readAll() {
    let medicare = await readAllType(backendUrls.Medicare)
    let socialSecurity = await readAllType(backendUrls.SocialSecurity)
    let federalIncomeTax = await readAllType(backendUrls.FederalIncomeTax)
    let taxWithholding = await readAllType(backendUrls.TaxWithholding)

    return [medicare, socialSecurity, federalIncomeTax, taxWithholding]
}

async function readAllType(itemType) {
    console.log(process.env.NODE_ENV, BACKEND_BASE_URL)
    let request = await fetch(`${BACKEND_BASE_URL}/${itemType}`)
    return await request.json()
}

export {
    backendUrls,
    addItem,
    readAll,
    readAllType
}