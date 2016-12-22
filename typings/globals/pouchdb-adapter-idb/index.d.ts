// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/a396c170ba4b6a7f45b20fccbdba0d2b81cc8833/pouchdb-adapter-idb/pouchdb-adapter-idb.d.ts
declare namespace PouchDB {
    namespace Core {
        interface DatabaseInfo {
            idb_attachment_format?: 'base64' | 'binary';
        }
    }

    namespace IdbAdapter {
        interface IdbAdapterConfiguration
                extends Configuration.LocalDatabaseConfiguration {
            /**
             * Configures storage persistence.
             *
             * Only works in Firefox 26+.
             */
            storage?: 'persistent' | 'temporary';
            adapter: 'idb';
        }
    }

    interface Static {
        new<Content extends Core.Encodable>(name: string | void,
            options: IdbAdapter.IdbAdapterConfiguration
            ): Database<Content>;
    }
}

declare module 'pouchdb-adapter-idb' {
    const plugin: PouchDB.Plugin;
    export = plugin;
}
