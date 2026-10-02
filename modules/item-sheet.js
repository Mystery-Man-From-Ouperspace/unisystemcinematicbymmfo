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

        const actorData = this.actor ? this.actor.system : {}
        const myActor = this.actor

        const myItem = this

        console.log("item", this.document)
        console.log("Actor", this.actor)

        data.primaryAttributeChoices =  this._prepareManeuverPrimaryAttributeChoices(myActor)
        data.skillChoices =  this._prepareManeuverSkillChoices(myActor)
        data.aspectChoices =  this._prepareManeuverAspectChoices(myActor)
        data.qualityChoices =  this._prepareManeuverQualityChoices(myActor)
        data.drawbackChoices =  this._prepareManeuverDrawbackChoices(myActor)
        data.weaponChoices =  this._prepareManeuverWeaponChoices(myActor)

        return data
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

    _prepareManeuverPrimaryAttributeChoices(myActor) {

        console.log('Je suis dans _prepareManeuverPrimaryAttributeChoices')
        
        // Initialize Container
        let primaryAttributeMenuObj = Object.freeze({
            none: {
                id: "none",
                label: "UNISYSTEMCINEMATIC.None",
            },
            strength: {
                id: "strength",
                label: "UNISYSTEMCINEMATIC.strength",
            },
            dexterity: {
                id: "dexterity",
                label: "UNISYSTEMCINEMATIC.dexterity",
            },
            constitution: {
                id: "constitution",
                label: "UNISYSTEMCINEMATIC.constitution",
            },
            intelligence: {
                id: "intelligence",
                label: "UNISYSTEMCINEMATIC.intelligence",
            },
            perception: {
                id: "perception",
                label: "UNISYSTEMCINEMATIC.perception",
            },
            willpower: {
                id: "willpower",
                label: "UNISYSTEMCINEMATIC.willpower",
            }
        })

        console.log("primaryAttributeMenuObj", primaryAttributeMenuObj)

        let primaryAttributeChoices = Object.fromEntries(Object.entries(primaryAttributeMenuObj).map(([key, value]) => [key, { label: game.i18n.localize(value.label) }]))

        return primaryAttributeChoices
    }


    _prepareManeuverWeaponChoices(myActor) {

        console.log('Je suis dans _prepareManeuverWeaponChoices')

        // let weaponMenu = []
        let weaponMenuObj = {}

        let item

        const myParent = myActor

        weaponMenuObj["None"] = { id: "None", label: game.i18n.localize("UNISYSTEMCINEMATIC.None") }

        // Iterate through items and assign to container
        if (myParent != null) {
            if (myParent.weapon != null) {
                for (const item of myParent.weapon) {
                    console.log("J'étudie les weapons")
                    weaponMenuObj[item._id] = { id: item._id, label: item.name }
                }
            }
        }

        let weaponChoices = Object.fromEntries(Object.entries(weaponMenuObj).map(([key, value]) => [key, { label: value.label }]))

        return weaponChoices
    }

    _prepareManeuverSkillChoices(myActor)  {

        console.log('Je suis dans _prepareManeuverSkillChoices')

        let skillMenuObj = {}

        let myLabel

        const myParent = myActor

        skillMenuObj["None"] = { id: "None", label: game.i18n.localize("UNISYSTEMCINEMATIC.None") }


        // Iterate through items and assign to container
        if (myParent != null) {
            if (myParent.skill != null) {
                for (const item of myParent.skill) {
                    console.log("J'étudie les skills")
                    myLabel = item.name+" "+item.system.level

                    skillMenuObj[item._id] = { id: item._id, label: myLabel }
                }

            }
        }

        let skillChoices = Object.fromEntries(Object.entries(skillMenuObj).map(([key, value]) => [key, { label: value.label }]))

        return skillChoices

    }
    
        _prepareManeuverAspectChoices(myActor)  {

        console.log('Je suis dans _prepareAspectSkillChoices')

        let aspectMenuObj = {}

        let myLabel

        const myParent = myActor

        aspectMenuObj["None"] = { id: "None", label: game.i18n.localize("UNISYSTEMCINEMATIC.None") }


        // Iterate through items and assign to container
        if (myParent != null) {
            if (myParent.aspect != null) {
                for (const item of myParent.aspect) {
                    console.log("J'étudie les aspects")
                    myLabel = item.name+" "+item.system.power

                    aspectMenuObj[item._id] = { id: item._id, label: myLabel }
                }

            }
        }

        let aspectChoices = Object.fromEntries(Object.entries(aspectMenuObj).map(([key, value]) => [key, { label: value.label }]))

        return aspectChoices

    }

    
    _prepareManeuverQualityChoices(myActor)  {

        console.log('Je suis dans _prepareManeuverQualityChoices')

        let qualityMenuObj = {}

        let myLabel

        const myParent = myActor

        qualityMenuObj["None"] = { id: "None", label: game.i18n.localize("UNISYSTEMCINEMATIC.None") }


        // Iterate through items and assign to container
        if (myParent != null) {
            if (myParent.quality != null) {
                for (const item of myParent.quality) {
                    console.log("J'étudie les qualities")
                    myLabel = item.name+" "+item.system.cost

                    qualityMenuObj[item._id] = { id: item._id, label: myLabel }
                }

            }
        }

        let qualityChoices = Object.fromEntries(Object.entries(qualityMenuObj).map(([key, value]) => [key, { label: value.label }]))

        return qualityChoices

    }

    _prepareManeuverDrawbackChoices(myActor)  {

        console.log('Je suis dans _prepareManeuverDrawbackChoices')

        let drawbackMenuObj = {}

        let myLabel

        const myParent = myActor

        drawbackMenuObj["None"] = { id: "None", label: game.i18n.localize("UNISYSTEMCINEMATIC.None") }

        // Iterate through items and assign to container
        if (myParent != null) {
            if (myParent.drawback != null) {
                for (const item of myParent.drawback) {
                    console.log("J'étudie les drawbacks")
                    myLabel = item.name+" "+item.system.cost

                    drawbackMenuObj[item._id] = { id: item._id, label: myLabel }
                }

            }
        }

        let drawbackChoices = Object.fromEntries(Object.entries(drawbackMenuObj).map(([key, value]) => [key, { label: value.label }]))

        return drawbackChoices

    }


}