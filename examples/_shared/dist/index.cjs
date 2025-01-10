"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var index_exports = {};
__export(index_exports, {
  config: () => config,
  connections: () => connections,
  roles: () => roles
});
module.exports = __toCommonJS(index_exports);
var import_bknd = require("bknd");
var import_utils = require("bknd/utils");
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
        issuer: (0, import_utils.randomString)(8),
        secret: (0, import_utils.secureRandomString)(64)
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
    app.emgr.onEvent(import_bknd.App.Events.AppFirstBoot, async () => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  connections,
  roles
});
