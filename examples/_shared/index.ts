import { App } from "bknd";
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
} as const

export const roles = {
   sloppy: {
      guest: {
         permissions: [
            "system.access.admin",
            "system.schema.read",
            "system.access.api",
            "system.config.read",
            "data.entity.read"
         ],
         is_default: true
      },
      admin: {
         is_default: true,
         implicit_allow: true
      }
   },
   strict: {
      guest: {
         permissions: [
            "system.access.api",
            "system.config.read",
            "data.entity.read"
         ],
         is_default: true
      },
      admin: {
         is_default: true,
         implicit_allow: true
      }
   }
} as const;

export const config: ViteBkndConfig = {
   connection: connections.memory as any,
   initialConfig: {
      auth: {
         enabled: true,
         guard: {
            enabled: true
         },
         jwt: {
            secret: "secret"
         },
         roles: roles.sloppy as any
      },
      media: {
         enabled: true,
         adapter: {
            type: "local",
            config: {
               path: "../_shared/files"
            }
         }
      }
   },
   onBuilt: async (app) => {
      app.emgr.onEvent(App.Events.AppFirstBoot, async () => {
         if (app.modules.configs().auth.enabled) {
            await app.createUser({
               email: "user@bknd.io",
               password: "12345678"
            })
            await app.createUser({
               email: "admin@bknd.io",
               password: "12345678",
               role: "admin"
            })
         }
      }, "sync")
   }
} as const