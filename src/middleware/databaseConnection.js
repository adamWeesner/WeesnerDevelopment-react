// const BASE_URL = '192.168.0.30'
const BASE_URL = 'localhost'
const HTTP_BASE_URL = `http://${BASE_URL}:8080`
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
    },
    Updates: {
        All: `/updates`
    }
}

const getToken = () => window.localStorage.getItem('token')

const setToken = (token) => window.localStorage.setItem('token', token)

const deleteToken = () => window.localStorage.removeItem('token')

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

const getUpdates = () => {
    const webSocket = new WebSocket(`wss://${BASE_URL}:8890`)
    webSocket.onopen = (_) => {
        console.log('web socket connection opened')
    }

    webSocket.onmessage = (event) => {
        console.log(`message received ${event.data}`)
    }

    webSocket.onerror = (event) => {
        console.log(`web socket connection error ${event}`)
    }

    webSocket.onclose = (_) => {
        console.log('web socket connection closed')
    }
}

const addItem = async (itemType, info) => {
    const retrievedItem = await fetch(`${HTTP_BASE_URL}/${itemType}`, {
        method: "POST",
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
    try {
        const getItem = await fetch(`${HTTP_BASE_URL}/${itemType}`, {
            method: "GET",
            headers: buildHeaders(),
        })

        if (getItem.status === 401) deleteToken()

        return await getItem.json()
    } catch (e) {
        return null
    }
}

const login = async (username, password) => {
    const encryptedUser = btoa(username)
    const encryptedPass = btoa(password)

    const getUser = await fetch(`${HTTP_BASE_URL}/${backendUrls.Auth.Login}`, {
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

    const getUser = await fetch(`${HTTP_BASE_URL}/${backendUrls.Auth.SignUp}`, {
        method: "POST",
        headers: buildHeaders(),
        body: JSON.stringify({ name, email, username: encryptedUser, password: encryptedPass })
    })

    const returned = await getUser.json()
    setToken(returned.token)

    return returned
}

const account = async () => {
    try {
        const getAccount = await fetch(`${HTTP_BASE_URL}/${backendUrls.Auth.Account}`, {
            method: "GET",
            headers: buildHeaders(),
        })

        const userInfo = await getAccount.json()

        return {
            name: userInfo.name,
            username: atob(userInfo.username),
            email: userInfo.email,
        }
    } catch (e) {
        return null
    }
}

const logout = () => {
    deleteToken()
}

export {
    backendUrls,
    addItem,
    readAll,
    readAllType,
    login,
    signUp,
    account,
    logout,
    getToken
}
