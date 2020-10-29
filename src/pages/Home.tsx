/* tslint:disable no-console interface-name */

import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonRow,
  IonText,
} from "@ionic/react"
import React, { useState } from "react"
import "./home.css"

interface Post {
  id: number
  postid: number
  title: string
  author: string
}

function Home() {
  const [posts, setPosts] = useState<Post[]>([])

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:8000/posts")
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      setPosts(json)
      console.log(json)
    } catch (error) {
      console.error(error.message)
    }
  }

  const createPost = async () => {
    const url = "http://localhost:8000/posts"
    const data = { id: 4, title: "New Post", postid: 4, author: "New" }
    try {
      const response = await fetch(url, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      getPosts()
      console.log(json)
    } catch (error) {
      console.error(error.message)
    }
  }

  const updatePost = async () => {
    const url = "http://localhost:8000/posts/4"
    const data = {
      author: "New",
      postid: 4,
      title: "Updated Post",
    }
    try {
      const response = await fetch(url, {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      getPosts()
      console.log(json)
    } catch (error) {
      console.error(error.message)
    }
  }

  const deletePost = async () => {
    const url = "http://localhost:8000/posts/4"
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
      if (!response.ok) {
        throw Error(response.statusText)
      }
      const json = await response.json()
      getPosts()
      console.log(json)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <IonContent>
      <div className="ion-padding">
        <h1>Ionic React Rest Example</h1>
      </div>
      <div className="ion-padding">
        <IonButton onClick={getPosts}>Get</IonButton>
        <IonButton onClick={createPost}>Post</IonButton>
        <IonButton onClick={updatePost}>Put</IonButton>
        <IonButton onClick={deletePost}>Delete</IonButton>
      </div>
      <IonGrid className="ion-padding">
        <IonRow>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Id</IonText>
          </IonCol>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Title</IonText>
          </IonCol>
          <IonCol sizeMd="2" className="col-border bgcolor ion-text-center">
            <IonText color="primary">Author</IonText>
          </IonCol>
        </IonRow>
        {posts.map((post) => (
          <IonRow key={post.id}>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {post.id}
            </IonCol>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {post.title}
            </IonCol>
            <IonCol sizeMd="2" className="col-border ion-text-center">
              {post.author}
            </IonCol>
          </IonRow>
        ))}
      </IonGrid>
    </IonContent>
  )
}

export default Home
