import { useState, useEffect, useRef} from 'react'
import { db } from  './firebase-config'

// firebase imports
import { collection, onSnapshot, where , query } from 'firebase/firestore'

// "c" is abbreviation for colllection input and "_q" is abbreviation for query
export const useCollection = (c, _q) => {
    const [documents, setDocuments] = useState(null)

    // set up query
    const q = useRef(_q).current

    useEffect(() => {
        let ref = collection(db, c)

        if (q) {
            ref = query(ref, where(...q)) 
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
    
            let businessInfo = snapshot.docs.map(doc => doc.data())
            setDocuments(businessInfo)
        });
        return unsubscribe
    }, [c, q])
}