/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/main.ts
__export(exports, {
  default: () => ParaShortcutsPlugin
});
var import_obsidian3 = __toModule(require("obsidian"));

// src/para_types.ts
var ParaType;
(function(ParaType2) {
  ParaType2["projects"] = "Projects";
  ParaType2["areas_of_responsibility"] = "Areas of Responsibility";
  ParaType2["resources"] = "Resources";
  ParaType2["archive"] = "Archive";
})(ParaType || (ParaType = {}));
function isParaType(s) {
  for (const val in ParaType) {
    if (val === s) {
      return true;
    }
  }
  return false;
}

// src/settings/settings.ts
var DEFAULT_SETTINGS = {
  folders: {
    project: "1-Projects",
    area: "2-Areas",
    resource: "3-Resources",
    archive: "4-Archive"
  }
};
function settingsToMap(settings) {
  return new Map([
    [ParaType.projects, settings.folders.project],
    [ParaType.areas_of_responsibility, settings.folders.area],
    [ParaType.resources, settings.folders.resource],
    [ParaType.archive, settings.folders.archive]
  ]);
}

// src/settings/settings_tab.ts
var import_obsidian = __toModule(require("obsidian"));
var ParaShortcutsSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Settings for PARA-Shortcuts." });
    new import_obsidian.Setting(containerEl).setName("Project folder").setDesc('the folder name for your "Projects"').addText((text) => text.setPlaceholder("eg. Projects").setValue(this.plugin.settings.folders.project).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.folders.project = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("Area of Resposibility folder").setDesc('the folder name for your "Area of Resposibility"').addText((text) => text.setPlaceholder("eg. Area").setValue(this.plugin.settings.folders.area).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.folders.area = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("Resources folder").setDesc('the folder name for your "Resources"').addText((text) => text.setPlaceholder("eg. Resources").setValue(this.plugin.settings.folders.resource).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.folders.resource = value;
      yield this.plugin.saveSettings();
    })));
    new import_obsidian.Setting(containerEl).setName("Archive folder").setDesc('the folder name for your "Archive"').addText((text) => text.setPlaceholder("eg. Archive").setValue(this.plugin.settings.folders.archive).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.folders.archive = value;
      yield this.plugin.saveSettings();
    })));
  }
};

// src/modals/new_entry_modal.ts
var import_obsidian2 = __toModule(require("obsidian"));
var CreateNewEntryModal = class extends import_obsidian2.FuzzySuggestModal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
    this.setPlaceholder("Create a new entry in:");
  }
  onChooseItem(item, evt) {
    this.plugin.createEntryByType(item);
  }
  getItems() {
    return [ParaType.projects, ParaType.areas_of_responsibility, ParaType.resources];
  }
  getItemText(item) {
    return item;
  }
};

// src/main.ts
var DATE_FORMAT = "YYYY-MM-DD";
var POSTPONE_FOLDER_NAME = "postponed";
var ParaShortcutsPlugin = class extends import_obsidian3.Plugin {
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addCommand({
        id: "create-new-entry",
        name: "Create new entry",
        callback: () => this.commandCreateNewEntry()
      });
      this.addCommand({
        id: "init-vault",
        name: "Init vault with PARA folders",
        callback: () => this.commandInitPara()
      });
      this.addCommand({
        id: "move-to-archive",
        name: "Move current file to archive",
        checkCallback: (checking) => this.commandMoveToArchive(checking)
      });
      this.addCommand({
        id: "restore-from-archive",
        name: "Restore entry from archive",
        checkCallback: (checking) => this.commandRestoreFromArchive(checking)
      });
      this.addCommand({
        id: "postpone-entry",
        name: "Postpone this entry",
        checkCallback: (checking) => this.commandPostponeEntry(checking)
      });
      this.addCommand({
        id: "reschedule-entry",
        name: "Reschedule this entry",
        checkCallback: (checking) => this.commandRescheduleEntry(checking)
      });
      this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => {
        if (this.canMoveToArchive(file)) {
          menu.addItem((item) => {
            item.setTitle("Move to archive").onClick(() => {
              this.moveToArchive(file);
            });
          });
        }
        if (this.canRestoreFromArchive(file)) {
          menu.addItem((item) => {
            item.setTitle("Restore from archive").onClick(() => {
              this.restoreFromArchive(file);
            });
          });
        }
      }));
      this.addSettingTab(new ParaShortcutsSettingTab(this.app, this));
    });
  }
  onunload() {
  }
  loadSettings() {
    return __async(this, null, function* () {
      let loadedData = yield this.loadData();
      this.settings = Object.assign({}, DEFAULT_SETTINGS, loadedData);
      this.folderMapping = settingsToMap(this.settings);
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
      this.folderMapping = settingsToMap(this.settings);
    });
  }
  createEntryByType(type, filename = "untitled.md") {
    return __async(this, null, function* () {
      let folderName = this.folderMapping.get(type);
      let rootFolderChildren = this.app.vault.getRoot().children;
      let selectedFolder = rootFolderChildren.find((ele) => ele.name === folderName);
      if (selectedFolder !== void 0) {
        let filepath = (0, import_obsidian3.normalizePath)([folderName, filename].join("/"));
        let createdFile = yield this.app.vault.create(filepath, this.createMetaHeader());
        yield this.app.workspace.activeLeaf.openFile(createdFile, import_obsidian3.TextFileView);
      }
    });
  }
  commandCreateNewEntry() {
    let modal = new CreateNewEntryModal(this.app, this);
    modal.open();
  }
  commandInitPara() {
    if (this.isParaVault()) {
      new import_obsidian3.Notice("PARA already initialized!");
      return;
    }
    this.createParaFolders().then(() => {
      new import_obsidian3.Notice("Vault successfuly initialized!");
    }).catch((_) => {
      new import_obsidian3.Notice("Error creating PARA folders");
    });
  }
  canRestoreFromArchive(file) {
    return this.isFolderInParaType(file.parent, ParaType.archive);
  }
  restoreFromArchive(file) {
    let archiveFolderName = this.folderMapping.get(ParaType.archive);
    let newFilePath = (0, import_obsidian3.normalizePath)(file.path.replace(archiveFolderName, ""));
    this.moveFileAndCreateFolder(file, newFilePath).then(() => {
      new import_obsidian3.Notice(`Restored file to ${newFilePath}`);
      this.deleteFolderIfEmpty(file.parent);
    }).catch((_) => {
      new import_obsidian3.Notice(`Unable to resotre file`);
    });
  }
  commandRestoreFromArchive(checking) {
    let activeFile = this.app.workspace.getActiveFile();
    if (activeFile !== null) {
      if (checking) {
        return this.canRestoreFromArchive(activeFile);
      }
      this.restoreFromArchive(activeFile);
    }
  }
  commandRescheduleEntry(checking) {
    var _a;
    let activeFile = this.app.workspace.getActiveFile();
    if (activeFile !== null) {
      if (checking) {
        return !this.isFolderInParaType(activeFile.parent, ParaType.archive) && ((_a = activeFile.path) == null ? void 0 : _a.contains(POSTPONE_FOLDER_NAME));
      }
    }
    let newFilePath = (0, import_obsidian3.normalizePath)(activeFile.path.replace(`/${POSTPONE_FOLDER_NAME}`, ""));
    let folderToDelete = activeFile.parent;
    this.moveFileAndCreateFolder(activeFile, newFilePath).then(() => {
      new import_obsidian3.Notice(`Rescheduled ${newFilePath}.`);
      this.deleteFolderIfEmpty(folderToDelete);
    }).catch((_) => {
      new import_obsidian3.Notice(`Unable to move file to ${newFilePath}.`);
    });
  }
  commandPostponeEntry(checking) {
    var _a;
    let activeFile = this.app.workspace.getActiveFile();
    if (activeFile !== null) {
      if (checking) {
        return !this.isFolderInParaType(activeFile.parent, ParaType.archive) && !((_a = activeFile.path) == null ? void 0 : _a.contains(POSTPONE_FOLDER_NAME));
      }
      let paratype = this.findParaTypeInPath(activeFile.parent);
      if (paratype != null) {
        let foldername = this.folderMapping.get(paratype);
        let newFilePath = (0, import_obsidian3.normalizePath)(activeFile.path.replace(foldername, foldername + `/${POSTPONE_FOLDER_NAME}`));
        let folderToDelete = activeFile.parent;
        this.moveFileAndCreateFolder(activeFile, newFilePath).then(() => {
          new import_obsidian3.Notice(`Postponed ${newFilePath}.`);
          this.deleteFolderIfEmpty(folderToDelete);
        }).catch((_) => {
          new import_obsidian3.Notice(`Unable to move file to ${newFilePath}.`);
        });
      }
    }
  }
  canMoveToArchive(file) {
    return !this.isFolderInParaType(file.parent, ParaType.archive);
  }
  moveToArchive(file) {
    let archiveFolderName = this.folderMapping.get(ParaType.archive);
    let pathToFile = (0, import_obsidian3.normalizePath)([
      this.app.vault.getRoot().name,
      archiveFolderName,
      file.path
    ].join("/"));
    this.moveFileAndCreateFolder(file, pathToFile).then(() => {
      new import_obsidian3.Notice(`Moved file to ${pathToFile}.`);
    }).catch((_) => {
      new import_obsidian3.Notice(`Unable to move file to ${pathToFile}.`);
    });
  }
  commandMoveToArchive(checking) {
    let activeFile = this.app.workspace.getActiveFile();
    if (activeFile !== null) {
      if (checking) {
        return this.canMoveToArchive(activeFile);
      }
      this.moveToArchive(activeFile);
    }
  }
  moveFileAndCreateFolder(file, newPath) {
    return __async(this, null, function* () {
      try {
        yield this.app.fileManager.renameFile(file, newPath);
      } catch (error) {
        let pathToFolder = this.getDirName(newPath);
        yield this.app.vault.createFolder(pathToFolder);
        yield this.app.fileManager.renameFile(file, newPath);
      }
    });
  }
  isFolderInParaType(folder, paraType) {
    let paraTypeOfFolder = this.findTopelevelParaTypeInPath(folder);
    return paraTypeOfFolder == paraType;
  }
  findParaTypeInPath(folder) {
    var type = null;
    this.folderMapping.forEach((val, key) => {
      if (folder.name === val) {
        type = key;
      }
    });
    if (type === null && !folder.isRoot()) {
      type = this.findParaTypeInPath(folder.parent);
    }
    return type;
  }
  findTopelevelParaTypeInPath(folder) {
    var type = null;
    this.folderMapping.forEach((val, key) => {
      if (folder.name === val) {
        type = key;
      }
    });
    if (!folder.isRoot()) {
      let foundTypeInParent = this.findTopelevelParaTypeInPath(folder.parent);
      if (foundTypeInParent != null) {
        type = foundTypeInParent;
      }
    }
    return type;
  }
  createParaFolders() {
    return __async(this, null, function* () {
      for (let foldername of this.folderMapping.values()) {
        yield this.app.vault.createFolder(foldername);
      }
    });
  }
  isParaVault() {
    let neededFolders = this.folderMapping.values();
    let root = this.app.vault.getRoot();
    for (let i of neededFolders) {
      let found = root.children.find((elem) => i === elem.name);
      if (found === void 0) {
        return false;
      }
    }
    return true;
  }
  createMetaHeader() {
    let today = (0, import_obsidian3.moment)().format(DATE_FORMAT);
    return `createdAt: ${today}

---
`;
  }
  getDirName(path) {
    if (path.endsWith("/")) {
      return path;
    }
    let lastSlashIdx = path.lastIndexOf("/");
    if (lastSlashIdx === -1) {
      throw new Error("No directory found in path");
    }
    return path.slice(0, lastSlashIdx);
  }
  deleteFolderIfEmpty(folder) {
    if (isParaType(folder.name)) {
      return;
    }
    if (folder.children.length === 0) {
      this.app.vault.delete(folder);
      this.deleteFolderIfEmpty(folder.parent);
    }
  }
};

/* nosourcemap */