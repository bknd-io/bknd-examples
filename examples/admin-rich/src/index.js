import { serve } from "bknd/adapter/node";
import { config } from "shared";
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


serve({
   ...config,
   distPath: "../../node_modules/bknd/dist",
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
