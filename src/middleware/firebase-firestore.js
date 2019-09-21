import { db } from "./firebase-main"

export async function addItem(colName, docName, docInfo) {
    db.collection(colName).doc(docName).set(docInfo)
}

export async function readAll(colName, itemsRetrieved) {
    readAllType(colName, null, itemsRetrieved)
}

export async function readAllType(colName, type, itemsRetrieved) {
    db.collection(colName).get().then(snapshot => {
        let items = []
        snapshot.forEach(doc => {
            if (type === null || type === doc.id)
                items[doc.id] = doc.data()
        })
        itemsRetrieved(items)
    }).catch(err => {
        console.log('Error getting documents for', colName, err)
    })
}
