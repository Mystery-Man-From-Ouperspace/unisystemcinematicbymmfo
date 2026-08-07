export class unisystemItemSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
        // return mergeObject(super.defaultOptions, {
        return foundry.utils.mergeObject(super.defaultOptions, {
            // classes: ["unisystemcinematicbymmfo", "sheet", "item", `${game.settings.get("unisystemcinematicbymmfo", "light-mode") ? "light-mode" : ""}`],
            classes: ["unisystemcinematicbymmfo", "sheet", "item", `${game.settings.get("unisystemcinematicbymmfo", "gamesystem") === "buffy" ? "buffy" : (game.settings.get("unisystemcinematicbymmfo", "gamesystem") === "angel" ? "angel" : (game.settings.get("unisystemcinematicbymmfo", "gamesystem") === "armyofdarkness" ? "armyofdarkness" : (game.settings.get("unisystemcinematicbymmfo", "gamesystem") === "cityofheroes" ? "cityofheroes" : (game.settings.get("unisystemcinematicbymmfo", "gamesystem") === "ghostsofalbion" ? "ghostsofalbion" : (game.settings.get("unisystemcinematicbymmfo", "gamesystem") === "eldritchskies" ? "eldritchskies" : "")))))}`],

            width: 600,
            height: 450,
            tabs: [{navSelector: ".sheet-tabs", contentSelector: ".sheet-body-items", initial: "description"}]
        })
    }

    /* -------------------------------------------- */

    /** @override */
    get template() {
        const path = "systems/unisystemcinematicbymmfo/templates";
        return `${path}/${this.item.type}-sheet.html`;
    }

    async getData() {
        const data = super.getData(); 
        data.dtypes = ["String", "Number", "Boolean"];
        data.isGM = game.user.isGM;
        data.editable = data.options.editable;
        const itemData = data.system;
        data.data = itemData;

        data.descriptionHTML = await TextEditor.enrichHTML(data.item.system.description, {
            async: false
          })

        return data;
        }

/* -------------------------------------------- */

    /** @override */
    setPosition(options={}) {
        const position = super.setPosition(options);
        const sheetBody = this.element.find(".sheet-body");
        const bodyHeight = position.height - 192;
        sheetBody.css("height", bodyHeight);
        return position;
    }

    /**
   * Handle clickables
   * @param {Event} event   The originating click event
   * @private
   */



}
