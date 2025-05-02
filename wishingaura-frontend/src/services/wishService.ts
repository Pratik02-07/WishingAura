import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const createWish = async (wishData: any) => {
  const docRef = await addDoc(collection(db, "wishes"), wishData);
  return docRef.id;
}; 