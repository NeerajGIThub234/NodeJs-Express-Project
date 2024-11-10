import express from "express";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;

    app.use(express.json());

    // Create grtaphql Server 
    const gqlserver = new   ApolloServer({
        typeDefs:`
            type Query{
                hello: String
                say(name:String): String
            }`, // Schema
        resolvers:{
            Query:{
                hello:()=>`Hey There i am Graphql!`,
                say:(_,{name}:{name:String})=>`Hey ${name}, How are you?`,
            },
        }, //Resolvers
    });

    await gqlserver.start();

    app.get("/",(req,res)=>{
        res.json({message :"Server is up and running"});
    });

    app.use('/graphql', expressMiddleware(gqlserver));

    app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`));
}

init();
