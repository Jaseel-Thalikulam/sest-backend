"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataLoader = void 0;
const plugin_constants_1 = require("./plugin-constants");
class MetadataLoader {
    static addRefreshHook(hook) {
        return MetadataLoader.refreshHooks.push(hook);
    }
    async load(metadata) {
        const pkgMetadata = metadata['@nestjs/swagger'];
        if (!pkgMetadata) {
            return;
        }
        const { models, controllers } = pkgMetadata;
        if (models) {
            await this.applyMetadata(models);
        }
        if (controllers) {
            await this.applyMetadata(controllers);
        }
        this.runHooks();
    }
    async applyMetadata(meta) {
        const loadPromises = meta.map(async ([fileImport, fileMeta]) => {
            const fileRef = await fileImport;
            Object.keys(fileMeta).map((key) => {
                const clsRef = fileRef[key];
                clsRef[plugin_constants_1.METADATA_FACTORY_NAME] = () => fileMeta[key];
            });
        });
        await Promise.all(loadPromises);
    }
    runHooks() {
        MetadataLoader.refreshHooks.forEach((hook) => hook());
    }
}
exports.MetadataLoader = MetadataLoader;
MetadataLoader.refreshHooks = new Array();
