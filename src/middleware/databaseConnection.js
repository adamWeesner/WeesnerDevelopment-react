const BASE_URL = "http://192.168.0.30:8080"
const auth = "user/"
const taxFetcher = "taxFetcher/"

const backendUrls = {
    TaxFetcher: {
        FederalIncomeTax: `${taxFetcher}federalIncomeTax`,
        SocialSecurity: `${taxFetcher}socialSecurity`,
        Medicare: `${taxFetcher}medicare`,
        TaxWithholding: `${taxFetcher}taxWithholding`,
    },
    Auth: {
        Login: `${auth}login`,
        Account: `${auth}account`,
        SignUp: `${auth}signUp`
    }
}

const getToken = () => window.localStorage.getItem('token')

const setToken = (token) => window.localStorage.setItem('token', token)

const buildHeaders = () => {
    let fetchHeaders = {
        "Content-Type": "application/json",
    }

    if (getToken()) {
        fetchHeaders = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getToken()}`,
        }
    }

    return fetchHeaders
}

const addItem = async (itemType, info) => {
    const savedItems = await readAllType(itemType)
    let alreadyInDB = null
    if (savedItems.size > 0) {
        await savedItems.forEach(item => {
            if (info.year === item.year) {
                alreadyInDB = item
                return
            }
        })
    }

    const retrievedItem = await fetch(`${BASE_URL}/${itemType}`, {
        method: alreadyInDB ? "PUT" : "POST",
        headers: buildHeaders(),
        body: JSON.stringify(info),
    })

    return retrievedItem.json()
}

const readAll = async () => {
    const medicare = await readAllType(backendUrls.TaxFetcher.Medicare)
    const socialSecurity = await readAllType(backendUrls.TaxFetcher.SocialSecurity)
    const federalIncomeTax = await readAllType(backendUrls.TaxFetcher.FederalIncomeTax)
    const taxWithholding = await readAllType(backendUrls.TaxFetcher.TaxWithholding)

    return {
        medicare,
        socialSecurity,
        federalIncomeTax,
        taxWithholding
    }
}

const readAllType = async (itemType) => {
    const getItem = await fetch(`${BASE_URL}/${itemType}`, {
        method: "GET",
        headers: buildHeaders(),
    })

    return await getItem.json()
}

const login = async (username, password) => {
    const encryptedUser = btoa(username)
    const encryptedPass = btoa(password)

    const getUser = await fetch(`${BASE_URL}/${backendUrls.Auth.Login}`, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({ username: encryptedUser, password: encryptedPass })
    })

    const returned = await getUser.json()
    setToken(returned.token)

    return returned
}

const signUp = async (name, email, username, password) => {
    const encryptedUser = btoa(username)
    const encryptedPass = btoa(password)

    const getUser = await fetch(`${BASE_URL}/${backendUrls.Auth.SignUp}`, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({ name, email, username: encryptedUser, password: encryptedPass })
    })

    const returned = await getUser.json()
    setToken(returned.token)

    return returned
}

export {
    backendUrls,
    addItem,
    readAll,
    readAllType,
    login,
    signUp
}