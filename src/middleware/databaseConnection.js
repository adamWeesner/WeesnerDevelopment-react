const BACKEND_BASE_URL = "http://0.0.0.0:23567"

export async function addItem(itemType, info) {
    let request = await fetch(`${BACKEND_BASE_URL}/${itemType}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    })
    return await request.json()
}

export async function readAll() {
    let medicare = await readAllType("medicare")
    let socialSecurity = await readAllType("socialSecurity")
    let federalIncomeTax = await readAllType("federalIncomeTax")
    let taxWithholding = await readAllType("taxWithholding")

    return [medicare, socialSecurity, federalIncomeTax, taxWithholding]
}

export async function readAllType(itemType) {
    let request = await fetch(`${BACKEND_BASE_URL}/${itemType}`)
    return await request.json()
}