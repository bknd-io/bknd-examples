import { serve } from "bknd/adapter/vite";
import { config, connections } from "$shared";
import { em, entity, text, boolean, jsonSchema, media } from "bknd/data"

const schema = em({
   posts: entity("posts", {
      title: text(),
      content: text({
         html_config: {
            element: "textarea",
            props: { rows: 4 }
         }
      }),
      active: boolean(),
      tags: jsonSchema({
         schema: {
            type: "array",
            items: {
               type: "string"
            },
            default: []
         }
      }),
      images: media()
   }),
   users: entity("users", {}),
   media: entity("media", {}),
}, ({ relation }, { posts, users, media }) => {
   relation(posts).manyToOne(users).polyToMany(media, {
      mappedBy: "images"
   })
})

type Database = (typeof schema)["DB"];
declare module "bknd/core" {
   interface DB extends Database {
   }
}

export default serve({
   //mode: "fresh",
   ...config,
   //connection: connections.file.local,
   initialConfig: {
      ...config.initialConfig,
      data: schema.toJSON()
   },
   options: {
      seed: async (ctx) => {
         await ctx.em.mutator("posts").insertMany([
            {
               title: "Sample post",
               active: true,
               tags: []
            }
         ]);
      }
   }
})
