// index.ts
import { App } from "bknd";
import { randomString, secureRandomString } from "bknd/utils";
var connections = {
  file: {
    shared: {
      type: "libsql",
      config: {
        url: "file:../_shared/data.db"
      }
    },
    local: {
      type: "libsql",
      config: {
        url: "file:data.db"
      }
    }
  },
  memory: {
    type: "libsql",
    config: {
      url: ":memory:"
    }
  }
};
var roles = {
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
};
var config = {
  //connection: connections.memory as any,
  initialConfig: {
    auth: {
      enabled: true,
      guard: {
        enabled: true
      },
      jwt: {
        issuer: randomString(8),
        secret: secureRandomString(64)
      },
      roles: roles.sloppy
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
        });
        await app.createUser({
          email: "admin@bknd.io",
          password: "12345678",
          role: "admin"
        });
      }
    }, "sync");
  }
};
export {
  config,
  connections,
  roles
};
