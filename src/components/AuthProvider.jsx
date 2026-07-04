import { createContext, useEffect, useState, useCallback } from "react";
import { auth, db } from '../firebase';
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [classes, setClasses] = useState([]);
    const [classLoading, setClassLoading] = useState(true);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const uploadFile = useCallback(async (file) => {
        const storageRef = ref(Storage, `classes/${file.name}`);
        const response = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(response.ref);
        return url;
    }, []);

    const saveCard = useCallback(async ( cardContent, file) => {
        try {
            let imageUrl = null;
            if (file) {
                imageUrl = await uploadFile(file);
            }

            const cardRef = collection(db, `classes`);
            const newCardRef = doc(cardRef);
            await setDoc(newCardRef, { content: cardContent, likes: [], imageUrl });
            const newCard = await getDoc(newCardRef);
            
            setPosts((prev) => [{ id: newCard.id, ...newCard.data() }, ...prev]);
        } catch (error) {
            console.error(error);
        }
    }, [uploadFile]);

    const updateCard = useCallback(
        async (classId, newPostContent, newFile) => {
            try {
                const cardRef = doc(db, `classes/${classId}`);
                const cardSnap = await getDoc(cardRef);
                if (!cardSnap.exists()) throw new Error("Class does not exist");

                let newImageUrl = null;
                if (newFile) {
                    newImageUrl = await uploadFile(newFile);
                }

                const cardData = cardSnap.data();
                const updatedData = {
                    ...cardData,
                    content: newCardContent || cardData.content,
                    imageUrl: newImageUrl || cardData.imageUrl,
                };

                await updateDoc(cardRef, updatedData);

                setClasses((prev) => 
                    prev.map((p) => (p.id === classId ? { id: classId, ...updatedData } : p))
                );
            } catch (error) {
                console.error(error);
            }
        }, [uploadFile]
    );

    const deleteCard = useCallback(async (classId) => {
        try {
            const cardRef = doc(db, `classes${classId}`);
            await deleteDoc(cardRef);

            setClasses((prev) => prev.filter((card) => card.id !== classId));
        } catch (error) {
            console.error(error);
        }
    }, []);

    const value = {
        currentUser,
        classes,
        classLoading,
        saveCard,
        updateCard,
        deleteCard,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}