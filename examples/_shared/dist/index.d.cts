import { ViteBkndConfig } from 'bknd/adapter/vite';

declare const connections: {
    readonly file: {
        readonly shared: {
            readonly type: "libsql";
            readonly config: {
                readonly url: "file:../_shared/data.db";
            };
        };
        readonly local: {
            readonly type: "libsql";
            readonly config: {
                readonly url: "file:data.db";
            };
        };
    };
    readonly memory: {
        readonly type: "libsql";
        readonly config: {
            readonly url: ":memory:";
        };
    };
};
declare const roles: {
    readonly sloppy: {
        readonly guest: {
            readonly permissions: readonly ["system.access.admin", "system.schema.read", "system.access.api", "system.config.read", "data.entity.read"];
            readonly is_default: true;
        };
        readonly admin: {
            readonly is_default: true;
            readonly implicit_allow: true;
        };
    };
    readonly strict: {
        readonly guest: {
            readonly permissions: readonly ["system.access.api", "system.config.read", "data.entity.read"];
            readonly is_default: true;
        };
        readonly admin: {
            readonly is_default: true;
            readonly implicit_allow: true;
        };
    };
};
declare const config: ViteBkndConfig;

export { config, connections, roles };
