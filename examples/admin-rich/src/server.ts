import { serve } from "bknd/adapter/vite";
import { config } from "$shared";
import { em, entity, text, boolean, jsonSchema, media } from "bknd/data"

const schema = em({
   users: entity("users", {}),
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
            }
         }
      })
   })
}, ({ relation }, { posts, users }) => {
   relation(posts).manyToOne(users)
   /*relation(posts).polyToMany(media, {
      mappedBy: "images"
   })*/
})

export default serve({
   //mode: "fresh",
   ...config,
   initialConfig: {
      ...config.initialConfig,
      data: schema.toJSON()
   }
})
