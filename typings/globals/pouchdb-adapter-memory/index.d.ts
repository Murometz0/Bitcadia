// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/a396c170ba4b6a7f45b20fccbdba0d2b81cc8833/pouchdb-adapter-memory/pouchdb-adapter-memory.d.ts
declare namespace PouchDB {
    namespace MemoryAdapter {
        interface MemoryAdapterConfiguration
                extends Configuration.LocalDatabaseConfiguration {
            adapter: 'memory';
        }
    }

    interface Static {
        new<Content extends Core.Encodable>(name: string | void,
            options: MemoryAdapter.MemoryAdapterConfiguration
            ): Database<Content>;
    }
}

declare module 'pouchdb-adapter-memory' {
    const plugin: PouchDB.Plugin;
    export = plugin;
}
