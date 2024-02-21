import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    serverTimestamp,
    updateDoc,
    orderBy,
    where,
  } from "firebase/firestore";
  import { db } from "../firebase";
export const getBlog = async (blogId)=>{
    try{
        const docRef = doc(db, "blogs", blogId);
       return (await getDoc(docRef)).data();
    }catch(err){
        console.log("BLOG SERVICE getBlog: ",err)
        return null
    }
};
export const getRecentBlogs= async (blogId)=>{
    try{
        const blogRef = collection(db, "blogs");
        const recentBlogs = query(
          blogRef,
          orderBy("timestamp", "desc"),
          limit(5)
          );
          const docSnapshot = await (await getDocs(recentBlogs)).docChanges;
          return docSnapshot.docs
    }catch(err){
        console.log("BLOG SERVICE getRecentBlogs: ",err)
        return []
    }
};

export const getBlogs= async ()=>{
    try{
        const docRef = doc(db, "blogs");
       return await (await getDocs(docRef)).docChanges;
    }catch(err){
        console.log("BLOG SERVICE getBlogs: ",err)
        return []
    }
};
export const getRelatedBlogs= async (tags)=>{
    try{
    const blogRef = collection(db, "blogs");
    const relatedBlogsQuery = query(
      blogRef,
      where("tags", "array-contains-any", tags.length?tags:['hi'], limit(3))
    );
    const relatedBlogSnapshot = await (await getDocs(relatedBlogsQuery)).docChanges;
    const relatedBlogs = [];
    relatedBlogSnapshot.forEach((doc) => {
      relatedBlogs.push({ id: doc.id, ...doc.data() });
    });
        const docRef = doc(db, "blogs");
        return (await getDocs(docRef)).docChanges;
    }catch(err){
        console.log("BLOG SERVICE getRelatedBlogs: ",err)
        return []
    }
};

export const updateBlog= async (blogId,blogData)=>{
    try{
        await updateDoc(doc(db, "blogs", blogId), {...blogData, timestamp: serverTimestamp()});
        return true
    }catch(err){
        console.log("BLOG SERVICE updateBlog: ",err)
        return null
    }
};