import type { ViteBkndConfig } from "bknd/adapter/vite";

export const connections = {
   file: {
      type: "libsql",
      config: {
         url: "file:../_shared/data.db"
      }
   },
   memory: {
      type: "libsql",
      config: {
         url: ":memory:"
      }
   }
}
export const config: ViteBkndConfig = {
   connection: connections.memory as any,
   initialConfig: {
      media: {
         enabled: true,
         adapter: {
            type: "local",
            config: {
               path: "../_shared/files"
            }
         }
      }
   }
} as const