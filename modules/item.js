export class unisystemItem extends Item {
    /** @inheritDoc */
    async _preCreate(data, options, user) {
        await super._preCreate(data, options, user);

        console.log('Je suis dans _preCreate()')

        let updates = {}
        // const stats = this.parent._stats
        const type = data.type

        // Pour un acteur non dupliqué, non provenant d'un compendium et non exporté
        // if (!stats.duplicateSource && !stats.compendiumSource && !stats.exportSource) {
            // Image par défaut
            if (!foundry.utils.hasProperty(data, "img")) {
                switch (type) {
                case "quality":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/_quality.png";
                    break;
                case "drawback":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/_drawback.png";
                    break;
                case "skill":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/_skill.png";
                    break;
                case "power":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/_power.png";
                    break;
                case "aspect":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/_aspect.png";
                    break;
                case "weapon":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/hand_weapons/hand_weapon.png";
                    break;
                case "item":
                    break;
                case "locations":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/locations/locations.png";
                    break;
                case "facilities":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/locations/modern-city.png";
                    break;
                case "staff":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/people/three-friends.png";
                    break;
                case "weaponery":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/other_gear/weaponery.png";
                    break;
                case "gear":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/other_gear/gear.png";
                    break;
                case "vehicles":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/driving.png";
                    break;
                case "science":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/sciences.png";
                    break;
                case "medical":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/other_gear/medical-resources.png";
                    break;
                case "restricted":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/other_gear/restricted.png";
                    break;
                case "maneuver":
                    updates.img = "systems/unisystemcinematicbymmfo/images/conx_icons/_maneuver.png";
                    break;
                default:
                    console.log(`Oups !`);
                }
            }
        // }
        this.updateSource(updates)
    }

    async prepareData() {
        super.prepareData()

        // Get the Item's data & Actor's data
        const itemData = this.system
        const actorData = this.actor ? this.actor.system : {}

        // Prepare Data based on item type
        if (itemData && actorData) {
            switch (this.type) {
                case 'item':
                    this._prepareItem(actorData, itemData)
                    break

                case 'quality':
                case 'drawback':
                    this._prepareQualityDrawback(actorData, itemData)
                    break

                case 'aspect':
                    this._prepareAspect(actorData, itemData)
                    break

                case 'skill':
                case 'power':
                case "maneuver":
                    this._prepareSkillPowerManeuver(actorData, itemData)
                    break

                case 'weapon':
                    this._prepareWeaponItem(actorData, itemData)
                    break
                case 'locations':
                case 'facilities':
                case 'staff':
                case 'weaponery':
                case 'gear':
                case 'vehicles':
                case 'science':
                case 'medical':
                case 'restricted':
                    this._prepareGearItem(actorData, itemData)
                    break
            }
        }
    }

    _prepareItem(actorData, itemData) {




        actorData.descriptionHTML = TextEditor.enrichHTML(itemData.description, {
          secrets: false,
          async: true
        });
  
  
  
  
  
    }

    _prepareQualityDrawback(actorData, itemData) {




        actorData.descriptionHTML = TextEditor.enrichHTML(itemData.description, {
          secrets: false,
          async: true
        });
  
  
  
  
  
    }

    _prepareAspect(actorData, itemData) {




        actorData.descriptionHTML = TextEditor.enrichHTML(itemData.description, {
          secrets: false,
          async: true
        });
  
  
  
  
  
    }

    _prepareSkillPowerManeuver(actorData, itemData) {




        actorData.descriptionHTML = TextEditor.enrichHTML(itemData.description, {
          secrets: false,
          async: true
        });
  
  
  
  
  
    }

    _prepareGearItem(actorData, itemData) {




        actorData.descriptionHTML = TextEditor.enrichHTML(itemData.description, {
          secrets: false,
          async: true
        });
  
  
  
  
  
    }

    _prepareWeaponItem(actorData, itemData) {




        actorData.descriptionHTML = TextEditor.enrichHTML(itemData.description, {
          secrets: false,
          async: true
        });
  
  
  
  
  
        // Build Damage String by combining Damage Entry with Damage Multiplier Entry (Looks at Actor to grab Multiplier Value)
        // This does not apply to weapons on vehicles
        if (itemData.damage_cha_multiplier != "none" && this.isEmbedded && this.actor.type != 'vehicle') {
            console.log(this.actor.type)
            itemData.damage_string = `${itemData.damage}*${actorData[itemData.damage_cha_multiplier].value + (itemData.damage_cha_multiplier_bonus) + (itemData.damage_type == 1 ? 1 : 0)}`
        }
        else  {
            itemData.damage_string = itemData.damage
        }
    
    }
}
