// ==UserScript==
// @name			HW Goodwin
// @name:en			HW Goodwin
// @namespace		HW Goodwin
// @description		Упрощает и автоматизирует многие аспекты игры Хроники Хаоса
// @description:en	Simplifies and automates many aspects in the game Hero Wars
// @author			Goodwin & ZingerY
// @license 		Copyright Goodwin
// @version			4.148
// @homepage		https://hw-script.goodwin.best/
// @downloadURL		https://hw-script.goodwin.best/updates/HW-Goodwin.user.js
// @updateURL		https://hw-script.goodwin.best/updates/HW-Goodwin.meta.js
// @icon64			https://hw-script.goodwin.best/images/logo.jpg
// @match			https://www.hero-wars.com/*
// @match			https://apps-1701433570146040.apps.fbsbx.com/*
// @run-at			document-start
// @grant           none
// ==/UserScript==
(function () {
  console.log("Start " + GM_info.script.name + ", v" + GM_info.script.version);
  const dd = this;
  const dp = {
    set: function (yr) {
      dd.Game = this;
      dd.GameModel = yr;
      this["game.model.GameModel_"] = yr;
    },
    get: function () {
      return this["game.model.GameModel_"];
    }
  };
  Object.defineProperty(Object.prototype, "game.model.GameModel", dp);
  const dz = {
    set: function (yr) {
      if (dd.Game && typeof yr.j === "string" && yr.j != "" && !dd.Game[yr.j]) {
        dd.Game[yr.j] = yr;
      }
      this.__class_ = yr;
    },
    get: function () {
      return this.__class_;
    }
  };
  Object.defineProperty(Object.prototype, "__class__", dz);
  function dl() {
    var yr;
    var ym;
    var yU;
    var yQ;
    var q0 = this;
    var q1 = 1000000000;
    this.lib = null;
    this.urlGame = null;
    let q2 = {
      bindFunc: function (qH, qM) {
        if (qM == null) {
          return null;
        }
        if (qM.__id__ == null) {
          qM.__id__ = q1++;
        }
        var qS;
        if (qH.hx__closures__ == null) {
          qH.hx__closures__ = {};
        } else {
          qS = qH.hx__closures__[qM.__id__];
        }
        if (qS == null) {
          qS = qM.bind(qH);
          qH.hx__closures__[qM.__id__] = qS;
        }
        return qS;
      }
    };
    function q3(qH, qM) {
      const qS = {
        time: qH,
        id: qM
      };
      return qS;
    }
    var q4 = {};
    this.BattleCalc = function (qH, qM, qS, qD) {
      const qt = q2.DataStorage[q8(q2.DataStorage, 24)][q6(q2.BattleConfigStorage, qM)]();
      const qA = q9(q2.BattleLogEventHero)[0];
      const qi = q9(q2.BattleLogEventHeroEnergy);
      let qs = new q2.BattlePresets(qH.progress, !1, !0, qt, !1);
      let qk = qH.progress?.length > 1 ? new q2.MultiBattleInstantReplay(qH, qs) : new q2.BattleInstantPlay(qH, qs);
      let qG = qs[q6(q2.BattlePresets, "get_timeLimit")]();
      let qF;
      let qL;
      q4 = {};
      qk[q9(q2.BattleInstantPlay)[9]].add(qO => {
        qF = qO[q6(q2.BattleInstantPlay, "get_result")]();
        const qR = [];
        const qI = [];
        const qK = [];
        if (qS.base) {
          for (let qE of qF[q9(q2.MultiBattleResult)[2]]) {
            qL = q2.battle_log_BattleLogEncoder.read(new q2.BattleLogReader(qE));
            qK.push(qL.filter(qa => Object.getPrototypeOf(qa).__class__.name === q2.BattleLogEventHeroEnergy.name && qa[qA] > 0 && qa[qi[0]] < 1000 && qa[qi[0]] + qa[qi[1]] >= 1000).map(qa => q3(qa.time, qa[qA])));
            qI.push(qL);
            qR.push(Math.max(...qL.map(qa => qa.time < qG && qa.time !== 168.8 ? qa.time : 0)));
          }
        }
        var qJ = {
          progress: qF[q6(q2.MultiBattleResult, "get_progress")](),
          result: qF[q6(q2.MultiBattleResult, "get_result")]()
        };
        if (qS.base) {
          qJ.ultsReady = qK;
          qJ.battleTime = qR;
        }
        if (qS.battleData) {
          qJ.battleData = qO[q6(q2.BattleInstantPlay, "get_rawBattleInfo")]();
        }
        if (qS.timeLine) {
          qJ.timeLine = Object.values(q4).sort((qa, qo) => qa.time - qo.time);
        }
        if (qS.logs) {
          qJ.logs = qI;
        }
        qD(qJ);
      });
      qk.start();
    };
    function q5(qH, qM, qS) {
      qS = qS || false;
      let qD = Object.entries(qH.__properties__);
      if (qS) {
        return qD.filter(qt => qt[0] == qM).pop()[1];
      } else {
        return qD.filter(qt => qt[1] == qM).pop()[0];
      }
    }
    function q6(qH, qM, qS) {
      return q5(qH.prototype, qM, qS);
    }
    function q7(qH, qM) {
      let qS = Object.entries(qH.__properties__);
      return qS.filter(qD => qD[1] == qM).pop()[0];
    }
    function q8(qH, qM) {
      let qS = Object.keys(qH);
      return qS[qM];
    }
    function q9(qH) {
      return Object.keys(qH.prototype);
    }
    function qd(qH, qM) {
      let qS = Object.keys(Object.getPrototypeOf(qH));
      qM = qS.find(qD => qH[qD] instanceof qM);
      if (qM != null) {
        return qH[qM];
      } else {
        return null;
      }
    }
    async function qp(qH, qM = 0, qS = 0) {
      let qt = await vI.confirm(p3(dR.MSG_SPECIFY_QUANT) + "\n" + dr(qM) + " - " + dr(qS), {}, {
        buttons: [{
          msg: p3(dR.BTN_SELECT),
          placeholder: p3(dR.ENTER_COUNT),
          isInput: true,
          default: qH || ""
        }, {
          isClose: true,
          result: false
        }]
      });
      if (qt) {
        return p0(qt, qH, qM, qS);
      } else {
        return qt;
      }
    }
    const qz = [4500, 45000, 466667, 850000, 1133333, 1416667, 1700000, 1983333, 2266667, 2550000, 2833333, 3116667, 3400000, 3683333, 3966667, 4250000, 4533333, 4833329, 5133329, 5433329, 5733329, 6033329, 6333329, 6633329, 6933329, 7233329, 7533329, 7833329, 8133329, 8433329];
    let ql = 0;
    async function qv(qH, qM, qS) {
      switch (qH) {
        case "heroes":
          pl.updateArtifacts.button.hidden = qM;
          pl.updateSkins.button.hidden = qM;
          break;
        case "game.mechanics.quiz.popup.QuizStartPopup":
          pl.autoQuiz.button.hidden = qM;
          break;
        case "game.mechanics.scratch_lottery.popup.ScratchLotteryBoxSwapPopup":
        case "game.mechanics.scratch_lottery.popup.ScratchLotteryRewardSwapPopup":
          if (!qM) {
            pn = qS[q9(q2.ScratchLotteryPopupMediatorBase)[1]][q9(q2.PlayerScratchLottery)[7]][q9(q2.InventoryItem)[1]]._id;
          }
          pl.openCache.button.hidden = qM;
          break;
        case "game.view.popup.specialofferlootbox.festival.FestivalLootBoxPopup":
          if (!qM) {
            const qD = qS[q9(q2.FestivalLootBoxPopupMediator)[0]];
            const qt = Object.values(qD[q9(q2.PlayerSpecialOfferEntry)[4]].lootBoxes)[0];
            ph = {
              coinToOpen: Object.keys(qt.price.openCoin.cost.coin)[0],
              superPrize: Object.keys(qt.superPrize.reward.coin)[0],
              offerId: qD._id
            };
            pl.swapHoney.button.children[0].innerText = p3(ph.superPrize == 23 ? dR.SWAP_CANDY : dR.SWAP_HONEY);
            pl.swapHoney.button.title = p3(ph.superPrize == 23 ? dR.SWAP_CANDY_TITLE : dR.SWAP_HONEY_TITLE);
          }
          pl.swapHoney.button.hidden = qM;
          break;
        case "game.view.popup.shop.buy.BuyTitanArtifactItemPopup":
          if (!qM && pd("countControl.evolve")) {
            const qA = q6(q2.BuyTitanArtifactItemPopupMediator, "get_fragmentsToNextEvolutionStar");
            if (qS[qA]) {
              qS[q9(q2.BuyItemPopupMediator)[9]] = qS[qA]();
            }
          }
          break;
        case "titan_artifact_chest":
        case "game.view.popup.titanspiritartifact.TitanSpiritArtifactPopup":
          if (!qM) {
            let qi = ["titanArtifactGetChest", "titanSpiritGetAll", "inventoryGet"].map(qL => ({
              name: qL,
              args: {},
              ident: qL
            }));
            let qs = 0;
            let qk = await dd.Send({
              calls: qi
            }).then(qL => qL.results.map(qO => qO.result.response));
            let qG = qk[0].starmoneySpent;
            let qF = Object.values(qk[1]).reduce((qL, qO) => qL + qO.star, 0) + Object.entries(qk[2].fragmentTitanArtifact).filter(qL => qL[0] >= 4000).reduce((qL, qO) => qL + qO[1], 0) - 1;
            while (qs <= 0 && ++qF < 30) {
              qs = qz[qF] - qG;
            }
            b3(p3(dR.TOTEMS_INFO, {
              count: dr(qF),
              toNext: dr(qs)
            }));
          } else {
            b3("");
          }
          break;
        case "game.view.popup.clan.ClanItemForActivityPopup":
          if (!qM) {
            Y4();
          }
          break;
        case "game.mechanics.adventure.popup.mapSolo.AdventureSoloMapPopup":
          pl.adventureSolo.button.hidden = qM;
          break;
        case "game.mechanics.adventure.popup.map.AdventureMapPopup":
          pl.adventure.button.hidden = qM;
          break;
        case "game.mechanics.adventure.popup.sanctuary.SanctuaryPopup":
          pl.adventureRaid.button.hidden = qM;
          break;
        case "game.mechanics.season_adventure.popup.SeasonAdventureMapPopup":
          pl.changeMap.button.hidden = qM;
          break;
        case "game.mechanics.titan_arena.popup.TitanArenaPopup":
          pl.titanDef.button.hidden = qM;
          pl.attackLord.button.hidden = qM;
          break;
        case "game.mechanics.clanDomination.popup.ClanDominationMapPopup":
          p5.eventDomination.cbox.hidden = qM;
          break;
        case "game.mechanics.brawl.popup.BrawlAttackTeamGatherPopup":
          if (!qM) {
            const qL = q9(q2.BrawlAttackTeamGatherPopupMediator)[2];
            const qO = qS[qL][q6(q2.PlayerBrawlEnemy, "get_power")]();
            const qR = qS[qL][q6(q2.PlayerBrawlEnemy, "get_name")]().split(" ");
            const qI = qR.slice(1).join(" ");
            pB = pq[qR[0]];
            b3(p3(dR.BRAWL_TEST_TEAM, {
              name: qI,
              power: dr(qO)
            }));
          }
          break;
        case "brawl":
          pl.autoBrawls.button.hidden = qM;
          break;
        case "game.mechanics.boss_event.popup.BossEventPopup":
          pl.bossRatingEvent.button.hidden = qM;
          break;
        case "game.mechanics.halloween2020event.popup.Halloween2020GameModePopup":
          pl.bossRatingEventSouls.button.hidden = qM;
          break;
        case "grandArena":
          pl.swapGrand.button.hidden = qM;
          break;
        case "epic_brawl":
          p5.eventEBR.cbox.hidden = qM;
          pl.epicBrawlDefRating.button.hidden = qM;
          pl.epicBrawlAttRating.button.hidden = qM;
          if (!qM) {
            let qa = await dd.Send({
              calls: [{
                name: "battleGetByType",
                args: {
                  type: "epic_brawl",
                  limit: 20,
                  offset: 0
                },
                ident: "battleGetByType"
              }]
            });
            let qo = qa.results[0].result.response.replays;
            lb(qo);
            ld();
          }
          break;
        case "store:merchant":
          pl.buyHeroFragments.button.hidden = qM;
          break;
        case "game.mechanics.clan_raid.map.ClanRaidMapPopup":
          pl.raidNodes.button.hidden = qM;
          break;
        case "clan_boss_chest_graphics":
          pl.rollAscension.button.hidden = qM;
          break;
        case "game.mechanics.invasion.popup.boss.InvasionBossPopup":
          pl.bossInvasionRating.button.hidden = qM;
          if (!qM) {
            const qu = qS.action[q9(q2.InvasionAction)[17]];
            const qP = q6(q2.InvasionActionPayloadBoss, "get_level");
            const qT = q6(q2.InvasionActionPayloadBoss, "get_id");
            py = {
              lvl: qu[qP](),
              id: qu[qT]()[q9(q2.BattleId)[1]]
            };
          }
        case "game.mechanics.invasion.popup.hub.InvasionHubPopup":
        case "game.mechanics.invasion.popup.map.InvasionMapPopup":
          ql += qM ? -1 : 1;
          p5.eventInvasion.cbox.hidden = ql <= 0;
          break;
        case "game.view.popup.activity.SpecialQuestEventPopup":
        case "mail":
        case "battle_pass":
        case "quests_daily":
        case "game.view.popup.clan.hub.ClanHubPopup":
          pl.allRewardsFarm.button.hidden = qM;
          break;
      }
    }
    this.showLootboxReward = function (qH, qM = true) {
      console.log(qH);
    };
    let qb = [function () {
      const qH = q9(q2.TiledMapCell)[20];
      const qM = q9(q2.Signal0)[0];
      const qS = q6(q2.TiledMapCell, "get_level");
      q2.ClanDominationMapCellImpl.prototype[q9(q2.ClanDominationMapCellImpl)[3]] = function () {
        this._state = this.visible || pd("showTown") && pY?.view?.[this[qS]()] ? 2 : 1;
        this[qH][qM]();
      };
    }, function () {
      const qH = q9(q2.AdventureMapCamera);
      const qM = q2.AdventureMapCamera.prototype[qH[41]];
      q2.AdventureMapCamera.prototype[qH[41]] = function (qS) {
        this[qH[5]] = 0.35;
        qM.bind(this)(qS);
      };
    }, function () {
      const qH = q6(q2.MultiBattleResult, "get_result");
      const qM = q9(q2.PlayerMissionData);
      const qS = q2.PlayerMissionData.prototype[qM[12]];
      const qD = q9(q2.CommandManager);
      const qt = q9(q2.RPCCommandBase);
      const qA = q9(q2.MissionCommandList)[2];
      const qi = q9(q2.BattleInstantPlay)[9];
      const qs = q8(q2.DataStorage, 24);
      const qk = q9(yr)[2];
      q2.PlayerMissionData.prototype[qM[12]] = function (qR, qI, qK) {
        if (pd("passBattle")) {
          try {
            this[qM[9]] = new q2.PlayerMissionBattle(qR, qI, qK);
            qR = new q2.BattlePresets(!1, !1, !0, q2.DataStorage[qs][q6(q2.BattleConfigStorage, vB(qK))](), !1);
            qR = new q2.BattleInstantPlay(qK, qR);
            qR[qi].add(q2.bindFunc(this, this.P$h));
            qR.start();
            return;
          } catch (qJ) {
            console.error("company", qJ);
          }
        }
        qS.call(this, qR, qI, qK);
      };
      q2.PlayerMissionData.prototype.P$h = function (qR) {
        yU[qk][qD[20]][qA](qR[qH]())[qt[16]](q2.bindFunc(this, this[qM[32]]));
      };
      const qG = q9(q2.PlayerTowerData);
      const qF = q2.PlayerTowerData.prototype[qG[39]];
      const qL = q9(q2.BattleConfigStorage)[20];
      const qO = q9(q2.TowerCommandList)[2];
      q2.PlayerTowerData.prototype[qG[39]] = function (qR) {
        if (pd("passBattle")) {
          try {
            var qI = new q2.BattlePresets(!1, !1, !0, q2.DataStorage[qs][qL](), !1);
            qR = new q2.BattleInstantPlay(qR, qI);
            qR[qi].add(q2.bindFunc(this, this.P$h));
            qR.start();
            return;
          } catch (qK) {
            console.error("tower", qK);
          }
        }
        qF.call(this, qR);
      };
      q2.PlayerTowerData.prototype.P$h = function (qR) {
        this[q8(this, 35)][qO](qR[qH]())[qt[17]](q2.bindFunc(this, this[qG[66]]));
      };
    }, function () {
      const qH = q9(q2.SettingToggleButton)[3];
      const qM = q9(q2.BattlePausePopupClip);
      const qS = q9(q2.BattlePausePopupMediator);
      const qD = q6(q2.BattlePausePopupMediator, "get_retreatButtonLabel");
      const qt = q9(q2.starling_display_DisplayObjectContainer)[3];
      const qA = q9(q2.ClipLabelBase);
      const qi = q9(q2.BattlePausePopup);
      const qs = q2.BattlePausePopup.prototype[qi[4]];
      const qk = q9(q2.ClipButtonLabeledCentered);
      const qG = q9(q2.GuiClipContainer)[2];
      const qF = q2.BattlePausePopupMediator.prototype[qD];
      q2.BattlePausePopup.prototype[qi[4]] = function (qL) {
        if (pd("passBattle") && pj != "arenaAttack" && pj != "grandAttack") {
          try {
            let qO;
            q2.BattlePopup.prototype[qi[4]].call(this, qL);
            this[qi[3]]();
            this[qt](this.clip[qG]());
            this.clip[qM[1]][qA[9]](q2.Translate.translate("UI_POPUP_BATTLE_PAUSE"));
            this.clip[qM[2]][qk[2]](q2.Translate.translate("UI_POPUP_BATTLE_RETREAT"), (qO = this[qi[1]], q2.bindFunc(qO, qO[qS[17]])));
            this.clip[qM[5]][qk[2]](this[qi[1]][qS[14]](), this[qi[1]][qS[13]]() ? (qO = this[qi[1]], q2.bindFunc(qO, qO[qS[18]])) : (qO = this[qi[1]], q2.bindFunc(qO, qO[qS[18]])));
            this.clip[qM[5]][qk[0]][qA[24]]();
            this.clip[qM[3]][qH](this[qi[1]][qS[9]]());
            this.clip[qM[4]][qH](this[qi[1]][qS[10]]());
            this.clip[qM[6]][qH](this[qi[1]][qS[11]]());
            return;
          } catch (qR) {
            console.error("passBattle", qR);
          }
        }
        qs.call(this, qL);
      };
      q2.BattlePausePopupMediator.prototype[qD] = function () {
        if (pd("passBattle")) {
          return q2.Translate.translate("UI_POPUP_BATTLE_SKIP");
        } else {
          return qF.call(this);
        }
      };
    }, function () {
      const qH = q9(q2.BattleSettingsModel);
      const qM = q6(q2.BooleanProperty, "get_value");
      const qS = q6(q2.RuleStorage, "get_battleSpeedMultiplier", true);
      const qD = q9(q2.BattleController);
      const qt = q8(q2.DataStorage, 23);
      const qA = q8(q2.BattleController, 3);
      const qi = q8(q2.Reflect, 1);
      const qs = q6(q2.BattlePresets, "get_config");
      const qk = q6(q2.BattleController, "get_timeScale");
      const qG = q2.BattleController.prototype[qk];
      q2.BattleController.prototype[qk] = function () {
        let qF = pz("speedBattle");
        if (qF) {
          try {
            if (this[qD[12]][qH[12]][qM]()) {
              return 0;
            }
            if (this[qD[12]][qH[2]][qM]()) {
              var qL = qF * this[qD[49]]();
            } else {
              qL = this[qD[12]][qH[1]][qM]();
              const qR = Math.max(...this[qD[14]]);
              const qI = qL == this[qD[14]].indexOf(qR) ? qR >= 4 ? qF : this[qD[14]][qL] : this[qD[14]][qL];
              qL = qI * q2.BattleController[qA][qM]() * this[qD[49]]();
            }
            if (qL > this[qD[12]][qH[24]][qM]()) {
              qL = this[qD[12]][qH[24]][qM]();
            }
            var qO = q2.DataStorage[qt][qS]();
            if (qO != null) {
              qL = q2.Reflect[qi](qO, this[qD[1]][qs]().ident) ? qL * q2.Reflect[qi](qO, this[qD[1]][qs]().ident) : qL * q2.Reflect[qi](qO, "default");
            }
            return qL;
          } catch (qK) {
            console.error("speedBattle", qK);
          }
        }
        return qG.call(this);
      };
    }, function () {
      const qH = q9(q2.BattleGuiMediator);
      const qM = q2.BattleGuiMediator.prototype[qH[44]];
      const qS = q9(q2.BooleanPropertyWriteable)[0];
      q2.BattleGuiMediator.prototype[qH[44]] = function () {
        try {
          this[qH[9]][qS](true);
          this[qH[10]][qS](true);
        } catch (qD) {
          console.error("battleFastKey", qD);
          qM.call(this);
        }
      };
    }, function () {
      const qH = q9(q2.BattleThread)[74];
      const qM = q2.BattleThread.prototype[qH];
      q2.BattleThread.prototype[qH] = async function (qS) {
        q4 = {};
        if (pI) {
          await l2();
        }
        qM.call(this, qS);
      };
    }, function () {
      const qH = q6(q2.TitanArtifactChestRewardPopupMediator, "get_openAmount");
      const qM = q2.TitanArtifactChestRewardPopupMediator.prototype[qH];
      q2.TitanArtifactChestRewardPopupMediator.prototype[qH] = function () {
        if (pG) {
          pG--;
          return 100;
        }
        return qM.call(this);
      };
      const qS = q6(q2.ArtifactChestRewardPopupMediator, "get_openAmount");
      const qD = q2.ArtifactChestRewardPopupMediator.prototype[qS];
      q2.ArtifactChestRewardPopupMediator.prototype[qS] = function () {
        if (pG) {
          pG--;
          return 100;
        }
        return qD.call(this);
      };
      const qt = q6(q2.AscensionChestRewardPopupMediator, "get_openAmount");
      const qA = q2.AscensionChestRewardPopupMediator.prototype[qt];
      q2.AscensionChestRewardPopupMediator.prototype[qt] = function () {
        if (pG) {
          pG--;
          return 10;
        }
        return qA.call(this);
      };
    }, function () {
      const qH = q6(q2.BattleThread, "get_onViewDisposed");
      const qM = q6(q2.GameBattleView, "get_thread");
      const qS = q2.GameBattleView.prototype[qM];
      q2.GameBattleView.prototype[qM] = function () {
        const qD = {
          [qH]: async () => {}
        };
        return qS.call(this) || qD;
      };
    }, function () {
      q2.PlayerDungeonData.prototype[q9(q2.PlayerDungeonData)[21]] = function () {
        return true;
      };
    }, function () {
      q2.SendReplayPopUpMediator.prototype[q9(q2.SendReplayPopUpMediator)[6]] = function () {
        return true;
      };
    }, function () {
      const qH = q9(q2.CommandDemoBattleEnd);
      q2.CommandDemoBattleEnd.prototype[qH[4]] = function () {
        return true;
      };
      q2.CommandDemoBattleEnd.prototype[qH[6]] = function () {
        return;
      };
    }, function () {
      const qH = q9(q2.PopupMediator);
      const qM = q8(q2.PopUpManager, 6);
      const qS = q9(q2.PopupBase);
      const qD = q9(q2.PopupStashEventParams)[0];
      const qt = q9(q2.starling_display_DisplayObject);
      q2.PopupMediator.prototype.close = function () {
        try {
          const qA = this;
          const qi = qA[qH[5]];
          if (qi) {
            qv(qi[qS[4]][qD], true);
          }
          if (this[qH[12]] != null) {
            this[qH[12]]().then(function () {
              if (qA[qH[12]] != null) {
                qA[qH[12]] = null;
                qA.close();
              }
            });
          } else {
            if (qi != null) {
              q2.PopUpManager[qM](qi);
              if (qi[qt[87]]() != null) {
                qi[qt[23]]();
              }
              qi.dispose();
            }
            this.dispose();
          }
        } catch (qs) {
          console.error("closeWindow", qs);
          dv.refreshGame();
        }
      };
      q2.PopupMediator.prototype.open = function (qA) {
        try {
          const qi = this.createPopup();
          if (qi) {
            qv(qi[qS[4]][qD], false, this);
          }
          qi[qS[5]] = qA;
          qi.open();
        } catch (qs) {
          console.error("openWindow", qs);
          dv.refreshGame();
        }
      };
    }, function () {
      const qH = q9(q2.Clip)[1];
      const qM = q9(q2.Container)[0];
      const qS = q9(q2.Node);
      const qD = q9(q2.Matrix);
      const qt = q9(q2.ClipAsset)[13];
      const qA = q9(q2.com_progrestar_framework_ares_core_State)[2];
      const qi = q9(q2.RsxGuiAsset)[1];
      q2.RsxGuiAsset.prototype.create = function (qs, qk, qG) {
        if (qG == null) {
          qG = [];
        }
        qs = new (Function.prototype.bind.apply(qs, [null].concat(qG)))();
        if (qk && (!qk.includes("offerwall") || !pd("noOfferDonat"))) {
          let qF = this.data[qt](qk);
          let qL = qj[qk];
          if (qL) {
            for (let qO in qV) {
              qs[qO] = new q2.ClipButton();
            }
            for (let qR in qV) {
              Object.assign(qV[qR], qF[qH][0][qM][qV[qR].baseId + qL.number]);
            }
            if (pd("interface.selectItem")) {
              for (let qI in qV) {
                let qJ = structuredClone(qV[qI][qS[2]]);
                let qE = qV[qI].change[qk] ?? {
                  dx: 0,
                  dy: 0
                };
                qJ.name = qV[qI].name;
                qJ[qA][qD[0]] *= qV[qI].width;
                qJ[qA][qD[3]] *= qV[qI].height;
                qJ[qA][qD[4]] += qV[qI].dx + qE.dx;
                qJ[qA][qD[5]] += qV[qI].dy + qE.dy;
                qF[qH][0][qM][qV[qI].id + qL.count] = {
                  [qS[0]]: qV[qI].id + qL.count + 1,
                  [qS[1]]: qV[qI][qS[1]],
                  [qS[2]]: qJ,
                  __id__: qV[qI].__id__ + 1000000,
                  _id: qV[qI]._id + 10000
                };
              }
            } else {
              qF[qH][0][qM] = qF[qH][0][qM].filter(qa => !Object.values(qV).map(qo => qo.id + qL.count + 1).includes(qa[qS[0]]));
            }
          }
          this[qi].create(qs, qF);
        }
        return qs;
      };
    }, function () {
      const qH = q8(q2.GuiClipClassMap, 2);
      const qM = q8(q2.BuyItemPopupClip, 2);
      const qS = q9(q2.LootBoxBulkUsePopup);
      const qD = q9(q2.ClipButton)[1];
      const qt = q8(q2.LootBoxBulkUsePopupClip, 2);
      const qA = q9(q2.BuyItemPopup);
      const qi = q2.GuiClipClassMap[qH];
      const qs = q2.LootBoxBulkUsePopup.prototype[qS[5]];
      const qk = q2.BuyItemPopup.prototype[qA[4]];
      for (let qG in qV) {
        q2.BuyItemPopupClip[qM][qG] = q2.ClipButton;
      }
      for (let qF in qV) {
        q2.LootBoxBulkUsePopupClip[qt][qF] = q2.ClipButton;
      }
      q2.GuiClipClassMap[qH] = function () {
        let qL = qi.call(this);
        for (let qO in qV) {
          qL[qV[qO].name] = qO;
        }
        return qL;
      };
      q2.BuyItemPopup.prototype[qA[4]] = function () {
        qk.call(this);
        if (pd("interface.selectItem")) {
          for (let qL in qV) {
            this.clip[qL][qD]().add(q2.bindFunc(this[qA[0]], this[qA[0]][qV[qL].name]));
          }
        }
      };
      q2.LootBoxBulkUsePopup.prototype[qS[5]] = function () {
        qs.call(this);
        if (pd("interface.selectItem")) {
          for (let qL in qV) {
            this.clip[qL][qD]().add(q2.bindFunc(this[qS[2]], this[qS[2]][qV[qL].name]));
          }
        }
      };
    }, function () {
      const qH = q2.BuyItemPopupMediator;
      const qM = q2.LootBoxBulkUsePopupMediator;
      const qS = q9(qM);
      const qD = q9(q2.IntProperty)[3];
      const qt = q6(qH, "get_minItemsAmount");
      const qA = q6(qH, "get_maxItemsAmount");
      const qi = q6(qH, "set_amount");
      const qs = q6(qH, "get_amount");
      const qk = function (qO, qR) {
        const qI = qO[qs]();
        const qK = qO[qA]();
        if (qI < qK) {
          const qJ = qO[qt]();
          const qE = qR * qJ;
          qO[qi](qI > qJ ? qI + qE : qE);
        }
      };
      const qG = function (qO, qR) {
        const qI = qO[qs]();
        const qK = qO[qt]();
        if (qI > qK) {
          qO[qi](qI - qR * qK);
        }
      };
      const qF = function (qO, qR) {
        const qI = qO[qS[6]];
        const qK = qI[qD]();
        const qJ = qO[qS[10]]()[qD]();
        if (qK < qJ) {
          qI.set_value(qK > 1 ? qK + qR : qR);
        }
      };
      const qL = function (qO, qR) {
        const qI = qO[qS[6]];
        const qK = qI[qD]();
        if (qK > 1) {
          qI.set_value(qK - qR);
        }
      };
      qH.prototype.button_enter_count = async function () {
        const qO = this[qt]();
        const qR = q0.lib?.data?.quest?.clan?.[2000004]?.farmCondition?.amount ?? 180;
        const qI = pW ?? qR;
        const qK = await qp(qO * Math.max(0, qR - qI), this[qt](), this[qA]());
        if (qK) {
          this[qi](qK);
        }
      };
      qM.prototype.button_enter_count = async function () {
        const qO = this[qS[10]]()[qD]();
        const qR = await qp("", 1, qO);
        if (qR) {
          this[qS[6]].set_value(qR);
        }
      };
      qH.prototype.button_plus_10 = function () {
        qk(this, 10);
      };
      qH.prototype.button_plus_100 = function () {
        qk(this, 100);
      };
      qH.prototype.button_minus_10 = function () {
        qG(this, 10);
      };
      qH.prototype.button_minus_100 = function () {
        qG(this, 100);
      };
      qM.prototype.button_plus_10 = function () {
        qF(this, 10);
      };
      qM.prototype.button_plus_100 = function () {
        qF(this, 100);
      };
      qM.prototype.button_minus_10 = function () {
        qL(this, 10);
      };
      qM.prototype.button_minus_100 = function () {
        qL(this, 100);
      };
    }, function () {
      q2.VipRuleValueObject.prototype[q6(q2.VipRuleValueObject, "get_clanQuestsFastFarm", 1)] = function () {
        return 0;
      };
    }, function () {
      const qH = q2.WorldMapStoryDrommerHelper;
      const qM = q8(qH, 4);
      const qS = q8(qH, 7);
      const qD = qH[qM];
      const qt = qH[qS];
      qH[qM] = function (qA) {
        if (pd("interface.newMission")) {
          return true;
        } else {
          return qD.call(this, qA);
        }
      };
      qH[qS] = function (qA) {
        if (pd("interface.newMission")) {
          return true;
        } else {
          return qt.call(this, qA);
        }
      };
    }, function () {
      const qH = q2.MissionEnterPopupMediator;
      const qM = q9(qH);
      const qS = qH.prototype[qM[38]];
      const qD = qH.prototype[qM[44]];
      qH.prototype[qM[38]] = async function () {
        try {
          const qt = this[qM[25]]();
          this[qM[45]](pd("countControl.multiRaid") && qt > 3 ? await lo(qt > 10 ? qt - qt % 10 : qt, bN() ? 1000 : 100, true) : qt);
        } catch (qA) {
          console.error("missionEnter", qA);
          qS.call(this);
        }
      };
      qH.prototype[qM[44]] = function () {
        try {
          return (bC() ? pd("countControl.multiRaid") : pd("unlockRaid")) || qD.call(this);
        } catch (qt) {
          console.error("missionRaid", qt);
          return qD.call(this);
        }
      };
    }, function () {
      const qH = q9(q2.BattlePassQuestRendererClip);
      const qM = q2.BattlePassQuestRendererClip.prototype[qH[32]];
      const qS = q9(q2.BooleanProperty)[0];
      q2.BattlePassQuestRendererClip.prototype[qH[32]] = function () {
        if (pd("interface.seasonQuest")) {
          this[qH[28]].enabled[qS] = true;
        }
        qM.call(this);
      };
    }, function () {
      const qH = q9(q2.RPCCommandInvasionBossStart)[0];
      const qM = q2.RPCCommandInvasionBossStart.prototype[qH];
      q2.RPCCommandInvasionBossStart.prototype[qH] = function (qS) {
        if (!pd("invBossKill")) {
          qM.call(this, qS);
        }
      };
    }, function () {
      const qH = q2.ClanDominationCastlePopup;
      const qM = q9(qH);
      const qS = qH.prototype[qM[15]];
      const qD = q9(q2.ClipBasedPopup)[1];
      const qt = q9(q2.PopupMediator)[1];
      const qA = q9(q2.Player);
      const qi = q9(q2.PlayerClanDominationData)[26];
      const qs = q9(q2.PlayerInventory)[6];
      const qk = q9(q2.ClanCastleData);
      const qG = q9(q2.IntProperty)[0];
      const qF = q9(q2.ClanCastleDescription)[3];
      const qL = q9(q2.ClanCastleUpgradeAction)[3];
      const qO = q9(q2.ResourceListData)[4];
      const qR = q9(q2.InventoryItem)[5];
      qH.prototype[qM[15]] = async function (qI, qK) {
        if (qI == 0 && pd("countControl.castleUpgrade")) {
          const qJ = this[qD][qt];
          const qE = qJ[qA[59]][qi]();
          const qa = qJ[qA[24]][qs](qE[qk[2]][qF][0][qL]()[qO]()[qR]());
          const qo = Math.min(qE[qk[5]] - qE[qk[3]][qG], qa);
          qK = await lo(qo, qa);
        }
        qS.call(this, qI, qK);
      };
    }, function () {
      const qH = q2.ConsumableUseLootBoxThread;
      const qM = q9(qH);
      const qS = qH.prototype[qM[14]];
      qH.prototype[qM[14]] = async function () {
        try {
          const qD = this[qM[2]];
          if (this[qM[3]] < 0 && this[qM[8]] == qD && pd("countControl.inventoryLootbox")) {
            this[qM[8]] = await lo(qD, qD);
          }
          qS.call(this);
        } catch (qt) {
          console.error("useLootbox", qt);
          return qS.call(this);
        }
      };
    }];
    const qN = {
      id: 0,
      baseId: 0,
      name: "button_plus_10",
      dx: +44,
      dy: +4,
      height: 0.85,
      width: 0.85,
      change: {}
    };
    const qC = {
      id: 1,
      baseId: 0,
      name: "button_plus_100",
      dx: +81,
      dy: +8,
      height: 0.7,
      width: 0.7,
      change: {}
    };
    const qW = {
      id: 2,
      baseId: 1,
      name: "button_minus_10",
      dx: -37,
      dy: +4,
      height: 0.85,
      width: 0.85,
      change: {}
    };
    const qh = {
      id: 3,
      baseId: 1,
      name: "button_minus_100",
      dx: -67,
      dy: +8,
      height: 0.7,
      width: 0.7,
      change: {}
    };
    const qn = {
      dx: 0,
      dy: -40
    };
    const qg = {
      dialog_inventory_bulk_lootbox_use: qn
    };
    const qZ = {
      id: 4,
      baseId: 1,
      name: "button_enter_count",
      dx: +94,
      dy: -26,
      height: 0.55,
      width: 2,
      change: qg
    };
    const qf = {
      plus10: qN,
      plus100: qC,
      minus10: qW,
      minus100: qh,
      enterCount: qZ
    };
    const qj = {
      dialog_shop_item_buy: {
        count: 20,
        number: 4
      },
      dialog_shop_artifact_item_buy: {
        count: 21,
        number: 4
      },
      dialog_inventory_bulk_lootbox_use: {
        count: 17,
        number: 6
      }
    };
    const qV = qf;
    function qB() {
      for (let qH in dd.Game) {
        const qM = qH.split(".").at(-1);
        if (q2[qM]) {
          if (q2[qM] !== true) {
            q2[q2[qM].j.replaceAll(".", "_")] = q2[qM];
            q2[qM] = true;
          }
          q2[qH.replaceAll(".", "_")] = dd.Game[qH];
        } else {
          q2[qM] = dd.Game[qH];
        }
      }
      delete dd.Game;
      delete dd.GameModel;
      yU = yr[q7(yr, "get_instance")]();
      ym = q2.Game[q7(q2.Game, "get_instance")];
      yQ = qd(yU, q2.Player);
      for (let qS of qb) {
        try {
          qS();
        } catch (qD) {
          console.error(qD);
        }
      }
    }
    async function qw() {
      yr = dd.GameModel;
      const qH = yr.prototype.start;
      yr.prototype.start = function (qM, qS, qD) {
        q0.lib = qS.raw;
        ds = true;
        console.log("Game lib connected", q0.lib);
        try {
          if (pd("interface.islandFog")) {
            qS.raw.seasonAdventure.list[1].clientData.asset = "dialog_season_adventure_tiles";
            const qt = qS.raw.seasonAdventure.level;
            for (const qA in qt) {
              qt[qA].clientData.graphics.fogged = qt[qA].clientData.graphics.visible;
            }
          }
        } catch (qi) {
          console.error(qi);
        }
        qH.call(this, qM, qS, qD);
        if (!di) {
          qB();
        }
      };
    }
    function qX() {
      setTimeout(() => {
        if (dd.GameModel) {
          qw();
        } else {
          qX();
        }
      }, 100);
    }
    this.refreshGame = function () {
      pc = false;
      const qH = q2.NextDayUpdatedManager;
      new qH()[q9(qH)[5]]();
      dv.refreshInventory();
    };
    this.refreshInventory = async function () {
      try {
        const qH = q9(q2.Player)[24];
        yQ[qH] = new q2.PlayerInventory();
        yQ[qH].init(await dd.Send({
          calls: [{
            name: "inventoryGet",
            args: {},
            ident: "body"
          }]
        }).then(qD => qD.results[0].result.response));
      } catch (qD) {}
    };
    this.updateInventory = function (qH) {
      yQ[q9(q2.Player)[24]].init(qH);
    };
    this.updateShopSlot = function (qH, qM) {
      yQ[q9(q2.Player)[36]][q9(q2.PlayerShopData)[0]][q9(q2.IntMap)[0]][qH][q9(q2.PlayerShopDataEntry)[0]].find(qS => qS._id == qM)[q9(q2.ShopSlotValueObject)[13]](true);
    };
    this.removeMails = function (qH) {
      const qM = yQ[q9(q2.Player)[25]];
      const qS = q9(q2.PlayerMailData);
      qM[qS[14]](qH.map(qD => qM[qS[0]][q9(q2.IntMap)[0]][~~qD]).filter(qD => qD));
    };
    this.goNavigator = function (qH) {
      ym()[q6(q2.Game, "get_navigator")]()[q9(q2.GameNavigator)[20]](q2.MechanicStorage[qH], new q2.PopupStashEventParams());
    };
    this.goClanWar = function () {
      new q2.CrossClanWarSelectModeMediator(yQ).open();
    };
    this.changeIslandMap = (qH = 4) => {
      const qM = q2.PlayerSeasonAdventureData;
      const qS = {
        id: qH,
        seasonAdventure: {}
      };
      qS.seasonAdventure.id = qH;
      qS.seasonAdventure.startDate = 1701914400;
      qS.seasonAdventure.endDate = 1709690400;
      qS.seasonAdventure.closed = false;
      qd(yQ, qM)[q9(qM)[31]](qS);
      ym()[q6(q2.Game, "get_navigator")]()[q9(q2.GameNavigator)[17]](new q2.PopupStashEventParams());
    };
    this.translate = function (qH) {
      return q2.Translate.translate(qH);
    };
    qX();
  }
  const dv = new dl();
  const dY = [];
  String.prototype.sprintf = String.prototype.sprintf || function () {
    'use strict';

    var yr = this.toString();
    if (arguments.length) {
      var ym = typeof arguments[0];
      var yU = ym === "string" || ym === "number" ? Array.prototype.slice.call(arguments) : arguments[0];
      for (var yQ in yU) {
        yr = yr.replace(new RegExp("\\{" + yQ + "\\}", "gi"), yU[yQ]);
      }
    }
    return yr;
  };
  const dy = "<span style=\"color:green;\">Base</span>!";
  const dq = "<span style=\"color:green;\">VIP</span>!";
  const dc = "<a href=\"https://t.me/HW_Goodwin\" target=\"_blank\" title=\"{title}\"><svg style=\"margin:2px\" width=\"20\" height=\"20\" viewBox=\"0 0 1000 1000\" xmlns=\"http://www.w3.org/2000/svg\"><defs><linearGradient x1=\"50%\" y1=\"0%\" x2=\"50%\" y2=\"99.258%\" id=\"a\"><stop stop-color=\"#2AABEE\" offset=\"0%\"/><stop stop-color=\"#229ED9\" offset=\"100%\"/></linearGradient></defs><g fill=\"none\" fill-rule=\"evenodd\"><circle fill=\"url(#a)\" cx=\"500\" cy=\"500\" r=\"500\"/><path d=\"M226.328 494.722c145.76-63.505 242.957-105.372 291.59-125.6 138.855-57.755 167.707-67.787 186.513-68.118 4.137-.073 13.385.952 19.375 5.813 5.059 4.104 6.45 9.649 7.117 13.54.666 3.892 1.495 12.757.836 19.684-7.525 79.061-40.084 270.924-56.648 359.474-7.009 37.47-20.81 50.033-34.17 51.262-29.036 2.672-51.085-19.189-79.208-37.624-44.006-28.847-68.867-46.804-111.583-74.953-49.366-32.531-17.364-50.411 10.77-79.631C468.281 550.92 596.214 434.556 598.69 424c.31-1.32.597-6.241-2.326-8.84-2.924-2.598-7.239-1.71-10.353-1.003-4.413 1.002-74.714 47.468-210.902 139.4-19.955 13.702-38.03 20.378-54.223 20.028-17.853-.386-52.194-10.094-77.723-18.393-31.313-10.178-56.2-15.56-54.032-32.846 1.128-9.003 13.527-18.211 37.196-27.624z\" fill=\"#FFF\"/></g></svg></a>";
  const dN = "<a href=\"https://www.youtube.com/@GoodwinHW\" target=\"_blank\" title=\"{title}\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"28\" height=\"17\" viewBox=\"0 0 512 360\" style=\"shape-rendering:geometricPrecision;text-rendering:geometricPrecision;image-rendering:optimizeQuality;fill-rule:evenodd;clip-rule:evenodd\"><path style=\"opacity:.995\" fill=\"#fe0000\" d=\"M511.5 137.5v82c-1.184 28.807-4.684 57.473-10.5 86-6.739 21.073-20.573 35.24-41.5 42.5a394.99 394.99 0 0 1-67 8 6599.534 6599.534 0 0 1-91 3.5h-91a1806.728 1806.728 0 0 1-136-7.5c-32.06-1.754-53.56-17.588-64.5-47.5a205.19 205.19 0 0 1-6-33 1949.578 1949.578 0 0 1-4.5-52v-79a1678.939 1678.939 0 0 1 4.5-53c1.088-16.449 5.088-32.115 12-47C25.568 24.608 39.401 14.441 57.5 10a298.952 298.952 0 0 1 39-5 2128.092 2128.092 0 0 1 158-4.5 2104.291 2104.291 0 0 1 158 4.5 445.536 445.536 0 0 1 35 4c30.275 5.608 48.775 23.441 55.5 53.5 4.428 24.968 7.262 49.968 8.5 75z\"/><path style=\"opacity:1\" fill=\"#fffefe\" d=\"M204.5 103.5a6606.353 6606.353 0 0 1 133 76.5A26032.192 26032.192 0 0 0 205 256.5c-.5-50.999-.667-101.999-.5-153z\"/></svg></a>";
  const dC = "<a href=\"https://boosty.to/hw_goodwin\" target=\"_blank\" title=\"{title}\"><svg width=\"18\" height=\"24\" viewBox=\"155 20 10 250\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M87.5,163.9L120.2,51h50.1l-10.1,35c-0.1,0.2-0.2,0.4-0.3,0.6L133.3,179h24.8c-10.4,25.9-18.5,46.2-24.3,60.9 c-45.8-0.5-58.6-33.3-47.4-72.1 M133.9,240l60.4-86.9h-25.6l22.3-55.7c38.2,4,56.2,34.1,45.6,70.5C225.3,207,179.4,240,134.8,240 C134.5,240,134.2,240,133.9,240z\" fill=\"#F0672B\"></path></svg></a>";
  const dW = "<a href=\"https://vk.com/invite/YNPxKGX\" target=\"_blank\" title=\"{title}\"><svg style=\"margin:2px\" width=\"20\" height=\"20\" viewBox=\"0 0 101 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#a)\"><path d=\"M.5 48c0-22.627 0-33.941 7.03-40.97C14.558 0 25.872 0 48.5 0h4c22.627 0 33.941 0 40.97 7.03 7.03 7.029 7.03 18.343 7.03 40.97v4c0 22.627 0 33.941-7.03 40.97C86.442 100 75.128 100 52.5 100h-4c-22.627 0-33.941 0-40.97-7.03C.5 85.942.5 74.628.5 52v-4z\" fill=\"#07F\"/><path d=\"M53.709 72.042c-22.792 0-35.792-15.625-36.334-41.625h11.417C29.167 49.5 37.583 57.584 44.25 59.25V30.417H55v16.458c6.584-.708 13.5-8.208 15.833-16.458h10.75c-1.791 10.167-9.291 17.667-14.625 20.75 5.334 2.5 13.876 9.042 17.126 20.875H72.25C69.708 64.125 63.375 58 55 57.167v14.875H53.71z\" fill=\"#fff\"/></g><defs><clipPath id=\"a\"><path fill=\"#fff\" transform=\"translate(.5)\" d=\"M0 0h100v100H0z\"/></clipPath></defs></svg></a>";
  const dh = "<a href=\"https://discord.gg/JgSAmysfmV\" target=\"_blank\" title=\"{title}\"><svg style=\"margin: 2px;\" width=\"20\" height=\"20\" viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 0c141.385 0 256 114.615 256 256S397.385 512 256 512 0 397.385 0 256 114.615 0 256 0z\" fill=\"#5865F2\"/><path d=\"M360.932 160.621a250.49 250.49 0 00-62.384-19.182 174.005 174.005 0 00-7.966 16.243 232.677 232.677 0 00-34.618-2.602c-11.569 0-23.196.879-34.623 2.58-2.334-5.509-5.044-10.972-7.986-16.223a252.55 252.55 0 00-62.397 19.222c-39.483 58.408-50.183 115.357-44.833 171.497a251.546 251.546 0 0076.502 38.398c6.169-8.328 11.695-17.193 16.386-26.418a161.718 161.718 0 01-25.813-12.318c2.165-1.569 4.281-3.186 6.325-4.756 23.912 11.23 50.039 17.088 76.473 17.088 26.436 0 52.563-5.858 76.475-17.09 2.069 1.689 4.186 3.306 6.325 4.756a162.642 162.642 0 01-25.859 12.352 183.919 183.919 0 0016.386 26.396 250.495 250.495 0 0076.553-38.391l-.006.006c6.278-65.103-10.724-121.529-44.94-171.558zM205.779 297.63c-14.908 0-27.226-13.53-27.226-30.174 0-16.645 11.889-30.294 27.179-30.294 15.289 0 27.511 13.649 27.249 30.294-.261 16.644-12.007 30.174-27.202 30.174zm100.439 0c-14.933 0-27.202-13.53-27.202-30.174 0-16.645 11.889-30.294 27.202-30.294 15.313 0 27.44 13.649 27.178 30.294-.261 16.644-11.984 30.174-27.178 30.174z\" fill=\"#fff\"/></svg></a>";
  const dn = "<a title=\"Выбрать язык интерфейса\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"20\" viewBox=\"-40 0 197 123\" xml:space=\"preserve\"><image width=\"197\" height=\"123\" href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMUAAAB7CAMAAADzJrTHAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAUVBMVEUAAABHR0fj4+Pc3NxRUVH///9EREfc2+fU1N8AEzEARaEAQpsKGTMfU6YeUKAAGjUAVasAUqU5ERaxNkdDDwzcMCXVLiPSLyc6DQu7KiO1KCKf1ZdBAAAAAWJLR0QF+G/pxwAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAAd0SU1FB+gHGQswAHrhLlgAAADjSURBVHja7dnBGkJgGAVhSkREQnT/F9ruz7pN83nmvYIz65Nlkg4sP52jOuWporjEVViBYQWHFRxWcFjBYQWHFRxWcFjBYQWHFRxWcFjBYQWHFRxWcFjBcbSKsrpGVZWpom5uUTV1qmi7e1RdawWFFRxWcFjBYQWHFRxWcFjBYQWHFRxWcFjBYQWHFRxWcFjBYQXHrqIfHlENfaoYn3GNqWKal6jm6VuxvKJarMCwgsMKDis4rOCwgsMKDis4rOCwgsMKDis4rOCwgsMKDis4jlcx/3vMz3aP2Lq9o9rWTNKBfQAn+Y0clRsAQgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyNC0wNy0yNVQxMTo0ODowMCswMDowMFfxOO0AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjQtMDctMjVUMTE6NDg6MDArMDA6MDAmrIBRAAAAAElFTkSuQmCC\"/></svg></a>";
  const dZ = "<a title=\"Select interface language\"><svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"60px\" height=\"18px\" viewBox=\"-200 0 1000 600\" enable-background=\"new 0 0 1000 600\" xml:space=\"preserve\"><image id=\"image0\" width=\"1000\" height=\"600\" x=\"0\" y=\"0\" href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAJYCAMAAADGwDwXAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAARVBMVEX////y9PhribsAI4MAH4DxDCdtibzz9fnb4u47ZKewv9oAPpL29/p5k8EAJ4QaUJzH0uUAIYFSdrDq7/YAMImLosr9/f46SeEFAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAWJQAAFiUBSVIk8AAAAAd0SU1FB+gHGQslJQZQHAsAABdPSURBVHja7d3Zkt22EkRR2epry4MGW7b//1NvCGyppzMkSQBVhdzr1eoOEmBG7NCD/O5dgJ9+fv+Ay9Qz/F8Q9fmizzGt97/8GrG5IB9+iz7vrNQTZOg1/fYhenuT/f5H9JHnpJ4fQ6/oj9+jdzffnx8/RR97RurxMfR6Pn38M3p1Iej3C9TDY+jl2FX7E/r9DfXoGHoxjtX+hH5/TT05hl6Ka7U/od9fUs+NoVdiXO1P6Pfn1FNj6HV4V/sT+v0Z9dAYehVU+xP6/Qf1yBh6EVT7C/T7I/XAGHoJVPtr9PtGPS+GXgDVfgn9/o16Wgw9P6r9Cvqdoa+Dar+Ofmfoi6Dab7Pvd/WgGHpqVPtd5v2uHhNDT4xqV3j3u3pKDD0tql3l3O/qGTH0rKj2HXz7XT0hhp4T1b6Pbb+rB8TQM6La9zPtd/V4GHpCVPshlv2uHg5DT4dqP8qx39WzYejJUO1n+PW7ejIMPReq/SS3flfPhaFnQrWfZ9bv6rEw9Dyo9j6s+l09FIaeBtXejVG/q0fC0JOg2nvy6Xf1RBh6ClR7by79rp4HQ8+Aah/Ao9/V02Do8aj2MSz6XT0Mhh6Nah/HoN/Vo2Dowaj2oZbvd/UgGHooqn201ftdPQeGHohqn2HtfldPgaHHodonWbnf1TNg6FGo9nkW7nf1CBh6DKp9rmX7XT0Ahh6Cap9u0X5XX5+hB6DaI6zZ7+rbM/TpqPYoK/a7+u4MfTaqPdB6/a6+OUOfi2qPtVy/qy/O0Gei2uMt1u/qazP0iaj2FJbqd/WlGfo0VHsWK/W7+s4MfRKqPZN1+l19Y4Y+B9WezCr9rr4vQ5+Bas/np5/fR38WPaivy9DHe//Lr9FfNS5Yot/Vl2Xow1HtaS3Q7+qrMvTBqPbM6v/9u/qmDH0o/q49u+r9rr4nQx+Jai+gdr+rb8nQx6Haayjd7+pLMvRRqPY6Cve7+ooMfRCqvZSy/a6+IEMfgmqvpmq/q+/H0Aeg2iuq2e/q2zH0/qj2oir2u/puDL03qr2ugv2uvhpD74tqr61cv6svxtC7otrLK9bv6msx9I6o9hXU6nf1rRh6N1T7Kir1u/pODL0Xqn0hdfpdfSOG3gfVvpYy//6M+kIMvQejf0Pm85foJ5ikSL+rr8PQO7Cp9i+f3z389ffX6MeYpES/qy/D0E+zqfavf//18O1C/vn3v+hHmaPC37+r78LQT7L5u/b//v3n23fVXpp+T0N9E4Z+jlG1b9/V9tr0exbqezD0M6yqffuuvr86/Z6D+hoM/Tizat++q6fXp98zUF+CoR/mVu3bd/XsAOj3BNRXYOgH+VX79l29OAT6PZz6Bgz9EMdq376rVwdBvwdTn5+hH2FZ7dt39foo6PdY6tMz9P1Mq337rt4eB/0eSX14hr6XbbVv39WlI6Hf46iPztB38q327bu6eCj0exj1wRn6Ls7Vvn1XVw6Gfg+iPjdD38G72rfv6urh0O8h1Kdm6Drzat++q+vHQ79HUJ+Zoavsq337rm4dEf0+n/rIDF1DtT9+V7ePiX6fTX1ghi6h2r9/V3cOin6fTH1chi6g2p++q7uHRb9PpT4tQ7+Lan/+XQkHRr9PpD4rQ7+Han/xXSlHRr/Poz4pQ7+Nan/1XWnHRr/Poj4oQ7+Fan/zXalHR7/PoT4mQ7+Ban/7XcmHR79PoT4kQ7+Kar/0Xe04QPp9AvUZGfoVVPvl72rXIdLvw6lPyNAvo9qvfFf7jpF+H019PoZ+CdV+9bvae5T0+1jq4zH0t6j2G9/V/uOk30dSH46hv0G13/quDhwo/T6Q+mgM/RWq/fZ3dehQ6fdh1Cdj6C9Q7fe+q4MHS78Poj4XQ3+Oar/7XR09Wvp9DPWpGPoTql34ro4fL/0+gvpQDP07ql36rs4cMf3en/pIDP0R1a59V6cOmX7vTn0ght5Q7ep3dfKg6ffO1Odh6A9U+57v6vRh0+9dqU/D0Kn2Xd/V+eOm33tSn4WhU+27vqseR06/96M+ivvQqfad31WfY6ffe1EfxHzoVPve76rTwdPvnaiPYT10qn3/d9Xt8On3PhciMh461X7ku+p4AfR7jwsR+Q6daj/0XfW8Avq9w4WIXIdOtR/8rvpeA/1++kJEnkOn2g9/V72vgn4/eSEiy6FT7ce/q+6XQb+fuxCR4dCp9jPf1YALod/PXIjIbuhU+7nvasDvpN/PXIjIbehU+8nvashvpd+PX4jIa+hU++nvasyvpd8PX4jIaehUe4fvatQvpt8PXojIaOhUe4/vatyvpt8PXYjIZuhUe5/vauDvpt+PXIjIZOhUe6/vauhvp9/3X4jIY+hUey/D/4EA+n3nhYgchk619zPhn/yh33ddiGj9oVPtPU35R/zo9x0XIlp+6FR7V3P+WV76Xb8Q0eJDp9o7m/UP7dPv6oWIlh461d7dvP91Dv2uXYho5aFT7f1N/J/h0e/ShYjWHTrVPsLU/70t/S5ciGjVoVPtY0z+H9bT73cvRLTo0Kn2QSYPnX6/eyGiJYdOtQ8ze+j0+70LES04dKp9oPlDp99vX4hovaFT7SNFDJ1+v3UhotWGTrWPFTJ0+v3GhYjWGjrVPlrQ0On3qxciWmroVPtwYUOn369ciGihoVPtE8QNnX6/fCGiZYZOtU8ROXT6/dKFiFYZOtU+R+zQ6fe3FyJaY+hU+yzBQ6ff31yIaIWhU+3zhA+dfn91IaIFhk61T5Rg6PT7iwsRlR861T5VhqHT788vRFR86FT7ZDmGTr8/XYio9tCp9tmyDJ1+/34hospDp9rnSzN0+v3xQkR1h061R0g0dPq9XYio7NCp9hCphk6/Lz90qj1IrqHT72sPnWoPk23o9v2u/nTFoVPtcfIN3bzf1Z+tN3SqPVLCoXv3u/qj1YZOtcdKOXTnfld/sNjQqfZgSYfu2+/qj5UaOtUeLuvQbftd/alCQ6faE8g7dNN+V3+mztCp9gwyD92y39WfqDJ0qj2H1EN37Hf1B2oMnWrPIvnQ/fpd/eMlhk61p5F+6G79rv7hAkOn2hPJP3Szflf/bPqhU+2pVBi6Vb+rfzL70Kn2XGoM3ajfVdmHbqJCtTdFhm7U7yKGnkCNam/KDN2o3yUMPV6Ram8KDZ1+f46hRytT7U2lodPvzzD0WIWqvak1dPr9B4YeqlK1N9WGTr8/YuiBalV7U27o9PuGoYepVu1NwaHT798w9Cjlqr0pOXT6naFHKVjtTc2h0+8MPUTJam+qDt2+3xl6gJrV3tQdunm/M/TpqlZ7U3jo3v3O0CerW+1N6aE79ztDn6twtTfFh+7b7wx9ptLV3lQfum2/M/R5ild7U3/opv3O0KepXu3NCkO37HeGPkn9am+WGLpjvzP0KVao9maRofv1O0OfYYlqb5YZulu/M/TxFqn2Zp2hm/U7Qx9tmWpvVhq6Vb8z9MHWqfZmraEb9TtDH2qlam8WG7pPvzP0gdaq9ma5obv0O0MfZ7FqbxYcuke/M/RRlqv2ZsWhW/Q7Qx9jwWpv1hy6Qb8z9CFWrPYm+mBxEEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdOwS9cEAmIehAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBhg6YIChAwYYOmCAoQMGGDpggKEDBt6hJj4YwABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQwcMMHTAAEMHDDB0wABDBwwwdMAAQ8cuD2v67UP0wQ7G0If48Fv0lzvImkP/4/foD2Y4hj7I739Ef71DrDj0Tx//jP5axmPoo/z58VP0FzzAgkNfvtobhj7Oiv2+3NANqr1h6COt1++LDd2i2huGPtRy/b7W0D2qvWHogy3W7ysN3aXaG4Y+3FL9vs7Qfaq9YejjrdTvywzdqNobhj7DOv2+yNCtqr1h6HOs0u9LDN2s2huGPski/b7C0N2qvWHo0yzR7/WH7lftDUOfaIF+rz50x2pvGPpM9fu9+NAtq71h6HNV7/fSQzet9oahz1a73wsP3bbaG4Y+Xel+rzt032pvGHqAwv1edejO1d4w9BBl+73m0L2rvWHoMar2e8mhm1d7w9Cj1Oz3gkO3r/aGocep2O/lhk61bxh6oIL9Xm3oVPsjhh6qXL/XGjrV/gNDD1as3ysNnWp/hqFHq9XvhYZOtT/H0ONV6vcyQ6faX2LoGdTp9yJDt6n2/9Q/mH3o8ovUVqbfawzdptq/fFb/ZPahf/4SfZaTFOn3CkO3qfavf//1oP7Z7EN/+Ovvr9HnOUmJfs8/dJ9q//efbxciSj/0h4d//qXf00g/dKNq3y5EVGDoDw/0exrJh25V7duFiEoMnX5PI/XQzap9uxBRjaHT71lkHrpbtW8XIqoydPo9h7xD96v27UJEdYZOv2eQdeiO1b5diKjQ0On3BJIO3bLatwsRlRo6/R4u5dBNq327EFGxodPvwRIO3bbatwsRVRs6/R4r39B9q327EFG9odPvkbIN3bnatwsRVRw6/R4n19C9q327EFHJodPvYVIN3bzatwsRFR06/R4k0dDtq327EFHZodPvIdIMnWp/vBBR3aHT7xGyDJ1q/34hospDp9/nyzF0qv3pQkS1h06/z5Zh6FT78wsRFR86/T5ZgqFT7S8uRFR+6PT7VOFDp9pfXYhogaHT7xMFD51qf3MhohWGTr/PEzt0qv3thYjWGDr9Pkvk0Kn2SxciWmXo9PsccUOn2i9fiGiZodPvU4QNnWq/ciGihYZOv08QNHSq/eqFiJYaOv0+XMjQqfYbFyJaa+j0+2gRQ6fab12IaLWh0+9jzR861X77QkTrDZ1+H2n20Kn2exciWnDo9PtAk4dOtd+9ENGSQ6ffh5k6dKpduBDRokOn3weZOHSqXboQ0apDp9/HmDd0ql27ENG6Q6ffR5g1dKpdvRDRykOn3/ubM3SqXb8Q0dJDp9+7mzJ0qn3HhYgWHzr93tmEoVPtuy5EtPzQ6feuhg+dat95IaL1h06/9zR66FT73gsROQydfu9n7NCp9v0XIvIYOv3ey8ihU+1HLkRkMnT6vdd3Ne5XU+2HLkRkM3T6vc93NeoXU+0HL0RkNHT6vcd3NebXUu2HL0TkNHT6vcN3NeS3Uu3HL0TkNXT6/fR3NeB3Uu1nLkTkNnT6/eR31f03Uu3nLkRkN3T6/dx31fsXUu0nL0RkOHT6/cx31ffXUe2nL0RkOXT6/fh31fOXUe0dLkTkOXT6/fB31fF3Ue09LkTkOnT6/eB31e03Ue19LkTkO3T6/dB31en3UO29LkRkPHT6/ch31efXUO29qA9iPXT6ff931eOXUO39qI9iPnT6fe93df5XUO09qQ/jPnT6fed3dfo3UO1dqU/D0On3Xd/VyZ+n2jtTn4ehP9Dve76rUz9NtXenPhFDb+h39bs688NUe3/qIzH0R/S79l0d/1GqfQT1oRj6d/S79F0d/UGqfQz1sRj6E/pd+K4O/hzVPoj6XAz9Ofr97nd16Keo9mHUJ2PoL9Dv976rAz9DtQ+kPhtDf4V+v/1d7f8Rqn0k9eEY+hv0+63vau8PUO1jqY/H0N+i3298V/v+ONU+mvqADP0S+v3qd7XrT1Ptw6lPyNAvo9+vfFc7/izVPoH6jAz9Cvr98ncl/0mqfQr1KRn6VfT7pe9K/YNU+xzqYzL0G+j3t9+V9seo9lnUB2Xot9Dvb74r5Q9R7fOoj8rQb6PfX31Xwp+h2idSn5Wh30O/v/iu7v4Jqn0q9WkZ+l30+/Pv6s5/p9onU5+XoQvo96fv6vZ/ptpnUx+YoUvo9+/f1a3/SLXPpz4yQ9fQ74/f1fX/RLVHUB+aoavo9/ZdXf0vVHsI9akZuo5+vz50qj2I+twMfQf6/crQqfYw6pMz9F3s+/3ihVDtcdRHZ+g7mff7hQuh2iOpD8/Q9/Lu9zcXQrXHUh+foe/n3O+vL4RqD6Y+P0M/wrffX14I1R5OfQOGfohtvz+/EKo9AfUdGPpBpv3+7EKo9gzUl2Doh1n2+48LodpzUF+DoR/n2O+PF0K1Z6G+CEM/w6/ftwuh2tNQ34Shn+PW798uhGpPRH0Xhn6SWb+/o9pzUd+GoZ9m1e/vqPZc1Ndh6B0Y9Xv0E8zy08/vo78qjfpCDL2H97/8Gv1loqMa1d6or8TQ+7DpdwdFqr1R34mh92LT76ur8HftT9S3Yujd+Pz9+8oKVXujvhdD74h+L69StTfqizH0ruj30mpVe6O+GkPvi36vq1q1N+rLMfTe6PeiylV7o74dQ++Pfi+oYLU36vsx9AHo92pKVnujviFDH4J+L6VmtTfqKzL0Qej3MqpWe6O+JEMfhX6voW61N+prMvRx6PcCCld7o74nQx+Jfk+udLU36psy9KHo98yKV3ujvitDH4x+T6t6tTfqyzL04ej3lMr8GzK3qa/L0Mfj35/JZ4Vqb9QXZugz0O/JLFHtjfrGDH0O+j2R+n/X/kR9Z4Y+CX//nsUy1d6ob83Qp6HfU1in2hv1tRn6RPR7uJWqvVFfnKHPRL/HWqvaG/XVGfpc9Hugxaq9Ud+doc9GvwdZrtob9e0Z+nT0e4QFq71R35+hB6Dfp1ux2hv1ABh6CPp9qjWrvVGPgKHHoN/nWbXaG/UQGHoU+n2SZau9UU+Boceh3ydYuNob9RwYeiD6fbSlq71RT4Khh6Lfh1q72hv1KBh6MPp9mNWrvVEPg6FHo9/HWL/aG/U4GHo8+n0Ag2pv1PNg6BnQ751ZVHujnghDT4F+78mk2hv1TBh6EvR7Ny7V3qiHwtDToN+78Kn2Rj0Whp4H/X6eU7U36sEw9Ezo95Osqr1RT4ah50K/n2BW7Y16Ngw9Gfr9KLtqb9TTYejp0O+H+FV7ox4PQ0+Ift/Nsdob9YAYekb0+z6e1d6oR8TQc6LfdzCt9kY9I4aeFf0usq32Rj0lhp4W/a4wrvZGPSeGnhj9fpdztTfqQTH01Oj3m7yrvVGPiqHnRr9f517tjXpYDD07+v0K+2pv1NNi6PnR7xdQ7Rv1vBh6AfT7a1T7d+qJMfQS6PcXqPYf1CNj6EXQ7z9Q7c+oh8bQq6DfN1T7C+qxMfQ66Pd3VPtr6rkx9Ers+51qf009OYZeine/U+1vqWfH0Isx7neq/QL18Bh6Oab9TrVfpB4fQ6/Hsd+p9ivUA2ToFdn1O9V+jXqCDL0mq36n2q9Tz5ChFxXU7/8HWHZ4AsbclhwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjQtMDctMjVUMTE6Mzc6MzcrMDA6MDDE6U+OAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDI0LTA3LTI1VDExOjM3OjM3KzAwOjAwtbT3MgAAAABJRU5ErkJggg==\" /></svg></a>";
  const dA = {
    EN: {
      PROGRESS_LORD_DEF: "Defence statistics on {tier} stage vs {countRival} enemy with {countBattle} battles: \n\n#   Power   ",
      PROGRESS_LORD_ATTACK: "Progress of the battles with Lords:\nElement   Points   Battles \n",
      LANGUAGE_BUTTON: dZ,
      BOTTOM_URLS: dc.sprintf({
        title: "Telegram"
      }) + dN.sprintf({
        title: "YouTube"
      }) + dC.sprintf({
        title: "Boosty"
      }) + dh.sprintf({
        title: "Discord"
      }),
      PLAN_DESC_FREE: "Unlocks all the Free functions of the script:\n\n- Daily automatic collection of gifts from group and streams\n- Auto-completing all quests and customizing them\n- Cancel battles in adventures, with minions and other modes (except GW, CoW, Asgard, Spesial events)\n- Fight pre-calculation in Guild War, Clash of Worlds, Asgard and Guild Training combats\n- Acceleration and deceleration of fights without an active Valkyrie\n- Auto-dungeon passing (~200 titanite per day + 150 from Valkirie)\n- Convenient automation of resource collection\n- Auto-adventure\n-⚡Ready-made ways to complete all the adventures and save up to 3 different your own ways.\n-⚡Additional support for different gaming events ",
      PLAN_DESC_BASE: "Unlocks Base functions of the script:\n\n-⚡Auto-dungeon passing\n-⚡Test battles by replays in all modes: Asgard, GW, CoW, Arenas, Adventures or events\n-⚡Test battles for clean up in CoW or GW, vs current health and charged enemy\n-⚡Automatic change of teams in the Grand-Arena\n-⚡Auto Killing Lords in ToE for max titans\n\nFollow the links below for details",
      PLAN_DESC_VIP: "Unlocks VIP functions of the script:\n\n-⚡Auto-dungeon passing\n-⚡Advanced support for different gaming events\n-⚡Tests for defence team in ToE for all stages with your titans before you make attack\n\nFollow the links below for details",
      ACTIVE_PLAN: "Active plans:",
      DETAILS_ALL: "Main setups",
      DETAILS_BATTLE: "Fight setups",
      DETAILS_EVENT: "Event setups",
      DETAILS_VALUE: "Input settings",
      GRAND_ARENA_DEF: "GA defense",
      GRAND_ARENA_DEF_TITLE: "Auto-change GA defense teams",
      TEST_BATTLE: "Test by replay",
      TEST_BATTLE_TITLE: "Training battle in chat, guild battles or combat training vs defense team from last replay",
      FINISH_BATTLE: "Test Clean up",
      FINISH_BATTLE_TITLE: "Clean up in chat, guild battles or combat training vs defense team from last replay with current health and energy",
      BOSS_ATTACK: "Boss Attack",
      BOSS_ATTACK_TITLE: "Attack any boss in the event to find out the chances of winning without wasting attempts or automatically attacking him with your team",
      SKIP_FIGHTS: "Skip battle",
      SKIP_FIGHTS_TITLE: "Skip battle in Outland and the arena of the titans, auto-pass in the tower and campaign",
      STAY_ONLINE: "Stay online",
      STAY_ONLINE_TITLE: "Auto-reloads the game and restarts the last active function in case of unknown errors\n(game session expired 6 hours or the game was launched on another window/browser/device, etc.)",
      AUTO_EXPEDITION: "Auto-expedition",
      AUTO_EXPEDITION_TITLE: "Auto-sending expeditions",
      BATTLE_RECALCULATION: "Recalculation",
      BATTLE_RECALCULATION_TITLE: "Preliminary calculation of the battle",
      HACK_BATTLE: "Improved battle",
      HACK_BATTLE_TITLE: "At the end of the battle, it makes it possible to activate the search for the best moment to activate auto in battle",
      AUTO_BATTLE: "Auto-repeat",
      AUTO_BATTLE_TITLE: "Auto-repeat battles",
      DISABLE_DONAT: "Disable offers",
      DISABLE_DONAT_TITLE: "Removes all donation offers",
      BUY_IN_STORE: "Auto-store",
      BUY_IN_STORE_TITLE: "Buy items for gold in the Town Shop and in the Pet Soul Stone Shop",
      COMBAT_SPEED: "Combat Speed Multiplier",
      NUMBER_OF_TEST: "Number of test fights",
      INTERFACE_SCALE: "Adjust the scale in %",
      FPS_INPUT: "Set FPS",
      TO_DO_EVERYTHING: "Do All",
      TO_DO_EVERYTHING_TITLE: "Perform multiple actions of your choice",
      DUNGEON: "Dungeon",
      DUNGEON_TITLE: "Go through the dungeon",
      ARCHDEMON: "Archdemon",
      ARCHDEMON_TITLE: "Hitting kills and collecting rewards",
      ADVENTURE: "Adventure",
      ADVENTURE_TITLE: "Passes the adventure along the specified route",
      RAID_MINIONS: "Minions",
      RAID_MINIONS_TITLE: "Automatically attacks Minions in Asgard with the last 3 commands used there",
      STORM: "Great Storm",
      STORM_TITLE: "Passes the Great Storm along the specified route",
      AUTO_RAID_ADVENTURE: "Raid adventure",
      AUTO_RAID_ADVENTURE_TITLE: "Raid adventure set number of times",
      CHANGE_MAP: "Change island",
      CHANGE_MAP_TITLE: "Transition to a different map of the island. It is important that the previous maps of the island were previously opened in the game.",
      TOE_DEF: "ToE Defense",
      TOE_DEF_TITLE: "Test defense in the tournament of the Elements",
      LORD_ATTACK: "Raid Lords",
      LORD_ATTACK_TITLE: "Performs automatic attack on elemental lords in the best known ways",
      OPEN_SEER: "Open Astral seer",
      OPEN_SEER_TITLE: "User specified number of astral seers's openings",
      SWAP_GA_DEF: "Swap defense",
      SWAP_GA_DEF_TITLE: "Random swap of the defense in grand arena",
      ARCHDEMON_SOULS: "Furnace of souls",
      ARCHDEMON_SOULS_TITLE: "Performs attacks and collects prizes in the furnace of souls",
      AUTO_BRAWL: "Auto Brawl",
      AUTO_BRAWL_TITLE: "Performs autobattle in brawl, using the best known teams",
      INVASION_RATING: "Boss Rating",
      INVASION_RATING_TITLE: "Shows best teams to beat all bosses in the current event!",
      EPIC_BRAWL_DEF_RATING: "CB defense rating",
      EPIC_BRAWL_DEF_RATING_TITLE: "Shows best teams for defense in the Cosmic Battle!",
      EPIC_BRAWL_ATT_RATING: "CB attack rating",
      EPIC_BRAWL_ATT_RATING_TITLE: "Helps choosing best team to attack the current enemy!",
      SWAP_HONEY: "Exchange honey",
      SWAP_HONEY_TITLE: "Exchanges all honey for event rewards",
      SWAP_CANDY: "Exchange candy",
      SWAP_CANDY_TITLE: "Exchanges all candies for event rewards",
      BUY_SOULS: "Buy souls",
      BUY_SOULS_TITLE: "Buy hero souls from all available shops",
      ARTIFACTS_UPGRADE: "Art Upgrade",
      ARTIFACTS_UPGRADE_TITLE: "Upgrades the specified amount of the cheapest hero artifacts",
      SKINS_UPGRADE: "Skins Upgrade",
      SKINS_UPGRADE_TITLE: "Upgrades the specified amount of the cheapest hero skins",
      OPEN_CACHE: "Open cache",
      OPEN_CACHE_TITLE: "Uses keys to open cache cells in the current event.\nThe cache is updated in an optimal way to get as many selected prizes as possible",
      RUN_ARCHDEMON: "Pass Archdemon?",
      RUN_MINIONS: "Pass minions?",
      SELECT_ISLAND: "Choose an island map:",
      MAP_NUM: "Map {num}",
      BTN_YES: "Yes",
      BTN_NO: "No",
      BTN_OK: "Ok",
      BTN_RUN: "Run",
      BTN_OPEN: "Open",
      BTN_CANCEL: "Cancel",
      MSG_HAVE_BEEN_DEFEATED: "You have been defeated!",
      BTN_AUTO: "Auto-attack",
      MSG_YOU_APPLIED: "You applied {damage} damage",
      MSG_REPEAT_MISSION: "Repeat the mission?",
      BTN_REPEAT: "Repeat",
      MSG_SPECIFY_QUANT: "Set Quantity:",
      QUESTION_COPY: "Question copied to clipboard",
      ANSWER_KNOWN: "The answer is known",
      ANSWER_NOT_KNOWN: "ATTENTION! The answer is not known!",
      VICTORY: "<span style=\"color:green;\">VICTORY</span>",
      DEFEAT: "<span style=\"color:red;\">DEFEAT</span>",
      OPEN_DOLLS: "Open {newCount} nesting dolls recursively?",
      BTN_YES_I_AGREE: "Yes, I understand the risks!",
      BTN_NO_I_AM_AGAINST: "No, I refuse it!",
      EXPEDITIONS_SENT: "Expeditions:<br>Collected: {countGet}<br>Sent: {countSend}",
      EXPEDITIONS_NOTHING: "Nothing to collect/send",
      DUNGEON_TITANIT: ": titanite {dungeonActivity}/{maxDungeonActivity}",
      DUNGEON_END: "Dungeon completed",
      DUNGEON_STOP: "Dungeon stopped",
      DUNGEON_LOG_HARVEST: "Titanite collected: ",
      DUNGEON_LOG_SPEED: "Collection speed: {speed} titanite/hour",
      DUNGEON_LOG_TIME: "Excavation time: {hours} h. {minutes} min. {seconds} sec.",
      TOWER_FLOOR: "Tower: Floor ",
      TOE_LEVEL: "ToE: Level ",
      EVENT: "Event",
      NOT_AVAILABLE: "not available",
      NO_HEROES: "No heroes",
      NOTHING_TO_COLLECT: "Nothing to collect",
      NO_GIFTS: "No gifts to collect",
      COLLECT_GIFTS: "Collected {count} gifts",
      COLLECT_REWARDS: "Collected {count} rewards",
      SOMETHING_WENT_WRONG: "Something went wrong",
      REMAINING_ATTEMPTS: "Remaining attempts",
      BATTLES_CANCELED: "Battles canceled",
      MINION_RAID: "Minion Raid",
      COMPLETED: "completed",
      STOPPED: "Stopped",
      REPETITIONS: "Repetitions",
      MISSIONS_PASSED: "Missions passed",
      STOP: "stop",
      NOT_THIS_TIME: "Not this time",
      TOTAL_OPEN: "Total open",
      SUCCESS: "Success",
      RECEIVED: "Received",
      LETTERS: "letters",
      PORTALS: "portals",
      ACTIVITY_RECEIVED: "Activity received",
      CHESTS_NOT_AVAILABLE: "Chests not available",
      OUTLAND_CHESTS_RECEIVED: "Outland chests received",
      QUEST_10001: "Upgrade the skills of heroes 3 times",
      QUEST_10003: "Complete 3 heroic missions (Aurora chapter 9)",
      QUEST_10006: "Use the exchange of emeralds 1 time",
      QUEST_10007: "Perform 1 summon in the Soul Atrium",
      QUEST_10016: "Send gifts to guildmates",
      QUEST_10018: "Use an experience potion",
      QUEST_10023: "Upgrade Gift of the Elements by 2 levels",
      QUEST_10024: "Level up any hero artifact once",
      QUEST_10028: "Level up any titan artifact once",
      QUEST_10029: "Open the Orb of Titan Artifacts",
      QUEST_10030: "Upgrade any Skin of any hero 1 time",
      QUEST_10044: "Use Summon Pets 1 time",
      QUEST_10047: "Get 150 Guild Activity Points",
      NOTHING_TO_DO: "Nothing to do",
      COMPLETED_QUESTS: "Completed quests",
      NOT_QUEST_COMPLETED: "Not a single quest completed",
      ERRORS_OCCURRES: "Errors occurred while executing",
      COPY_ERROR: "Copy error information to clipboard",
      ALL_TASK_COMPLETED: "All tasks completed",
      UNKNOWN: "unknown",
      BTN_CANCELED: "Canceled",
      INCORRECT_WAY: "Incorrect path in adventure: {from} -> {to}",
      MUST_TWO_POINTS: "The path must contain at least 2 points.",
      MUST_ONLY_NUMBERS: "The path must contain only numbers and commas or hyphens",
      NOT_ON_AN_ADVENTURE: "You are not on an adventure",
      YOU_IN_NOT_ON_THE_WAY: "Your location is not on the way",
      ATTEMPTS_NOT_ENOUGH: "Your attempts are not enough to complete the path, continue?",
      YES_CONTINUE: "Yes, continue!",
      NOT_ENOUGH_AP: "Not enough action points",
      ATTEMPTS_ARE_OVER: "The attempts are over",
      MOVES: "Moves",
      BUFF_GET_ERROR: "Buff getting error",
      BATTLE_END_ERROR: "Battle end error",
      FAILED_TO_WIN: "Failed to win",
      ERROR_OF_THE_BATTLE_COPY: "An error occurred during the passage of the battle<br>Copy the error to the clipboard?",
      ERROR_DURING_THE_BATTLE: "Error during the battle",
      NO_CHANCE_WIN: "No chance of winning this fight: 0/",
      LOST_HEROES: "You have won, but you have lost one or several heroes",
      VICTORY_IMPOSSIBLE: "Is victory impossible!",
      LOSSES: "Losses",
      WINS: "Wins",
      FIGHTS: "Fights",
      STAGE: "Stage",
      LIVES: "Lives",
      RAID: "Raid",
      DONT_HAVE_LIVES: "You don't have lives",
      DAILY_BONUS: "Daily bonus",
      NO_MORE_ACTIVITY: "No more activity for items today",
      EXCHANGE_ITEMS: "Select the color of the items to be exchanged\nand set the required number\nof activity points (max {maxActive})",
      GET_ACTIVITY: "Get Activity",
      NOT_ENOUGH_ITEMS: "Not enough items",
      FRAGMENT: "fragment ",
      ITEM_SPENT: "Items spent",
      NO_PURCHASABLE_HERO_SOULS: "No purchasable Hero Souls",
      PURCHASED_HERO_SOULS: "Purchased {countHeroSouls} Hero Souls",
      RAID_NOT_AVAILABLE: "The raid is not available or there are no spheres",
      RAID_ADVENTURE: "Raid {adventureId} adventure!",
      ADVENTURE_COMPLETED: "Adventure {adventureId} completed {times} times",
      BTN_AUTO_F5: "Restart on auto",
      NOTHING_BUY: "Nothing to buy",
      LOTS_BOUGHT: "{countBuy} lots bought",
      TIMER: "Timer:",
      ERROR_MSG: "Error: {name}<br>{description}",
      MAP: "Map: ",
      PLAYER_POS: "Player positions:",
      HINT: "<br>Hint: ",
      PICTURE: "<br>Picture: ",
      ANSWER: "<br>Answer: ",
      ELEMENT_TOURNAMENT_REWARD: "Unclaimed bonus for Elemental Tournament",
      EMERALDS: "emeralds",
      PASS_THE_TOWER: "Pass the Tower",
      ASSEMBLE_OUTLAND: "Collect {count} chests in the Outland",
      CHECK_EXPEDITIONS: "Check out the Expeditions",
      CHECK_SEER: "Check the Astral Seer",
      COLLECT_MAIL: "Collect mail",
      COMPLETE_DAILY_QUESTS: "Run daily quests",
      COLLECT_DAILY_REWARDS: "Collect daily rewards",
      COLLECT_QUEST_REWARDS: "Collect rewards for quests",
      COMPLETE_TOE: "Run ToE",
      COMPLETE_DUNGEON: "Farm Dungeon",
      MAKE_A_SYNC: "Synchronization",
      RELOAD_GAME: "Reload Game",
      ENTER_THE_PATH: "Enter the adventure path separated by commas\nOr select one of the ready-made paths",
      ALL_WAY_SAVED: "All paths for the current adventure are saved",
      NOT_ENOUGH_EMERALDS: "Not enough emeralds, need {price}, You got {currentStarMoney}",
      AND: " and ",
      HP: "hp",
      ENRG: "en",
      HACK_BATTLE_WARNING: "<span style=\"color:red;\">Warning! A replay of an improved Battle may not match the actual result of that Battle.\nWe do not accept any responsibility for the consequences of using this feature!</span>\nEnable Battle improvement?",
      FOR_USE_ACCESS: "To use \"{function}\"\nactivate access: ",
      AUTO_RELOAD: "Automatic restart",
      BEST_TEAM_RATING: "Best team Rating",
      CHECK_DEF_TOE: "Test Defence in the ToE",
      FOR_DEF: " for Defence",
      FOR_ATT: " for Attack",
      ORDER_GA_CHANGE: "The order of defence teams on the GA has been changed",
      RIVAL_COSMIC_BATTLE: "The opponent of the Cosmic Battle:",
      PRECALC_STOPPED: "The pre-calculation has been stopped 😢",
      THANKS_FOR_WAIT: "Thanks for waiting!\nStatistics have been saved successfully 😊",
      PLEASE_WAIT_CALC: "Pre-calculation is being performed for the statistics of the Cosmic Battle\nPlease, wait until all calculations are completed\n\nRemain <span style=\"color:green;\">{count} battles</span> in log\n\nIf the wait is too long, click here to stop!",
      SCRIPT_UPDATE: "New version: {version}\n\n<a href=\"https://hw-script.goodwin.best/updates/HW-Goodwin.user.js\" target=\"_blank\">Update script</a>\n\n<a href=\"https://discord.com/channels/1235558836857864192/1235558837210054718\" target=\"_blank\">Find out about changes</a>",
      DO_YOU_WANT: "Do you really want to do this?",
      YES_RUN: "Yes, start",
      END_BATTLE: "End Battle",
      END_BATTLE_TITLE: "Save the result of the current battle without changing anything",
      BTN_AUTO_F5_TITLE: "Restarts the battle to get the auto-battle result",
      BTN_CANCEL_TITLE: "Cancels the result of the current battle",
      BTN_AUTO_TITLE: "Start an auto-attack of the current battle until victory or until the specified % of remaining health",
      BTN_IMPROVED: "Improve results",
      BTN_IMPROVED_TITLE: "⚠️⚠️⚠️WARNING!⚠️⚠️⚠️\nImproved score replay may not match your damage\nWe do not bear any responsibility for possible consequences!",
      LOST_TIME: "Time left: ",
      MANUAL_RESULT: "Manual battle result: ",
      USE_CARD_LOG: "1 prediction card used. Left {countCard} cards",
      NEED_WAIT_LOG: "Battle lasted: {time} sec, need to wait: {timer} sec",
      WAIT_DELAY_LOG: "Need to wait: {delay} sec",
      SAVE_BATTLE: "Save Battle",
      SAVE_BATTLE_TITLE: "To complete daily quests, it may be useful to save the battle,\nbut you should wait timer to end",
      RETREAT: "Retreat",
      TRAINING_NOT_REPLAY: "Clean Up not available, missing defence team information",
      TRAINING_BATTLE_TYPE: "Clean Up not available for this battle type: ",
      MAY_TRAINING: "You can make training in the Guild chat!",
      GENERAL: "General",
      STATS_COUNT_BATTLE: "Statistics based on {count} battles:",
      BEST: "Best",
      AVR: "Average",
      BAD: "Worst",
      AUTO_DMG: "Auto-Battle result: {damage}, {endTime}",
      AUTO_RESULT: "Auto-Battle result:\n{result} в {endTime}, {winRate}% victories!",
      WIN_RATE: "% victories",
      BEST_STAT_ASGARD: "Your Damage: {startDamage}\nBest Damage: {bestDamage}\n",
      BEST_STAT_BATTLE: "Your Battle: {startState}\nBest Battle: {bestState}\n",
      BEST_STAT_INFO: "Best moment: {moment} сек.\nFound for {count} tests",
      LAST_STAT_ASGARD: "Last Damage: {damage}\n",
      LAST_STAT_BATTLE: "Last Battle: {state}\n",
      LAST_STAT_INFO: "Last moment: {moment} sec.\nCompleted {count} tests\nTime left: {time}",
      BACK: "Back",
      BACK_TITLE: "Returns to previous menu",
      DEF_PET: "Allow pets in Defence",
      DEF_PET_TITLE: "Consider Pet on teams in the Defence Rating\nAnd offers teams with a same Pet patronage\nWhen turned off, data for the same teams with different pets will be summed up",
      OTHER_PLAT: "Other platforms",
      OTHER_PLAT_TITLE: "If enabled, the Rating will be displayed\non all other game platforms",
      DEF: "Deffence",
      ATT: "Attacks",
      EBR_TAB_TITLE: "Best teams {teamType} For Cosmic Battle on: {platforms}",
      EBR_TEAMS_COUNT: "Total known: <span style=\"color:green;\">{baseCount}</span> teams, with current settings selected: <span style=\"color:red;\">{selectCount}</span> teams, displayed <span style=\"color:green;\">{bestCount}</span> best",
      HERO_TEAMS: "Hero Teams",
      EBR_LEGEND: "All statistics are collected for teams with a total strength of more than 900К",
      EBR_LEGEND_WR_DEF: "WR - Chance to defence an attack by this team in %",
      EBR_LEGEND_WR_ATT: "WR - Chance to defeat the current opponent's team in %",
      EBR_LEGEND_CB: "CB - Count of Battles calculated",
      EBR_LEGEND_DF: "DF - The number of different Attacking teams for which the statistics of this team were collected",
      SHOW: "Show",
      NEXT: "Next",
      DEFAULT: "Set Default",
      ON_ALL: "Set all",
      OFF_ALL: "Reset everything",
      ADD_SETTING: "Additional settings:",
      SELECT_HEROES: "Select the heroes you want to use:",
      COUNT_BEST: "number of best",
      COUNT_SHOW_BEST: "Number of top teams displayed",
      MIN_CB: "Minimum Count of Battles fought (CB)",
      MIN_DIFF: "Minimum number of different attack teams (DF)",
      FAST_SHOW: "Show immediately vs enemy team",
      FAST_SHOW_TITLE: "If enabled, then when the opponent changes\nKnown statistics for the best attacking teams will be immediately displayed\nWith the current settings of the selected heroes and the number of battles",
      VS_TEAM: "Vs team",
      NO_RIVAL_DATA: "No data on current opponent",
      NO_TEAM_DATA: "No data on current team",
      OTHER_PET_DATA: " with such pets 😢\nBut there are options with other pets!",
      OTHER_SETTING_DATA: " with selected settings and heroes 😢\nBut there are options with other settings and heroes!",
      OTHER_PLAT_DATA: " on your platform 😢\nBut check also other platforms!",
      TITAN_ARENA: "ToE",
      TOWER: "Tower",
      BATTLES: "Battles",
      CLEAR_STORAGE: "Perhaps clearing the local\ndata storage will solve the problem\nClear?",
      CLASH_WORLDS: "Clash of Worlds",
      ATTEMPTS: "Attempts",
      HEROES: "with heroes",
      TITANS: "with titans",
      TOE_STAGE: "Tournament stage",
      ALIVE_RIVAL: "Alive enemy",
      VS_BOSS: "Vs Boss",
      VS_MINIONS: "vs Minions",
      EXCHANGE_HONEY: "Do you want to exchange all for rewards?",
      COIN: "coins",
      SELECT_RECEIV: "Choose where and\nwhat to collect",
      GRAY: "Gray",
      GREEN: "Green",
      BLUE: "Blue",
      PURPLE: "Purple",
      ORANGE: "Orange",
      RED: "Red",
      ARENAS: "Arena",
      GRAND_ARENAS: "Grand Arena",
      TOWERS: "Tower",
      FRIENDS: "Friendship",
      OUTLANDS: "Outland",
      SOUL_STONES: "Soul stones",
      PETS: "Pets",
      SELECT_SHOPS: "Set shops,\nwhere buy souls",
      NO_PRECALC_DATA: "No pre-calculation data",
      SET_NEED_HP: "set remaining health in %",
      WIN_ATTEMPT: "The enemy is defeated by {countBattle} attempts!",
      RESULT_ATTEMPT: "The result was achieved in {countBattle} attempts!",
      BATTLE_PROGRESS: "Battles completed: {countBattle}\nBest result: {bestCoeff}%",
      CLICK_TO_STOP: "Press, for <span style=\"color:red;\">stop</span>",
      IN_ADVENTURE: "in adventure",
      SELECT_QUEST: "Set quests to do:",
      SAVE: "Save",
      RUN_ACTIONS: "Do the following?",
      SETTING_QUEST: "⚙️Quest setup",
      SETTING_QUEST_TITLE: "Select which daily quests should be completed in \"Do all\"",
      OTHER_WAY: "Start on a different path",
      WAY_NUMBER: "Start on path №",
      COUNT_BATTLE: "fights",
      SEER_COUNT_OPEN: "Astral Seer opened {count} times",
      BTN_CONTINUE: "Continue",
      BTN_STOP: "Stop",
      NO_CONNECT_SERVER: "No connection to script server!\nSmart algoritm of team selection is not available",
      ACTIVATE_ACCESS: "Activate access",
      FOR_MORE_TIT: "to collect more titanite",
      FOR_UNLIM_TIT: "to collect titanite without restrictions",
      SMART_SELECT: "with smart algoritm of team selection",
      CONTINUE_WARN_DUNGEON: "Continue the dungeon without smart algoritm of team selection?\nTitans can die quickly!",
      SERVER_CONNECT_REPEAT: "The server could not respond😢\nTo try one more time?",
      SYNC: "Synchronization",
      SYNC_DUNGEON: "Makes synchronization after completion of the Dungeon",
      MODE_DUNGEON: ["Safe mode", "Without death", "Without stops"],
      SET_MODE_DUNGEON: "Set titanite count\nand mode",
      RUN_DUNGEON_TITLE: "Starts auto-playing the dungeon in the selected mode",
      COUNT_TITANITE: "titanite",
      COUNT_TITANITE_COMPACT: "titanite",
      DUNGEON_END_UNAVAILABLE: "Mode not available",
      DUNGEON_END_STOP: "Stopped by button",
      DUNGEON_END_MAY_DEAD: "Titan could have died in battle",
      DUNGEON_END_LOW_HEALTH: "The tank had low health left",
      DUNGEON_END_UNHEAL: "Losing health in a mixed room",
      DUNGEON_END_UNKNOWN: "An unknown error has happened",
      RERUN_DUNGEON: "restarting the dungeon",
      DUNGEON_BATTLE_LOG: "The battle completed: {type}, recovery = {recov}%. Test battles: {countTest}. Selection battles: {iterations}",
      DUNGEON_FIND_LOG: "Could not find a successful battle from {countTest} test battles {attackerType}, recovery = {recov}",
      DUNGEON_CHOICE_LOG: "Team selection {first}|{second}: {choice}. Test battles: {count}",
      NO_DONE: "not done",
      START_DUNGEON: "Dungeon starts: ",
      THROW_ERROR: "Error",
      TITANITE_COLLECT: "Titanite collected",
      CHECK_STATE_FAIL: "It was failed to check the status of game modes on the account",
      RUN_EXPED_FAIL: "Failed to start expeditions",
      LETTER_MAIL: "Rewards from mail",
      LETTER_MAIL_TITLE: "Collect all mails with the selected resources",
      QUEST_REWARDS: "Quest Rewards",
      QUEST_REWARDS_TITLE: "Collect all the rewards for quests with selected resources",
      ENERGY_BOOST: "Energy recovery boost",
      ENERGY_BOOST_TITLE: "When turned off, ignores mails and rewards with energy boost, otherwise collects them",
      ENERGY_OVER: "Energy 60+",
      ENERGY_OVER_TITLE: "When turned off, ignores mails and rewards with an energy of more than 60, otherwise collects them",
      PORTAL_CHARGE: "Portal Charges",
      PORTAL_CHARGE_TITLE: "When turned off, ignores mails and rewards with portal charges, otherwise collects them",
      HERO_SOULS: "Heroes Souls",
      HERO_SOULS_TITLE: "When turned off, ignores mails and rewards with the souls of heroes, titans, pets, otherwise collects them",
      VIP_POINTS: "Vip Points",
      VIP_POINTS_TITLE: "When turned off, ignores mails and rewards with Vip points, otherwise collects them",
      COUNT_PRECALC_TITLE: "Number of pre-calculation battles, the result of which determines whether it makes sense to launch an auto-attack\nValid values are from 0 to 1000\nA value of 0 disables pre-calculation and immediately launches an auto-attack if it fails to win",
      COUNT_ATTACK_TITLE: "The number of auto-attack battles in the adventure, if you failed to win the first time\nAcceptable values from 0 to 1000\nA value of 0 disables auto-attack and immediately cancels the battle and stops progress if you fail to win",
      WATER: "Water",
      WATER_TITLE: "Attack Water Lord",
      FIRE: "Fire  ",
      FIRE_TITLE: "Attack Fire Lord",
      EARTH: "Earth",
      EARTH_TITLE: "Attack Earth Lord",
      LIMIT_POINT: "Points limit",
      LIMIT_POINT_TITLE: "Stop after the maximum number of points in the saved replay for the Lord is done",
      BTN_ATTACK: "Attack!",
      BTN_ATTACK_TITLE: "Attack the Lords using replays or the last Attack team",
      BTN_SETTING: "Settings",
      BTN_SETTING_TITLE: "Setup Lords attack based on saved battle replays",
      SELECT_LORD_MODE: "Select Lords to attack\nand attack mode",
      MODE_LORD_ATTACK: ["By replays", "by Attacking team"],
      WEEKS_SELECT: ["Week 1", "Week 2", "Week 3", "All"],
      DAY_SELECT: ["Mon", "Tue", "Wed", "Thu", "Fri", "All"],
      ELEMENTS_SELECT: ["Water", "Fire", "Earth", "All"],
      SETTING_USER_REPLAY: "Setting user replays",
      SAVE_REPLAY: "Save replays",
      SAVE_REPLAY_TITLE: "Saves your replay with any Lord by link to this battle, or can save the upload of replays",
      UNLOAD_REPLAY: "  Load Replays   ",
      UNLOAD_REPLAY_TITLE: "Displays information about all saved replays with the Lords to the console and copies to the clipboard",
      DELETE_REPLAY: "Delete replays",
      DELETE_REPLAY_TITLE: "Deletes the last saved replays with the selected Lords and replaces them back with default script replays",
      DELETE_ALL_CONFIRM: "Do you really want to reset\nall replays with the Lords?",
      DELETE_ALL_COMPLETE: "All your custom replays have been successfully deleted and replaced with standard ones",
      DELETE_WEEK_CONFIRM: "Do you really want to reset\nall replays for the {week}?",
      DELETE_WEEK_COMPLETE: "All your custom  replays within a week were successfully deleted and replaced with standard ones",
      DELETE_DAY_CONFIRM: "Do you really want to reset\nreplays for the {week}, {dayOfWeek}?",
      DELETE_DAY_COMPLETE: "All your replays for the day were successfully deleted and replaced with standard ones",
      DELETE_ONE_COMPLETE: "Your replay for the day were successfully deleted and replaced with standard ones",
      REPLAY_ALL_COPY: "All replays have been copied",
      REPLAY_WEEK_COPY: "Replays for the week have been copied",
      REPLAY_DAY_COPY: "Replays for the day have been copied",
      REPLAY_ONE_COPY: "The replay has been copied",
      COPY_TO_BUFFER: " to the clipboard.\nYou can save them by inserting the \"Save replays\" button in the input field",
      INVALID_REPLAY: "An incorrect replay is assigned!\nYou can only save replays with the Lords of the Elements",
      INVALID_JSON: "An incorrect one is assigned JSON!\nUpload the text copied using the \"Upload replays\" button",
      REPLAY_SAVED: "The replay was saved successfully",
      REPLAY_UPLOAD: "All replays have been uploaded to database successfully",
      NOT_MATCH_EXAMPLE: "The entered data does not match the example!",
      LORD_ATTACK_RUN: "The auto attack of the Lords of the Elements has been started!",
      END_DEF_BEFORE_RUN: "Before starting, be sure to finish the battles on defense!",
      CURRENT_TEAM: "The current team",
      LORD_BATTLE_LOG: "Battle is done",
      LORD_WIN_LOG: "The Lord is defeated",
      LORD_ERROR_BATTLE_LOG: "The battle was not saved due to an error",
      LORD_LIMIT_LOG: "Maximum points scored",
      SET_PARAMS: "Set number of test battles\nand minimum, maximum power",
      RUN_DEF_TITLE: "Check the number of Defence points for the selected team",
      COUNT_TEST_BATTLE: "Number of test battles",
      MIN_POWER: "The minimum power of the opposing teams for the test /1000",
      MIN_POWER_COMPACT: "min power",
      MAX_POWER: "The maximum power of the opposing teams for the test /1000",
      MAX_POWER_COMPACT: "max power",
      FINAL_STATS: "Final statistics:",
      BTN_SELECT: "Choose",
      ENTER_COUNT: "enter the count",
      TOTEMS_INFO: "Totems received: <span style=\"color:white;\">{count}</span>\nFor next totem: <span style=\"color:white;\">{toNext}</span> Emeralds",
      BRAWL_TEST_TEAM: "In guild battles or training combat, you can make tests against\nEnemy <span style=\"color:red;\">{name}</span> with the power of the team <span style=\"color:white;\">{power}</span>\nFor correct results, choose\nmax. attack team power and GW/CoW battle type",
      SET_NUMBER_LEVELS: "Specify the number of levels:",
      POSSIBLE_IMPROVE_LEVELS: "It is possible to improve only {count} levels.<br>Improving?",
      NOT_ENOUGH_RESOURECES: "Not enough resources",
      IMPROVED_LEVELS: "Improved levels: {count}",
      REFRESH: "Refresh the cache",
      REFRESH_TITLE: "If enabled, the script will automatically refresh the cache of cells at the most convenient moment for this\nIf disabled, the opening of cells will stop when it is necessary to update the cache",
      OPEN_CACHE_PROGRESS: "Keys left: {keys}\nTotal opened: {totalOpen}\nTotal Grand-Prizes: {totalSuper}\nCashe refreshing: {countRefresh}\n\nStatus:\n   Opened: {countOpen}/{maxPrize}\n   Selected prizes: {countSuper}/{maxSuper}\n   Grand-Prizes: {realSuper}/3",
      RESOURCE_GET: "Resources received:",
      CACHE_PRIZE_ANSWER: "Select the prizes you want to search for",
      CACHE_ANSWER: "Do you want to open a cache using keys?",
      CHANGE_CACHE_PRIZE: "Set up prizes",
      MANY_EMPTY_WAY: "There are {countEmpty} empty squads in the path, Continue?",
      SUPER_TITLE: "If enabled, the script will try to find this prize with best chance\nIf disabled, this prize will be ignored by the script as if it were a regular prize.",
      OUT_KEYS: "Keys to the Cache cells have run out!",
      NEED_REFRESH: "For the best chance to have next Grand-Prize\nneed to refresh Cache!",
      FOR_SUPER_PRIZE_CHECK: "To set up prizes\nActivate access: ",
      WAY_COMPLETED: "The chosen path has already been taken by another player!",
      SERVER_NOT_CONNECT: "Could not get a response from the script server!",
      INVALID_STATS: "Couldn't load the Quiz stats!\nCheck your connection to our server",
      FOUND_QUESTIONS: "You found <span style=\"color:white;\">{count}</span> new questions",
      QUIZ_RATING_PLACE: "And your rang for find new questions is <span style=\"color:white;\">{place}</span>!",
      LANG_QUIZ_RATING: "Known questions in different languages:",
      AUTO_QUIZ: "Auto-Quiz",
      AUTO_QUIZ_TITLE: "Shows Quiz statistics and allows you to run a fully automatic Quiz\nIf during the Auto passage you come across a question that has no answer in the database, then you will be able to answer it yourself",
      AUTO_QUIZ_RUN: "Start Auto-Quiz?\nTickets will be used\nautomatically until they run out",
      AUTO_QUIZ_INFO: "Tickets left: {ticket}/{maxTicket}",
      QUIZ_STOP: "Quiz has been stopped!",
      QUIZ_WRONG: "Wrong Answer!",
      QUIZ_UNKNOWN: "There is no answer to the question!",
      QUIZ_REFRESH_INFO: "Restart the game, to\nupdate Quiz data",
      QUIZ_COMPLETED: "Auto-Quiz done",
      LANG: "Lang",
      LANG_QUIZ_LEGEND: "D1-3 - questions 1, 2 and 3 difficulties\nThe number of known is taken as 100%\nquestions in the most popular language",
      SHOW_TOWN: "Show settlements",
      SHOW_TOWN_TITLE: "Removes the Fog of War over enemy Settlements and Castles to make them more visible on the map",
      SCOUT_ENEMY: "Scout the enemy",
      SCOUT_ENEMY_TITLE: "Allows you to view hero teams from enemies at any distance from you within the Fog of War",
      CALL_PROGRESS: "Progress: <span style=\"color:white;\">{progress}</span>%",
      QUANTITY_CONTROL: "Quantity control",
      QUANTITY_CONTROL_TITLE: "Adds options to set quantity of something",
      BUY_INTERFACE: "Item selection interface",
      BUY_INTERFACE_TITLE: "Adds 5 additional buttons to the game selection interface:\nThe number of items purchased in shops\nThe number of lootboxes in the inventory to open\nButtons for increasing the number: +10, +100\nButtons for decrease the number: -10, -100\nThe button for enter any number from the keyboard",
      EVOLVE_CONTROL: "Evolution of Titan Artifacts",
      EVOLVE_CONTROL_TITLE: "Automatically selects the required number of fragments for the evolution of the Titan Artifact to the next star\nIn order for this to work, you need to enter the fragment purchase window through the Titan Artifact upgrade window",
      PET_SUMMON: "Pet Summoning Eggs",
      TITAN_SUMMON: "Titan Summoning Spheres",
      TITAN_ART: "Titan Artefact Spheres",
      HERO_ART: "Heroes Artefact Chest",
      COUNT_OPEN_TITLE: "Allows you to set the number to open",
      EXT_CHECKED_TITLE: {
        countControl: "Set where should be used\nquantity control",
        interface: "Configure where and how\nto change the game interface"
      },
      COUNT_PRECALC_BRAWL_TITLE: "The number of pre-calculation fights before choosing a team (from 0 to 1000)",
      MIN_WINRATE_TITLE: "Minimum % of wins in the pre-calculation before attack (from 0 to 100)",
      COUNT_TEST: "Number of tests",
      BRAWL_MODES: ["With last team", "Auto-team select"],
      BRAWL_SELECT: "Select mode\n{type} Brawl",
      TITANS: "titans",
      HEROES: "heroes",
      RUN_BRAWL_TITLE: "Starts the auto-brawls in the selected mode",
      LAST_TEAM_UNKNOWN: "The last attack command is unknown",
      EMPTY_TEAMS: "No teams for auto-selection\nin Brawl with the main hero!",
      FEW_TEAMS: "There are not enough teams to select",
      FEW_TEAMS_WARNING: "Auto-Brawls can work not well!\nAvailable only <span style=\"color:red;\">{count}</span> teams to select!\nSure you want to continue?",
      DAILY_BRAWL_COMPLETE: "Daily quests completed!",
      LOW_LIVE: "low lives left!",
      LOW_LIVE_WARNING: "Left <span style=\"color:green;\">{attempts}</span> lives!\nSure you want to continue?",
      LOW_WINRATE: "Low chances for victory!",
      LOW_WINRATE_WARNING: "The best result of the pre-calculation <span style=\"color:green;\">{winrate}%</span> victory!\nSure you want to continue?",
      BRAWL_PRECALC_PROGRESS: "Pre-calculation progress:\nTeams checked: {count}/{countTeam}\nBest: {bestWin}% of victory\nLast: {lastWin}% of victory\nCompleted fights: {countBattle}",
      SMART_RAID_VIP5: "Reach VIP 5+ in the game",
      SMART_RAID: "Smart Raids in the Campaign",
      SMART_RAID_TITLE: "Optimizes multiple campaign raids by breaking them down into x10 raids\nWhich allows you to get more guaranteed items!\nReach VIP 5+ in the game to use it",
      MULTI_RAID: "Multiple raids in the Campaign",
      MULTI_RAID_TITLE: "Allows you to set the number of raids\nFor VIP 1-4, it also activates multiple raid buttons!",
      SKIP_UPDATE: "Skip update",
      SKIP_UPDATE_TITLE: "The script update message will no longer appear until the new version is released",
      UNLOCK_RAID: "Raids for VIP0",
      UNLOCK_RAID_TITLE: "Adds the ability to conduct single raids in a campaign with VIP 0 and without a Golden Raid-Ticket\nAttention! This may only work on weekends and may not work for everyone\nTurn on \"Show errors\" to find out if raids do not work for you",
      GAME_LIB_ERROR: "Error connecting to the game library!\n\n<a href=\"https://t.me/HW_Goodwin/831/76983\" target=\"_blank\">Instructions for solving the problem</a>\n",
      AUTH_ERROR: "Error connecting to the script server!",
      ERROR_NEED_RELOAD: "Some functions can not work correctly. Please restart the game\nIf the problem will happen again, then wait a few minutes and try same",
      TEST_ASGARD: "Test Asgard",
      TEST_ASGARD_TITLE: "Allows you to start a test battle against the current boss of Asgard with your current buffs\nTo start, you do not need to view the battle record, it is enough to activate this checkbox\nThis test allows you to repeat the battle conditions with 100% accuracy when attacking the boss in its current level and health",
      ALL_REWARDS: "Collect Rewards",
      ALL_REWARDS_TITLE: "Collects rewards for quests, mail, rewards of all Seasons and Prestige rewards\nYou can set where and what rewards to collect",
      SEASON_REWARDS: "Season Rewards",
      SEASON_REWARDS_TITLE: "Collects available rewards for all current seasons",
      PRESTIGE_REWARDS: "Prestige season rewards",
      PRESTIGE_REWARDS_TITLE: "Collects available rewards from Prestige season",
      ZERO_LOCATION_COLLECT: "Set at least one of the locations to collect rewards",
      QUESTS: "for quests",
      SEASONS: "seasons",
      PRESTIGES: "prestiges",
      PREV_LEVEL: "Previous Level",
      PREV_LEVEL_TITLE: "Show the statistics of the Boss from the previous level",
      NEXT_LEVEL: "Next Level",
      NEXT_LEVEL_TITLE: "Show the statistics of the Boss from the next level",
      TEAM_STATS: "Team stats",
      TEAM_STATS_TITLE: "Shows the stats of the team against the selected Boss with all the buffs that have been tested",
      ATTACK_INVASION_TITLE: "Automatically attacks the boss until Victory",
      PRECALC_INVASION_TITLE: "Calculates the chances of winning a battle with the current buffs and the selected team",
      BEST_AUTO_ATTACK: "Auto-attack with best team",
      BEST_AUTO_ATTACK_TITLE: "Automatically selects the best known team with the current buffs and attacks the Boss with it until victory",
      INVASION_LEGEND_BF: "BF - Buffs for attack team (0 - minimum, 300 - maximum)",
      INVASION_LEGEND_WR: "WR - The chance to win with this team in % (Teams with no chance of winning are not displayed)",
      INVASION_LEGEND_HP: "HP - Lowest % of remaining health",
      INVASION_LEGEND_CB: "CB - The number of fights or tests (777K - 777,000 fights)",
      NO_DATA_BOSS: "No data for this Boss yet 😢",
      LEVELS: "level",
      ACCESS_FOR_BOSS: "With access " + dq + " you can immediately find out the best team against any Boss!",
      NO_TEST_SELECT_TEAM: "selected team has not been tested yet",
      WITH_NOW_BUFF: "with current buff",
      SELECT_TEAM_BUFF: "the selected team with buff",
      WIN_CHANCE: "Winrate",
      CHANCE_TO_WIN: "Winrate",
      NOW_MOMENT: "At the moment",
      BEST_TEAM: "best team",
      NO_WIN_TEAM: "There are no teams with victory",
      BEST_TEAMS_ANY_BUFF: "Best teams with all the buffs",
      TEAM_STATS_VS_BOSS: "Team stats vs Boss",
      BUFF_ANSWER: "What buff should be used from 0 to 300?",
      SEARCH: "Search",
      PRECALC: "Pre-calculation",
      PROGRESS: "Progress",
      INVASION_PROGRESS: "Boss Attacks\n{bossName}\nWith buff {buff}!\nTotal: ",
      ATTACK_TIMEOUT: "Set maximum delay between fights\nAcceptable values are from 2 to 300 seconds",
      COUNT_BATTLES: "completed {count} fights",
      BATTLES_COUNT: "fights have been completed",
      HP_LEFT: "% HP is remained",
      NEW_BEST_RESULT: "New best result: ",
      NEW_RESULT: "New result: ",
      GAME_CONNECT_FAILED: "No response from the game server",
      RESTART_BATTLE_FAILED: "Failed to restart the fight",
      ATTEMPT_RESTART_BATTLE: "Await, trying to retry the fight",
      FOR_AUTO_RESTART: "To automatically restart the auto-attack, activate\nchecbox \"Save Online\" in \"script Main Setups\"",
      BOSS_WIN: "<span style=\"color:green;\">Boss defeated</span>",
      WIN_BOSS: "Defeated boss",
      WAIT_END_BATTLE: "Wait for the end of the fight",
      CALC_STATS_STOPPED: "Calculating statistics <span style=\"color:green;\">Stopped!</span>",
      BEST_TEAMS_VS_BOSS: "Best teams for Boss",
      ALL_BUFFS: "All buffs",
      ALL_BUFFS_TITLE: "Shows the best team for each buff against the selected Boss level",
      SELECT_BUFF: "Set buffs against the Boss",
      NO_FIND_WIN_TEAM: "No winning teams have been found yet 😢",
      AUTO_IMPROVED: "Improve Auto-Battle",
      AUTO_IMPROVED_INVASION_TITLE: "Instead of waiting between fights, he uses this time to improve the last fight\nUsing this feature allows you to speed up the victory over a boss with a low chance many times over\nAnd in some cases, it will allow you to win even with buff and a team that has 0% for victory\nThe time allotted for improvement can be set with the maximum delay",
      FOR_IMPROVED_CHECK: "To use the Improve battle with the boss auto-attack\nYou need activate: " + dq,
      NEED_IMPROVED_CHECK: "To use the function, activate\n<span style=\"color:green;\">Improved battle</span> in fight setup",
      NOT_INFO_BEST: "There are unknown team with the current buff",
      KILL_SOUL_EVENT: "Enemies killed: {score}\nHeroes used: {countUsed}/{countHero}",
      GET_250_POINT: "Score 250 points",
      GET_250_POINT_TITLE: "Passes with 1 hero until scores 250 points to receive all daily rewards",
      GET_MAX_POINT: "Use all heroes",
      GET_MAX_POINT_TITLE: "Passes with 1 hero until uses all the heroes to score maximum points",
      RUN_ARCHDEMON_SOULS: "Select the mode to pass the Furnace of Souls",
      GAME_INTERFACE: "Game Interface",
      GAME_INTERFACE_TITLE: "All settings related to changing the visual part of the game",
      HIDE_TUTORIAL: "Hide tutorial",
      HIDE_TUTORIAL_TITLE: "Removes most of the tutorial tips in the game",
      HIDE_SERVERS: "Collapse servers",
      HIDE_SERVERS_TITLE: "Hide unused servers",
      SHOW_ERRORS: "Show errors",
      SHOW_ERRORS_TITLE: "Shows errors in requests to the game server",
      SEASON_QUEST: "Show 4-th quests of the seasons",
      SEASON_QUEST_TITLE: "Unlocks the display of the 4-th task of the seasons even if you have not bought a ticket\nYou still won't be able to complete it - the game will show you an error\nBut if you plan to buy a ticket later, you will be able to complete this task in advance",
      ISLAND_FOG: "Remove the fog on the Island map",
      ISLAND_FOG_TITLE: "Removes the fog on the map of the Mysterious Island",
      NEED_RELOAD: "Restart the game to apply the changes!",
      STAT_EBR: "Collect stats",
      STAT_EBR_TITLE: "Performs pre-calculation of battles from the Cosmic Battle log to collect statistics of the best teams\nLeaving the setting enabled, you help compile the Rating of the best teams for defense and attack",
      NEW_MISSION: "Campaign Survival Missions",
      NEW_MISSION_TITLE: "Unlocks 2 survival missions in the campaign to be completed again:\n\"Tank\" mission in Chapter 14\n\"Shard of the Elements\" mission in Chapter 15",
      BLOCK_TRACKING: "Block tracking",
      BLOCK_TRACKING_TITLE: "Blocks most unwanted requests\nWith information about user's actions in the game",
      BLOCK_TRACKING_INFO: "\n\nTotal blocked:     {allBlocked} requests\nCurrent session:  {nowBlocked} requests",
      BLOCK_TRACKING_WARNING: "<span style=\"color:red;\">Attention! The function is experimental and the consequences of its use are unknown!</span>\n\nBlocks most requests that collect information about your actions in the game.\nThis will reduce network traffic and speed up the download of the game!\n\nEnable tracking blocking?",
      CASTLE_UPGRADE: "AoC event coins in the Castle",
      CASTLE_UPGRADE_TITLE: "Allows you to set number of Superior Coins that will be spent on improving the Guild Castle in the Territory of Conquest",
      AFTER_INVALID_BATTLE: "The result was not counted!\nGame server saved auto-attack result.",
      PASS_THE_TOWER_TITLE: "Automatically clears the tower or collects all free rewards at level 130",
      ASSEMBLE_OUTLAND_3_TITLE: "Collects 3 free chests in Outland",
      ASSEMBLE_OUTLAND_12_TITLE: "Collects 3 free and 6 paid chests for {price} emeralds and 3 gift chests",
      ASSEMBLE_OUTLAND_21_TITLE: "Collects 3 free and 6 paid chests for {firstPrice} emeralds and 6 paid chests for {secondPrice} emeralds and 6 gift chests",
      CHECK_EXPEDITIONS_TITLE: "Checks and, if necessary, launches expeditions or collects rewards for completing them",
      CHECK_SEER_TITLE: "Checks and, if necessary, expends the attempts of the Astral Seer\nFrom Monday to Saturday, 1 attempt is spent if there are 7/7 of them\nOn Sunday, the quest \"Use Astral Providence\" is completed completely at 5/5",
      All_RAID_ADVENTURE_TITLE: "Complete an adventure raid with all remaining portal charges",
      COLLECT_MAIL_TITLE: "Collects all mail except letters with energy, souls and portal charges",
      COMPLETE_DAILY_QUESTS_TITLE: "Completes most of the daily quests",
      COLLECT_DAILY_REWARDS_TITLE: "Collects calendar rewards, Easter eggs, subscription rewards and other",
      COLLECT_QUEST_REWARDS_TITLE: "Collects rewards for completing all daily and event quests",
      COMPLETE_TOE_TITLE: "Pass ToE with last attacking team",
      COMPLETE_DUNGEON_TITLE: "Farm the dungeon until you have the specified amount of titanite",
      MAKE_A_SYNC_TITLE: "Syncs most of your game data so you don't have to reload the game",
      RELOAD_GAME_TITLE: "If synchronization is not enough, then it is better to reaload game",
      INVENTORY_LOOTBOX: "Boxes and dolls in the inventory🆕",
      INVENTORY_LOOTBOX_TITLE: "Allows you to set the number of Boxes and Dolls to open in the inventory for which there is no choice of quantity",
      INVENTORY_DOOL: "Recursive opening of Nesting Dolls🆕",
      INVENTORY_DOOL_TITLE: "Allows you to recursively open any dolls until they run out",
      SUMMARY_CAMPAIGN: "Summing up rewards in the campaign🆕",
      SUMMARY_CAMPAIGN_TITLE: "Combines all the same rewards received in raids and displays their amounts in a compact form",
      ASGARD: "Asgard",
      ASGARD_TITLE: "Shortcut to Asgard",
      TITAN_VALLEY: "Titan Valley",
      TITAN_VALLEY_TITLE: "Shortcut to Titan Valley",
      SANCTUARY: "Sanctuary",
      SANCTUARY_TITLE: "Fast travel to Sanctuary",
      GUILD_WAR: "Guild war",
      GUILD_WAR_TITLE: "Fast travel to Guild war",
      AVATAR_NAME: "Avatar",
      DELAY_INPUT: "Delay in seconds between of all actions (requests) from the script to game server\nThe average value is indicated, and the actual value is determined randomly in a certain time\nThis setting will make the use of the script more safe,\nby limiting the abnormally high speed of sending requests.\nBut at the same time, the speed of many functions will decrease.",
      CANCEL_BATTLE: "Cancel fights",
      CANCEL_BATTLE_TITLE: "Allows you to cancel fights if you will lose",
      AUTO_CANCEL_TITLE: "Fights with loses automatically cancels",
      EVENT_NEWS: "Event Activity",
      EVENT_NEWS_TITLE: "News about the Activity among users of the script for the current event in the game.",
      EVENT_NEWS_TEXT: "Diar Friends!\nOur Comunity make an Activity for current Event in game.\nWe will make gifts for our winners! It will be " + dq + " and " + dy + " versions for Free.\nAlso winners can get Unique Achievement of the tester witch will allow you to join to close comunity with test script version with additional options.\n\nTo look more you can read on our <a href=\"https://discord.com/channels/1235558836857864192/1280616915298943042/1312848211852918917\" target=\"_blank\">Discord group</a>.\nPress Ctrl+link to open it in a new tab.",
      BOSS_KILL: "Kawabanga!🔥",
      BOSS_KILL_TITLE: "Attack the main boss in the event with any team,\nto kill him instantly with the minimum possible buff",
      FAST_KILL: "Kill the Boss",
      FAST_KILL_TITLE: "Kills the current Boss level with 1 click per 1 attack\nYou only need to buy a minimum buff",
      KNOWN_FAST_KILL: "there are known teams witch killed boss with next buffs: ",
      UKNOWN_ANY_KILL: "There are no known teams to kill boss.",
      WRONG_INPUT: "Something going wrong and it was not possible to win!",
      FIND_TEAM: "Search Team",
      FIND_TEAM_TITLE: "Starts the search for the winning team with the selected buffs against the current Boss",
      TEAM_FOUND: "Team for Victory was found!",
      NOTHING_TEST: "Nothing to test!",
      BEST_TEAM_FOUND: "All best teams already found.",
      FIND_PROGRESS: "Pet: {pet}/{petAll}\nTeam: {pack}/{packLast}\nPatronage: {favor}/{favorAll}\nTotal checked: {progress}%",
      CONGRATS: "Congratulate!!!",
      KAWABANGA_BEST_TEAM: "You have found a new best team against the Boss!",
      KAWABANGA_MANY_TEST: "You have already did <span style=\"color:green;\">{count}</span> fights in Kawabanga!",
      KAWABANGA_ACCESS: "And you get full access to ✅<span style=\"color:lime;\">Kawabanga🔥</span> to complete the main Boss for all levels on your accaunt!",
      KAWABANGA_BATTLE: "You have already fought <span style=\"color:white;\">{count}</span> battles",
      FOR_USE_KAWABANGA: "There are <span style=\"color:white;\">{kawabanga}</span> battles left\n\nOr activate <span style=\"color:green;\">VIP</span> access and use\nall the features ✅<span style=\"color:lime;\">Kawabanga🔥</span> straightaway!",
      KAWABANGA_STATS: "Show progress",
      KAWABANGA_STATS_TITLE: "Show the current progress of the selected boss check on all remaining buffs",
      KAWABANGA_LEGEND_BUFF: "BUFF - Attack Team Buff (0 - 300)",
      KAWABANGA_LEGEND_TEAM: "TEAM - Number of commands left to check",
      KAWABANGA_LEGEND_PP: "PP% - Progress of checking the selected boss in %",
      KAWABANGA_BOSS_PROGRESS: "Progress in serching teams against the Boss",
      THANKS_FOR_YOU: "✅<span style=\"color:lime;\">Kawabanga🔥</span> values your input!",
      AUTO_SELECT: "Auto-search",
      AUTO_SELECT_TITLE: "Automatically selects a gain to search for and switches to a new one when there is nothing left to test"
    },
    RU: {
      PROGRESS_LORD_DEF: "Статистика защиты на {tier} этапе от {countRival} противников по {countBattle} боев: \n\n#   Мощь    ",
      PROGRESS_LORD_ATTACK: "Прогресс боев с Повелителями: \nСтихия      Очки      Бои \n",
      LANGUAGE_BUTTON: dn,
      BOTTOM_URLS: dc.sprintf({
        title: "Телеграм"
      }) + dN.sprintf({
        title: "YouTube"
      }) + dC.sprintf({
        title: "Бусти"
      }) + dh.sprintf({
        title: "Discord"
      }) + dW.sprintf({
        title: "Вконтакте"
      }),
      PLAN_DESC_FREE: "Открывает все бесплатные функции скрипта:\n\n- Ежедневный автоматический сбор подарков\n- Выполнение всех квестов и их кастомная настройка\n- Отмена боев в приключениях, с прислужниками и других режимах (кроме ВГ, СМ, Асгарда)\n- Предрасчет боя в режимах Войны Гильдий, Столкновения Миров, Асгарда и Тренировках гильдии\n- Ускорение и замедление боев без активной Валькирии.\n- Авто-прохождение подземелья (200 титанита в день + 150 от Валькирии)\n- Удобная автоматизация сбора и использования ресурсов\n- Авто-прохождение приключений\n-⚡Готовые маршруты для прохождения всех приключений и сохранение до 3-х собственных различных маршрутов\n-⚡Дополнительная поддержка временных игровых ивентов ",
      PLAN_DESC_BASE: "Открывает базовые функции скрипта:\n\n-⚡Умное авто-прохождение подземелья\n-⚡Тестовые бои по повторам во всех режимах, Асгард, ВГ, СМ, Арены, Приключения.\n-⚡Тестовые бои добивания, с текущей энергией и здоровьем противника во всех игровых режимах.\n-⚡Автоматическая смена команд на Гранд-Арене\n-⚡Автоматическое убийство Повелителей в Турнире Стихий\n\nПодробности по ссылкам ниже",
      PLAN_DESC_VIP: "Открывает продвинутые функции скрипта:\n\n-⚡Умное авто-прохождение подземелья\n-⚡Расширенная поддержка временных игровых ивентов с подробной статистикой\n-⚡Проверка команды защиты в Турнире Стихий. Позволит подобрать лучшую команду для Защиты на всех этапах\n\nПодробности по ссылкам ниже",
      ACTIVE_PLAN: "Активные доступы:",
      DETAILS_ALL: "Общие настройки",
      DETAILS_BATTLE: "Боевые настройки",
      DETAILS_EVENT: "Настройки ивента",
      DETAILS_VALUE: "Значения ввода",
      GRAND_ARENA_DEF: "Защита на ГА",
      GRAND_ARENA_DEF_TITLE: "Автоматически переставляет команды защиты ГА местами при нападении на Гранд Арене",
      TEST_BATTLE: "Тренировка",
      TEST_BATTLE_TITLE: "Тренировочный бой в чате, боях гильдии и тренировках против команды из последнего реплея",
      FINISH_BATTLE: "Добивание",
      FINISH_BATTLE_TITLE: "Добивание в чате, боях гильдии и тренировках против команды из последнего реплея с текущем здоровьем и накопленной энергией",
      BOSS_ATTACK: "Атака Босса",
      BOSS_ATTACK_TITLE: "Нападите на любого босса в событии, чтобы узнать шансы на победу, не расходуя попытки или автоматически атаковать его выбранной командой",
      SKIP_FIGHTS: "Пропуск боев",
      SKIP_FIGHTS_TITLE: "Пропуск боев в запределье и арене титанов, автопропуск в башне и кампании",
      STAY_ONLINE: "Сохранять онлайн",
      STAY_ONLINE_TITLE: "В случае неизвестных ошибок автоматически перезагружает игру и перезапускает последнюю активную функцию \n(истекло время действия игровой сессии 6 часов или игра была запущена на другом окне/браузере/устройстве и прочее)",
      AUTO_EXPEDITION: "Авто-экспедиции",
      AUTO_EXPEDITION_TITLE: "Автоотправка экспедиций",
      BATTLE_RECALCULATION: "Предрасчет",
      BATTLE_RECALCULATION_TITLE: "Предварительный расчет боя",
      HACK_BATTLE: "Улучшение боя",
      HACK_BATTLE_TITLE: "В конце боя дает возможность активировать поиск наилучшего момента для активации авто в бою",
      AUTO_BATTLE: "Авто-повтор",
      AUTO_BATTLE_TITLE: "Автоповтор боев в различных режимах",
      DISABLE_DONAT: "Убрать рекламу",
      DISABLE_DONAT_TITLE: "Убирает все всплывающие окна с предложениями доната, лавку редкостей и прочее",
      BUY_IN_STORE: "Авто-магазины",
      BUY_IN_STORE_TITLE: "Скупить все за золото в лавке и магазине петов, а также частицы хаоса",
      COMBAT_SPEED: "Множитель ускорения боя",
      NUMBER_OF_TEST: "Количество тестовых боев",
      INTERFACE_SCALE: "Масштаб интерфейса скрипта в %",
      FPS_INPUT: "Частота кадров в секунду (FPS)",
      TO_DO_EVERYTHING: "Сделать все",
      TO_DO_EVERYTHING_TITLE: "Выполнить несколько действий",
      DUNGEON: "Подземелье",
      DUNGEON_TITLE: "Автопрохождение подземелья",
      ARCHDEMON: "Архидемон",
      ARCHDEMON_TITLE: "Набивает килы и собирает награду",
      ADVENTURE: "Приключение",
      ADVENTURE_TITLE: "Проходит приключение по указанному маршруту",
      RAID_MINIONS: "Прислужники",
      RAID_MINIONS_TITLE: "Автоматически атакует Прислужников в Асгарде последними 3 командами, которые там использовались",
      STORM: "Буря",
      STORM_TITLE: "Проходит бурю по указанному маршруту",
      AUTO_RAID_ADVENTURE: "Рейд приключения",
      AUTO_RAID_ADVENTURE_TITLE: "Делает рейд приключения на заданное количество порталов",
      CHANGE_MAP: "Сменить остров",
      CHANGE_MAP_TITLE: "Перейти на другую карту острова",
      TOE_DEF: "Защита в ТС",
      TOE_DEF_TITLE: "Проверить защиту в Турнире Стихий",
      LORD_ATTACK: "Атака Повелителей",
      LORD_ATTACK_TITLE: "Автоматически атакует Повелителей наилучшим известным способом",
      OPEN_SEER: "Открыть Провидца",
      OPEN_SEER_TITLE: "Открывает провидца указанное количество раз",
      SWAP_GA_DEF: "Сменить защиту",
      SWAP_GA_DEF_TITLE: "В случайном порядке перемешивает команды защиты Гранд Арены",
      ARCHDEMON_SOULS: "Горнило душ",
      ARCHDEMON_SOULS_TITLE: "Набивает килы и собирает награду в Горниле Душ",
      AUTO_BRAWL: "Автопотасовки",
      AUTO_BRAWL_TITLE: "Запускает прохождение потасовок с автоматическим подбором лучшей команды для Атаки",
      INVASION_RATING: "Рейтинг Босса",
      INVASION_RATING_TITLE: "Показывает лучшие команды для убийства выбранного Босса в текущем событии!",
      EPIC_BRAWL_DEF_RATING: "Защита для ВБ",
      EPIC_BRAWL_DEF_RATING_TITLE: "Показывает лучшие команды для защиты во Вселенской Битве!",
      EPIC_BRAWL_ATT_RATING: "Подбор атаки ВБ",
      EPIC_BRAWL_ATT_RATING_TITLE: "Помогает подобрать лучшую команду для Атаки текущего соперника!",
      SWAP_HONEY: "Обменять мёд",
      SWAP_HONEY_TITLE: "Обменивает весь мёд на награды ивента",
      SWAP_CANDY: "Обменять конфеты",
      SWAP_CANDY_TITLE: "Обменивает все конфеты на награды ивента",
      BUY_SOULS: "Купить души",
      BUY_SOULS_TITLE: "Купить души героев из всех доступных магазинов",
      ARTIFACTS_UPGRADE: "Улучшить арты",
      ARTIFACTS_UPGRADE_TITLE: "Улучшает указанное количество самых дешевых артефактов героев",
      SKINS_UPGRADE: "Улучшить облики",
      SKINS_UPGRADE_TITLE: "Улучшает указанное количество самых дешевых обликов героев",
      OPEN_CACHE: "Открыть тайник",
      OPEN_CACHE_TITLE: "Использует ключи для открытия ячеек тайника в текущем событии.\nОбновление тайника происходит оптимальным образом, чтобы получить как можно больше выбранных призов",
      RUN_ARCHDEMON: "Пройти Архидемона?",
      RUN_MINIONS: "Пройти Прислужников?",
      SELECT_ISLAND: "Выберите остров:",
      MAP_NUM: "Карта {num}",
      BTN_YES: "Да",
      BTN_NO: "Нет",
      BTN_OK: "Ок",
      BTN_RUN: "Запустить",
      BTN_OPEN: "Открыть",
      BTN_CANCEL: "Отмена",
      MSG_HAVE_BEEN_DEFEATED: "Вы потерпели поражение!",
      BTN_AUTO: "Авто-атака",
      MSG_YOU_APPLIED: "Вы нанесли {damage} урона",
      MSG_REPEAT_MISSION: "Повторить миссию?",
      BTN_REPEAT: "Повторить",
      MSG_SPECIFY_QUANT: "Указать количество:",
      QUESTION_COPY: "Вопрос скопирован в буфер обмена",
      ANSWER_KNOWN: "Ответ известен",
      ANSWER_NOT_KNOWN: "ВНИМАНИЕ! Ответ не известен!",
      VICTORY: "<span style=\"color:green;\">ПОБЕДА</span>",
      DEFEAT: "<span style=\"color:red;\">ПОРАЖЕНИЕ</span>",
      OPEN_DOLLS: "Открыть {newCount} матрешек рекурсивно?",
      BTN_YES_I_AGREE: "Да, я беру на себя все риски!",
      BTN_NO_I_AM_AGAINST: "Нет, я отказываюсь от этого!",
      EXPEDITIONS_SENT: "Экспедиции:<br>Собрано: {countGet}<br>Отправлено: {countSend}",
      EXPEDITIONS_NOTHING: "Нечего собирать/отправлять",
      DUNGEON_TITANIT: ": титанит {dungeonActivity}/{maxDungeonActivity}",
      DUNGEON_END: "Подземелье завершено",
      DUNGEON_STOP: "Подземелье остановлено",
      DUNGEON_LOG_HARVEST: "Собрано титанита: ",
      DUNGEON_LOG_SPEED: "Скорость сбора: {speed} титанита/час",
      DUNGEON_LOG_TIME: "Время раскопок: {hours} ч. {minutes} мин. {seconds} сек.",
      TOWER_FLOOR: "Башня: Этаж ",
      TOE_LEVEL: "Турнир Стихий: Уровень ",
      EVENT: "Ивент",
      NOT_AVAILABLE: "недоступен",
      NO_HEROES: "Нет героев",
      NOTHING_TO_COLLECT: "Нечего собирать",
      NO_GIFTS: "Нет подарков, которые можно собрать",
      COLLECT_GIFTS: "Собрано {count} подарков",
      COLLECT_REWARDS: "Собрано {count} наград",
      SOMETHING_WENT_WRONG: "Что-то пошло не так",
      REMAINING_ATTEMPTS: "Осталось попыток",
      BATTLES_CANCELED: "Битв отменено",
      MINION_RAID: "Рейд прислужников",
      COMPLETED: "завершено",
      STOPPED: "Остановлено",
      REPETITIONS: "Повторений",
      MISSIONS_PASSED: "Миссий пройдено",
      STOP: "остановить",
      NOT_THIS_TIME: "Не в этот раз",
      TOTAL_OPEN: "Всего открыто",
      SUCCESS: "Успех",
      RECEIVED: "Получено",
      LETTERS: "писем",
      PORTALS: "порталов",
      ACTIVITY_RECEIVED: "Получено активности",
      CHESTS_NOT_AVAILABLE: "Сундуки не доступны",
      OUTLAND_CHESTS_RECEIVED: "Получено сундуков Запределья",
      QUEST_10001: "Улучши умения героев 3 раза",
      QUEST_10003: "Пройди 3 героические миссии (Аврора 9 глава)",
      QUEST_10006: "Используй обмен изумрудов 1 раз",
      QUEST_10007: "Соверши 1 призыв в Атриуме Душ",
      QUEST_10016: "Отправь подарки согильдийцам",
      QUEST_10018: "Используй зелье опыта",
      QUEST_10023: "Прокачай Дар Стихий на 2 уровня",
      QUEST_10024: "Повысь уровень любого артефакта один раз",
      QUEST_10028: "Повысь уровень любого артефакта титанов",
      QUEST_10029: "Открой сферу артефактов титанов",
      QUEST_10030: "Улучши облик любого героя 1 раз",
      QUEST_10044: "Воспользуйся призывом питомцев 1 раз",
      QUEST_10047: "Набери 150 очков активности в Гильдии",
      NOTHING_TO_DO: "Нечего выполнять",
      COMPLETED_QUESTS: "Выполнено квестов",
      NOT_QUEST_COMPLETED: "Ни одного квеста не выполнено",
      ERRORS_OCCURRES: "Призошли ошибки при выполнении",
      COPY_ERROR: "Скопировать в буфер информацию об ошибке",
      ALL_TASK_COMPLETED: "Все задачи выполнены",
      UNKNOWN: "Неизвестно",
      BTN_CANCELED: "Отменено",
      INCORRECT_WAY: "Неверный путь в приключении: {from} -> {to}",
      MUST_TWO_POINTS: "Путь должен состоять минимум из 2х точек",
      MUST_ONLY_NUMBERS: "Путь должен содержать только цифры и запятые или дефис",
      NOT_ON_AN_ADVENTURE: "Вы не в приключении",
      YOU_IN_NOT_ON_THE_WAY: "Вашего местоположения нет на пути",
      ATTEMPTS_NOT_ENOUGH: "Ваших попыток не достаточно для завершения пути, продолжить?",
      YES_CONTINUE: "Да, продолжай!",
      NOT_ENOUGH_AP: "Попыток не достаточно",
      ATTEMPTS_ARE_OVER: "Попытки закончились",
      MOVES: "Ходы",
      BUFF_GET_ERROR: "Ошибка при получении бафа",
      BATTLE_END_ERROR: "Ошибка завершения боя",
      FAILED_TO_WIN: "Не удалось победить",
      ERROR_OF_THE_BATTLE_COPY: "Призошли ошибка в процессе прохождения боя<br>Скопировать ошибку в буфер обмена?",
      ERROR_DURING_THE_BATTLE: "Ошибка в процессе прохождения боя",
      NO_CHANCE_WIN: "Нет шансов победить в этом бою: 0/",
      LOST_HEROES: "Вы победили, но потеряли одного или несколько героев!",
      VICTORY_IMPOSSIBLE: "Победа не возможна!",
      LOSSES: "Поражений",
      WINS: "Побед",
      FIGHTS: "Боев",
      STAGE: "Стадия",
      LIVES: "Жизни",
      RAID: "Рейд",
      DONT_HAVE_LIVES: "У Вас нет жизней",
      DAILY_BONUS: "Ежедневная награда",
      NO_MORE_ACTIVITY: "Больше активности за предметы сегодня не получить",
      EXCHANGE_ITEMS: "Выберите цвет предметов для обмена\nи укажите необходимое количество\nочков активности (не более {maxActive})",
      GET_ACTIVITY: "Получить активность",
      NOT_ENOUGH_ITEMS: "Предметов недостаточно",
      FRAGMENT: "фрагмент ",
      ITEM_SPENT: "Потрачены предметы",
      NO_PURCHASABLE_HERO_SOULS: "Нет доступных для покупки душ героев",
      PURCHASED_HERO_SOULS: "Куплено {countHeroSouls} душ героев",
      RAID_NOT_AVAILABLE: "Рейд не доступен или сфер нет",
      RAID_ADVENTURE: "Рейд {adventureId} приключения!",
      ADVENTURE_COMPLETED: "Приключение {adventureId} пройдено {times} раз",
      BTN_AUTO_F5: "Переиграть на авто",
      NOTHING_BUY: "Нечего покупать",
      LOTS_BOUGHT: "Куплено {countBuy} лотов",
      TIMER: "Таймер:",
      ERROR_MSG: "Ошибка: {name}<br>{description}",
      MAP: "Карта приключения №",
      PLAYER_POS: "Позиции игроков:",
      HINT: "<br>Подсказка: ",
      PICTURE: "<br>На картинке: ",
      ANSWER: "<br>Ответ: ",
      ELEMENT_TOURNAMENT_REWARD: "Несобранная награда за Турнир Стихий",
      EMERALDS: "изумрудов",
      PASS_THE_TOWER: "Пройти Башню",
      ASSEMBLE_OUTLAND: "Собрать {count} сундука в Запределье",
      CHECK_EXPEDITIONS: "Проверить Экспедиции",
      CHECK_SEER: "Проверить Провидца",
      COLLECT_MAIL: "Собрать почту",
      COMPLETE_DAILY_QUESTS: "Сделать ежедневные квесты",
      COLLECT_DAILY_REWARDS: "Собрать ежедневные награды",
      COLLECT_QUEST_REWARDS: "Собрать награды за квесты",
      COMPLETE_TOE: "Пройти Турнир Стихий",
      COMPLETE_DUNGEON: "Пройти Подземелье",
      MAKE_A_SYNC: "Сделать синхронизацию",
      RELOAD_GAME: "Перезагрузить игру",
      ENTER_THE_PATH: "Введите путь приключения через запятые\nИли выберите один из готовых маршрутов",
      ALL_WAY_SAVED: "Все пути для текущего приключения сохранены",
      NOT_ENOUGH_EMERALDS: "Недостаточно изумрудов, нужно {price}, а у Вас {currentStarMoney}",
      AND: " и ",
      HP: "хп",
      ENRG: "эн",
      HACK_BATTLE_WARNING: "<span style=\"color:red;\">Внимание! Реплей улучшенного боя может не соответствовать реальному результату этого боя.\nМы не несем никакой ответственности за последствия использования этой функции!</span>\nВключить улучшение боя?",
      FOR_USE_ACCESS: "Для использования \"{function}\"\nактивируйте доступ: ",
      AUTO_RELOAD: "Автоматического перезапуска",
      BEST_TEAM_RATING: "Рейтинга лучших команд",
      CHECK_DEF_TOE: "Проверки Защиты в Турнире Стихий",
      FOR_DEF: " для Защиты",
      FOR_ATT: " для Атаки",
      ORDER_GA_CHANGE: "Порядок команд защиты на ГА изменен",
      RIVAL_COSMIC_BATTLE: "Соперник Вселенской битвы:",
      PRECALC_STOPPED: "Предрасчет был остановлен 😢",
      THANKS_FOR_WAIT: "Спасибо за ожидание!\nСтатистика успешно сохранена 😊",
      PLEASE_WAIT_CALC: "Выполняется предрасчет для статистики Вселенской Битвы\nПожалуйста, дождитесь окончания всех вычислений\n\nОсталось <span style=\"color:green;\">{count} боев</span> в журнале\n\nЕсли ожидание слишком долгое - нажмите здесь, чтобы остановить!",
      SCRIPT_UPDATE: "Новая версия: {version}\n\n<a href=\"https://hw-script.goodwin.best/updates/HW-Goodwin.user.js\" target=\"_blank\">Обновить скрипт</a>\n\n<a href=\"https://t.me/HW_Goodwin/7\" target=\"_blank\">Узнать об изменениях</a>",
      DO_YOU_WANT: "Вы действительно хотите это сделать?",
      YES_RUN: "Да, запустить",
      END_BATTLE: "Завершить бой",
      END_BATTLE_TITLE: "Сохранить результат текущего боя ничего не меняя",
      BTN_AUTO_F5_TITLE: "Перезапускает бой для получения результата авто-боя",
      BTN_CANCEL_TITLE: "Отменяет результат текущего боя",
      BTN_AUTO_TITLE: "Запускает авто-атаку текущего боя до победы или до указанного % оставшегося здоровья",
      BTN_IMPROVED: "Улучшить результат",
      BTN_IMPROVED_TITLE: "⚠️⚠️⚠️ВНИМАНИЕ!⚠️⚠️⚠️\nРеплей по улучшенному результату может не соответствовать вашему урону\nМы не несем никакой ответственности за возможные последствия!",
      LOST_TIME: "Осталось времени: ",
      MANUAL_RESULT: "Результат ручного боя: ",
      USE_CARD_LOG: "Использована 1 карта предсказаний. Осталось {countCard} карт",
      NEED_WAIT_LOG: "Бой длился: {time} сек, необходимо подождать: {timer} сек",
      WAIT_DELAY_LOG: "Необходимо подождать: {delay} сек",
      SAVE_BATTLE: "Сохранить бой",
      SAVE_BATTLE_TITLE: "Для выполнения ежедневных заданий может быть полезно сохранить бой,\nно для этого потребуется ожидать таймер до его завершения",
      RETREAT: "Отступить",
      TRAINING_NOT_REPLAY: "Добивание и тренировочные бои недоступны, отсутствует информация о команде защиты",
      TRAINING_BATTLE_TYPE: "Добивание недоступно для этого типа боя: ",
      MAY_TRAINING: "Можно провести тренировку в чате Гильдии!",
      GENERAL: "Общий",
      STATS_COUNT_BATTLE: "Статистика на основе {count} боев:",
      BEST: "Лучший",
      AVR: "Средний",
      BAD: "Худший",
      AUTO_DMG: "Урон на авто: {damage}, {endTime}",
      AUTO_RESULT: "Результат боя на авто:\n{result} в {endTime}, {winRate}% побед!",
      WIN_RATE: "% побед",
      BEST_STAT_ASGARD: "Ваш урон:       {startDamage}\nЛучший урон: {bestDamage}\n",
      BEST_STAT_BATTLE: "Ваш бой:       {startState}\nЛучший бой: {bestState}\n",
      BEST_STAT_INFO: "Лучший момент: {moment} сек.\nНайден за {count} тестов",
      LAST_STAT_ASGARD: "Последний урон: {damage}\n",
      LAST_STAT_BATTLE: "Последний бой: {state}\n",
      LAST_STAT_INFO: "Последний момент: {moment} сек.\nПроведено {count} тестов\nОсталось времени: {time}",
      BACK: "Назад",
      BACK_TITLE: "Возвращает в предыдущее меню",
      DEF_PET: "Учитывать питомцев в ЗАЩИТЕ",
      DEF_PET_TITLE: "Учитывает расстановку питомцев у команд защиты в Рейтинге\nИ предлагает варианты команд с конкретной расстановкой питомцев\nКогда выключено, то данные по одинаковым командам с разными питомцами будут суммироваться",
      OTHER_PLAT: "Другие платформы",
      OTHER_PLAT_TITLE: "Если включено, то Рейтинг будет отображаться\nи по всем остальным платформам игры",
      DEF: "Защиты",
      ATT: "Нападения",
      EBR_TAB_TITLE: "Лучшие команды {teamType} для Вселенской Битвы в: {platforms}",
      EBR_TEAMS_COUNT: "Всего известно: <span style=\"color:green;\">{baseCount}</span> команд, с текущими настройками выбрано: <span style=\"color:red;\">{selectCount}</span> команд, отображается <span style=\"color:green;\">{bestCount}</span> лучших",
      HERO_TEAMS: "Команды героев",
      EBR_LEGEND: "Вся статистика собрана по командам с общей мощью более 900К",
      EBR_LEGEND_WR_DEF: "WR - Шанс отразить атаку этой командой в %",
      EBR_LEGEND_WR_ATT: "WR - Шанс победить команду текущего соперника в %",
      EBR_LEGEND_CB: "CB - Количество проведенных боев",
      EBR_LEGEND_DF: "DF - Количество различных Атакующих команд по которым собрана статистика этой команды",
      SHOW: "Показать",
      NEXT: "Далее",
      DEFAULT: "По умолчанию",
      ON_ALL: "Выбрать все",
      OFF_ALL: "Сбросить все",
      ADD_SETTING: "Укажите дополнительные настройки:",
      SELECT_HEROES: "Выберите героев, которых хотите использовать:",
      COUNT_BEST: "кол-во лучших",
      COUNT_SHOW_BEST: "Количество отображаемых лучших команд",
      MIN_CB: "Минимальное количество проведенных боев (CB)",
      MIN_DIFF: "Минимальное количество различных команд нападения (DF)",
      FAST_SHOW: "Показывать сразу для Соперника",
      FAST_SHOW_TITLE: "Если включено, то при смене соперника\nБудет сразу отображаться известная для него статистика лучших атакующих команд\nС текущими настройками выбранных героев и количества боев",
      VS_TEAM: "Против команды",
      NO_RIVAL_DATA: "Нет данных по текущему сопернику",
      NO_TEAM_DATA: "Нет данных для этой команды",
      OTHER_PET_DATA: " с такими питомцами 😢\nНо есть варианты с другими покровителями!",
      OTHER_SETTING_DATA: " c выбранными настройками и героями 😢\nНо есть варианты с другими настройками и героями!",
      OTHER_PLAT_DATA: " на вашей платформе 😢\nВозможно есть варианты на других платформах!",
      TITAN_ARENA: "Турнир Стихий",
      TOWER: "Башня",
      BATTLES: "Бои",
      CLEAR_STORAGE: "Возможно очистка локального\nхранилища данных решит проблему\nОчистить?",
      CLASH_WORLDS: "Столкновение Миров",
      ATTEMPTS: "Попыток",
      HEROES: "героями",
      TITANS: "титанами",
      TOE_STAGE: "Этап турнира",
      ALIVE_RIVAL: "Живые противники",
      VS_BOSS: "Против Босса",
      VS_MINIONS: "против Прислужников",
      EXCHANGE_HONEY: "Хотите обменять все на награды?",
      COIN: "монет",
      SELECT_RECEIV: "Выберите где и\nчто собирать",
      GRAY: "Серые",
      GREEN: "Зеленые",
      BLUE: "Синие",
      PURPLE: "Фиолетовые",
      ORANGE: "Оранжевые",
      RED: "Красные",
      ARENAS: "Арены",
      GRAND_ARENAS: "Гранд Арены",
      TOWERS: "Башни",
      FRIENDS: "Дружбы",
      OUTLANDS: "Запределья",
      SOUL_STONES: "Камней душ",
      PETS: "Питомцев",
      SELECT_SHOPS: "Выберите магазины,\nгде купить души",
      NO_PRECALC_DATA: "Нет данных предрасчета",
      SET_NEED_HP: "Укажите желаемый %\nоставшегося здоровья",
      WIN_ATTEMPT: "Противник побежден за {countBattle} попыток!",
      RESULT_ATTEMPT: "Результат достигнут за {countBattle} попыток!",
      BATTLE_PROGRESS: "Проведено боев: {countBattle}\nЛучший результат: {bestCoeff}%",
      CLICK_TO_STOP: "Нажмите, чтобы <span style=\"color:red;\">остановить</span>",
      IN_ADVENTURE: "в приключении",
      SELECT_QUEST: "Выберите какие квесты\nдолжны выполняться:",
      SAVE: "Сохранить",
      RUN_ACTIONS: "Выполнить следующие действия?",
      SETTING_QUEST: "⚙️Настроить квесты",
      SETTING_QUEST_TITLE: "Выбрать какие ежедневные квесты должны выполняться в \"Сделать все\"",
      OTHER_WAY: "Начать по другому пути",
      WAY_NUMBER: "Начать по пути №",
      COUNT_BATTLE: "кол-во боев",
      SEER_COUNT_OPEN: "Астральный провидец открыт {count} раз",
      BTN_CONTINUE: "Продолжить",
      BTN_STOP: "Остановиться",
      NO_CONNECT_SERVER: "Нет связи с сервером скрипта!\nУмный подбор команд недоступен",
      ACTIVATE_ACCESS: "Активируйте доступ",
      FOR_MORE_TIT: "чтобы набирать больше титанита",
      FOR_UNLIM_TIT: "чтобы набирать титанит без ограничений",
      SMART_SELECT: "с умным подбором команд",
      CONTINUE_WARN_DUNGEON: "Продолжить подземелье без подбора?\nТитаны могут быстро погибнуть!",
      SERVER_CONNECT_REPEAT: "Сервер не смог ответить😢\nПопробовать еще раз?",
      SYNC: "Синхронизировать",
      SYNC_DUNGEON: "Делает синхронизацию по завершению работы Подземелья",
      MODE_DUNGEON: ["Безопасный", "Без потерь", "Без остановок"],
      SET_MODE_DUNGEON: "Укажите количество титанита\nи режим прохождения",
      RUN_DUNGEON_TITLE: "Запускает авто-прохождение подземелья в выбранном режиме",
      COUNT_TITANITE: "Количество титанита",
      COUNT_TITANITE_COMPACT: "кол-во титанита",
      DUNGEON_END_UNAVAILABLE: "Режим недоступен",
      DUNGEON_END_STOP: "Остановлено по кнопке",
      DUNGEON_END_MAY_DEAD: "Титан мог погибнуть в бою",
      DUNGEON_END_LOW_HEALTH: "У танка оставалось мало здоровья",
      DUNGEON_END_UNHEAL: "Потеря здоровья в смешанной комнате",
      DUNGEON_END_UNKNOWN: "Произошла неизвестная ошибка",
      RERUN_DUNGEON: "перезапускаем подземелье",
      DUNGEON_BATTLE_LOG: "Проведен бой: {type}, recovery = {recov}%. Тестовых боев: {countTest}. Боев подбора: {iterations}",
      DUNGEON_FIND_LOG: "Не удалось найти удачный бой из {countTest} тестовых: {attackerType}, recovery = {recov}",
      DUNGEON_CHOICE_LOG: "Выбор команды {first}|{second}: {choice}. Тестовых боев: {count}",
      NO_DONE: "не сделан",
      START_DUNGEON: "Начинаем копать: ",
      THROW_ERROR: "Произошла ошибка",
      TITANITE_COLLECT: "Набрано титанита",
      CHECK_STATE_FAIL: "Не удалось проверить состояние игровых режимов на аккаунте",
      RUN_EXPED_FAIL: "Не удалось запустить экспедиции",
      LETTER_MAIL: "Письма на почте",
      LETTER_MAIL_TITLE: "Собрать все письма на почте с выбранными ресурсами",
      QUEST_REWARDS: "Награды за квесты",
      QUEST_REWARDS_TITLE: "Собрать все награды за квесты с выбранными ресурсами",
      ENERGY_BOOST: "Ускорение энергии",
      ENERGY_BOOST_TITLE: "Когда выключено игнорирует письма и награды с ускорением энергии, иначе собирает их",
      ENERGY_OVER: "Энергия более 60",
      ENERGY_OVER_TITLE: "Когда выключено игнорирует письма и награды с энергией более 60, иначе собирает их",
      PORTAL_CHARGE: "Заряды порталов",
      PORTAL_CHARGE_TITLE: "Когда выключено игнорирует письма и награды с зарядами порталов, иначе собирает их",
      HERO_SOULS: "Души героев",
      HERO_SOULS_TITLE: "Когда выключено игнорирует письма и награды с душами героев, титанов, питомцев, иначе собирает их",
      VIP_POINTS: "Vip очки",
      VIP_POINTS_TITLE: "Когда выключено игнорирует письма и награды с Vip очками, иначе собирает их",
      COUNT_PRECALC_TITLE: "Количество боев предрасчета, результат которых определяет есть ли смысл запускать авто-атаку\nДопустимые значения от 0 до 1000\nЗначение 0 отключает предрасчет и в случае поражения сразу запускает авто-атаку",
      COUNT_ATTACK_TITLE: "Количество боев авто-атаки в приключении, если не удалось победить с 1 раза\nДопустимые значения от 0 до 1000\nЗначение 0 отключает авто-атаку и в случае поражения сразу отменяет бой и останавливает прохождение",
      WATER: "Вода  ",
      WATER_TITLE: "Атаковать Повелителя Воды",
      FIRE: "Огонь",
      FIRE_TITLE: "Атаковать Повелителя Огня",
      EARTH: "Земля",
      EARTH_TITLE: "Атаковать Повелителя Земли",
      LIMIT_POINT: "Лимит очков",
      LIMIT_POINT_TITLE: "Останавливаться после того, как набрано максимальное количество очков в сохраненном реплее для Повелителя",
      BTN_ATTACK: "Атаковать!",
      BTN_ATTACK_TITLE: "Атаковать Повелителей по реплеям либо последней командой Атаки",
      BTN_SETTING: "Настроить",
      BTN_SETTING_TITLE: "Настроить атаку Повелителей по сохраненным реплеям боев",
      SELECT_LORD_MODE: "Выберите каких повелителей атаковать\nи режим атаки",
      MODE_LORD_ATTACK: ["По реплеям", "Командой нападения"],
      WEEKS_SELECT: ["Неделя 1", "Неделя 2", "Неделя 3", "Все"],
      DAY_SELECT: ["Пн", "Вт", "Ср", "Чт", "Пт", "Все"],
      ELEMENTS_SELECT: ["Вода", "Огонь", "Земля", "Все"],
      SETTING_USER_REPLAY: "Настройка пользовательских реплеев",
      SAVE_REPLAY: "Сохранить реплеи",
      SAVE_REPLAY_TITLE: "Сохраняет ваш реплей с любым Повелителем по ссылке на этот бой, либо может сохранить выгрузку реплеев",
      UNLOAD_REPLAY: "Выгрузить реплеи",
      UNLOAD_REPLAY_TITLE: "Выводит в консоль и копирует в буфер обмена информацию обо всех сохраненных реплеях с Повелителями",
      DELETE_REPLAY: "Удалить реплеи",
      DELETE_REPLAY_TITLE: "Удаляет последние сохраненные реплеи с выбранными Повелителями и заменяет бои против них на стандартные",
      DELETE_ALL_CONFIRM: "Вы действительно хотите сбросить \nвсе реплеи с Повелителями?",
      DELETE_ALL_COMPLETE: "Все пользовательские реплеи успешно удалены и заменены на стандартные",
      DELETE_WEEK_CONFIRM: "Вы действительно хотите сбросить \nвсе реплеи на {week}?",
      DELETE_WEEK_COMPLETE: "Все пользовательские реплеи за неделю успешно удалены и заменены на стандартные",
      DELETE_DAY_CONFIRM: "Вы действительно хотите сбросить \nреплеи на {week}, {dayOfWeek}?",
      DELETE_DAY_COMPLETE: "Пользовательские реплеи за день успешно удалены и заменены на стандартные",
      DELETE_ONE_COMPLETE: "Пользовательский реплей успешно удален и заменен на стандартный",
      REPLAY_ALL_COPY: "Все реплеи скопированы",
      REPLAY_WEEK_COPY: "Реплеи за неделю скопированы",
      REPLAY_DAY_COPY: "Реплеи за день скопированы",
      REPLAY_ONE_COPY: "Реплей скопирован",
      COPY_TO_BUFFER: " в буфер обмена.\nИх можно загрузить, вставив в поле ввода кнопки \"Сохранить реплеи\"",
      INVALID_REPLAY: "Указан некорректный реплей!\nСохранять можно только реплеи с Повелителями Стихий",
      INVALID_JSON: "Указан некорректный JSON!\nЗагружайте текст, копируемый по кнопке \"Выгрузить реплеи\"",
      REPLAY_SAVED: "Реплей успешно сохранен",
      REPLAY_UPLOAD: "Все реплеи успешно загружены",
      NOT_MATCH_EXAMPLE: "Введенные данные не соответствуют примеру!",
      LORD_ATTACK_RUN: "Запущена автоатака Повелителей Стихий",
      END_DEF_BEFORE_RUN: "Перед запуском обязательно закончите бои в защите!",
      CURRENT_TEAM: "Текущая команда",
      LORD_BATTLE_LOG: "Проведен бой",
      LORD_WIN_LOG: "Побежден повелитель",
      LORD_ERROR_BATTLE_LOG: "Бой не сохранен из-за ошибки",
      LORD_LIMIT_LOG: "Набран максимум очков",
      SET_PARAMS: "Укажите количество тестовых боев\nи минимальную, максимальную мощь",
      RUN_DEF_TITLE: "Проверить количество очков Защиты для выбранной команды",
      COUNT_TEST_BATTLE: "Количество тестовых боев",
      MIN_POWER: "Минимальная мощь команд противников для теста (в тысячах)",
      MIN_POWER_COMPACT: "мин. мощь",
      MAX_POWER: "Максимальная мощь команд противников для теста (в тысячах)",
      MAX_POWER_COMPACT: "макс. мощь",
      FINAL_STATS: "Итоговая статистика:",
      BTN_SELECT: "Выбрать",
      ENTER_COUNT: "введите количество",
      TOTEMS_INFO: "Получено тотемов: <span style=\"color:white;\">{count}</span>\nДо следующего тотема: <span style=\"color:white;\">{toNext}</span> изумрудов",
      BRAWL_TEST_TEAM: "В боях гильдии можно запустить тренировку против\nСоперника <span style=\"color:red;\">{name}</span> с мощью команды <span style=\"color:white;\">{power}</span>\nДля корректных результатов выбирайте\nмакс. мощь команды нападения и режим ВГ/СМ",
      SET_NUMBER_LEVELS: "Укажите количество уровней:",
      POSSIBLE_IMPROVE_LEVELS: "Возможно улучшить только {count} уровней.<br>Улучшаем?",
      NOT_ENOUGH_RESOURECES: "Не хватает ресурсов",
      IMPROVED_LEVELS: "Улучшено уровней: {count}",
      REFRESH: "Обновлять тайник",
      REFRESH_TITLE: "Если включено, то скрипт будет автоматически обновлять тайник с ячейками в наиболее удачный для этого момент\nЕсли выключено, то открытие ячеек остановится при первой необходимости обновить тайник",
      OPEN_CACHE_PROGRESS: "Осталось ключей: {keys}\nВсего открыто: {totalOpen}\nВсего выбранных: {totalSuper}\nОбновлений тайника: {countRefresh}\n\nПрогресс тайника:\n   Открыто: {countOpen}/{maxPrize}\n   Выбранные призы: {countSuper}/{maxSuper}\n   Супер-призы: {realSuper}/3",
      RESOURCE_GET: "Получены ресурсы:",
      CACHE_PRIZE_ANSWER: "Выберите желаемые призы для поиска",
      CACHE_ANSWER: "Хотите открыть хранилище за ключи?",
      CHANGE_CACHE_PRIZE: "Настроить призы",
      MANY_EMPTY_WAY: "На пути {countEmpty} пустых точек, продолжить?",
      SUPER_TITLE: "Если включено, то скрипт будет искать этот приз, сохраняя вероятность его выпадения максимально возможной\nЕсли выключено, то данный приз будет игнорироваться скриптом, будто это обычный приз",
      OUT_KEYS: "Закончились ключи для ячеек Тайника!",
      NEED_REFRESH: "Для наилучших шансов выпадения супер-приза\nнеобходимо обновить Тайник!",
      FOR_SUPER_PRIZE_CHECK: "Для настройки призов\nАктивируйте доступ: ",
      WAY_COMPLETED: "Выбранный путь уже пройден другим игроком!",
      SERVER_NOT_CONNECT: "Не удалось получить ответ от сервера скрипта!",
      INVALID_STATS: "Не удалось получить статистику Викторины!\nПроверьте ваше соединение с сервером",
      FOUND_QUESTIONS: "Вы нашли <span style=\"color:white;\">{count}</span> новых вопросов",
      QUIZ_RATING_PLACE: "И занимаете <span style=\"color:white;\">{place}</span> место по нахождению вопросов!",
      LANG_QUIZ_RATING: "Известных вопросов на разных языках:",
      AUTO_QUIZ: "Авто-викторина",
      AUTO_QUIZ_TITLE: "Отображает статистику Викторины и позволяет запустить полностью автоматическое прохождение Викторины\nЕсли в процессе автоматического прохождения попадется вопрос на который нет ответа в базе данных, то вы сможете ответить на него самостоятельно",
      AUTO_QUIZ_RUN: "Запустить авто-прохождение Викторины?\nБилеты будут использоваться\nавтоматически пока не закончатся",
      AUTO_QUIZ_INFO: "Осталось билетов: {ticket}/{maxTicket}",
      QUIZ_STOP: "Викторина остановлена!",
      QUIZ_WRONG: "Ответ оказался неверным!",
      QUIZ_UNKNOWN: "Нет ответа на вопрос!",
      QUIZ_REFRESH_INFO: "Перезагрузите игру, чтобы\nобновить данные Викторины",
      QUIZ_COMPLETED: "Авто-викторина завершена",
      LANG: "Язык",
      LANG_QUIZ_LEGEND: "D1-3 - вопросы 1, 2 и 3 сложности\nЗа 100% взято количество известных\nвопросов на самом популярном языке",
      SHOW_TOWN: "Показать города",
      SHOW_TOWN_TITLE: "Убирает Туман Войны над Поселениями и Замками врага, чтобы сделать их более заметными на карте",
      SCOUT_ENEMY: "Разведка врага",
      SCOUT_ENEMY_TITLE: "Позволяет просматривать команды героев у врагов на любом расстоянии от вас в пределах Тумана Войны",
      CALL_PROGRESS: "Прогресс выполнения: <span style=\"color:white;\">{progress}</span>%",
      QUANTITY_CONTROL: "Контроль кол-ва",
      QUANTITY_CONTROL_TITLE: "Добавляет различные возможности для настройки количества чего-либо",
      BUY_INTERFACE: "Интерфейс выбора предметов",
      BUY_INTERFACE_TITLE: "Добавляет дополнительные 5 кнопок в игровой интерфейс выбора:\nКоличества покупаемых предметов в магазинах\nКоличества открываемых лутбоксов в инвентаре.\nКнопки увеличения количества: +10, +100\nКнопки уменьшения количества: -10, -100\nКнопка ввода любого количества с клавиатуры",
      EVOLVE_CONTROL: "Эволюция Артефактов Титанов",
      EVOLVE_CONTROL_TITLE: "Автоматически выбирает необходимое количество фрагментов для эволюции артефакта титана до следующей звезды\nЧтобы это работало заходить в окно покупки фрагментов необходимо через окно прокачки артефактов титана",
      PET_SUMMON: "Яйца Призыва Питомцев",
      TITAN_SUMMON: "Сферы Призыва Титанов",
      TITAN_ART: "Сферы Артефактов Титанов",
      HERO_ART: "Сундук Артефактов Героев",
      COUNT_OPEN_TITLE: "Позволяет указывать количество для открытия",
      EXT_CHECKED_TITLE: {
        countControl: "Настройте для чего должен\nприменяться контроль количества",
        interface: "Настройте где и как\nизменять интерфейс игры"
      },
      COUNT_PRECALC_BRAWL_TITLE: "Количество боев предрасчета перед выбором команды (от 0 до 1000)",
      MIN_WINRATE_TITLE: "Минимальный % побед в предрасчете перед нападением командой (от 0 до 100)",
      COUNT_TEST: "кол-во тестов",
      BRAWL_MODES: ["Последней командой", "Авто-подбор команды"],
      BRAWL_SELECT: "Выберите режим прохождения\nпотасовок {type}",
      TITANS: "титанов",
      HEROES: "героев",
      RUN_BRAWL_TITLE: "Запускает авто-прохождение потасовок в выбранном режиме",
      LAST_TEAM_UNKNOWN: "Неизвестна последняя команда нападения",
      EMPTY_TEAMS: "Отсутствуют команды для авто-подбора\nв Потасовках с текущим героем!",
      FEW_TEAMS: "Недостаточно команд для подбора",
      FEW_TEAMS_WARNING: "Автопотасовки могут работать плохо!\nДоступно только <span style=\"color:red;\">{count}</span> команд для подбора!\nУверены, что хотите продолжить?",
      DAILY_BRAWL_COMPLETE: "Ежедневные задания выполнены!",
      LOW_LIVE: "Осталось мало жизней!",
      LOW_LIVE_WARNING: "Осталось <span style=\"color:green;\">{attempts}</span> жизней!\nХотите продолжить?",
      LOW_WINRATE: "Низкие шансы на победу!",
      LOW_WINRATE_WARNING: "Лучший результат предрасчета <span style=\"color:green;\">{winrate}%</span> побед!\nУверены, что хотите продолжить?",
      BRAWL_PRECALC_PROGRESS: "Прогресс предрасчета:\nПроверено команд: {count}/{countTeam}\nЛучшая:      {bestWin}% побед\nПоследняя: {lastWin}% побед\nПроведено боев: {countBattle}",
      SMART_RAID_VIP5: "Необходим VIP 5+ в игре",
      SMART_RAID: "Умные рейды в кампании",
      SMART_RAID_TITLE: "Оптимизирует множественные рейды кампании, разбивая их на рейды по х10\nЧто позволяет получить больше гарантированных предметов!\nДля использования необходим VIP 5+ в игре",
      MULTI_RAID: "Мульти-рейды в кампании",
      MULTI_RAID_TITLE: "Позволяет указывать количество рейдов\nДля VIP 1-4 также активирует кнопки множественных рейдов!",
      SKIP_UPDATE: "Пропустить обновление",
      SKIP_UPDATE_TITLE: "Сообщение об обновлении скрипта больше не появится до выхода новой версии",
      UNLOCK_RAID: "Рейды для VIP0",
      UNLOCK_RAID_TITLE: "Добавляет возможность проводить одиночные рейды в кампании с VIP 0 и без Золотого Рейд-билета\nВнимание! Это может работать только по выходным и возможно не у всех\nВключите \"Показать ошибки\", чтобы узнать если рейды у вас не работают",
      GAME_LIB_ERROR: "Ошибка соединения с библиотекой игры!\n\n<a href=\"https://t.me/HW_Goodwin/831/76983\" target=\"_blank\">Инструкция по решению проблемы</a>\n",
      AUTH_ERROR: "Ошибка соединения с сервером скрипта!",
      ERROR_NEED_RELOAD: "Некоторые функции могут работать некорректно. Перезагрузите игру.\nЕсли проблема повторяется, то подождите несколько минут и попробуйте еще раз.",
      TEST_ASGARD: "Тест Асгарда",
      TEST_ASGARD_TITLE: "Позволяет запустить тестовый бой против текущего босса Асгарда с вашими текущими усилениями\nДля запуска не требуется просматривать запись боя, достаточно активировать эту функцию\nДанный тест позволяет со 100% точностью повторить условия боя при нападении на босса в его текущем состоянии",
      ALL_REWARDS: "Собрать награды",
      ALL_REWARDS_TITLE: "Собирает награды за квесты, письма, награды всех Сезонов и награды Престижа\nМожно настроить где и какие награды собирать",
      SEASON_REWARDS: "Награды Сезонов",
      SEASON_REWARDS_TITLE: "Собирает доступные награды со всех текущих сезонов",
      PRESTIGE_REWARDS: "Награды цикла Престижа",
      PRESTIGE_REWARDS_TITLE: "Собирает доступные награды за текущий цикл Престижа Гильдии",
      ZERO_LOCATION_COLLECT: "Выберите хотя бы одну из локаций для сбора наград",
      QUESTS: "за квесты",
      SEASONS: "сезонов",
      PRESTIGES: "престижа",
      PREV_LEVEL: "Предыдущий Уровень",
      PREV_LEVEL_TITLE: "Переходит к статистике Босса предыдущего уровня",
      NEXT_LEVEL: "Следующий Уровень",
      NEXT_LEVEL_TITLE: "Переходит к статистике Босса следующего уровня",
      TEAM_STATS: "Статистика команды",
      TEAM_STATS_TITLE: "Показывает статистику команды против выбранного Босса со всеми усилениями, которые были протестированы",
      ATTACK_INVASION_TITLE: "Автоматически атакует босса до Победы",
      PRECALC_INVASION_TITLE: "Рассчитывает шансы на победу в бою с текущим усилением и выбранной командой",
      BEST_AUTO_ATTACK: "Авто-атака лучшей",
      BEST_AUTO_ATTACK_TITLE: "Автоматически выбирает лучшую известную команду с текущим усилением и атакует ей Босса до победы",
      INVASION_LEGEND_BF: "BF - Усиление команды Атаки (0 - минимальное, 300 - максимальное)",
      INVASION_LEGEND_WR: "WR - Шанс победить этой командой в % (Команды без шансов на победу не отображаются)",
      INVASION_LEGEND_HP: "HP - Наименьший % оставшегося здоровья",
      INVASION_LEGEND_CB: "CB - Количество проведенных боев (777K - 777,000 боев)",
      NO_DATA_BOSS: "Для этого Босса еще нет данных 😢",
      LEVELS: "уровня",
      ACCESS_FOR_BOSS: "С доступом " + dq + " можно сразу узнать лучшую команду против любого Босса!",
      NO_TEST_SELECT_TEAM: "выбранную команду еще не тестировали",
      WITH_NOW_BUFF: "с текущим усилением",
      SELECT_TEAM_BUFF: "выбранной командой с усилением",
      WIN_CHANCE: "вероятность победы",
      CHANCE_TO_WIN: "Шанс победить",
      NOW_MOMENT: "На данный момент",
      BEST_TEAM: "лучшая команда",
      NO_WIN_TEAM: "нет победных команд",
      BEST_TEAMS_ANY_BUFF: "Лучшие команды со всеми усилениями",
      TEAM_STATS_VS_BOSS: "Статистика команды против Босса",
      BUFF_ANSWER: "Какое усиление использовать от 0 до 300?",
      SEARCH: "Поиск",
      PRECALC: "Предрасчет",
      PROGRESS: "Прогресс",
      INVASION_PROGRESS: "атаки Босса\n{bossName}\nС усилением {buff}!\nВсего: ",
      ATTACK_TIMEOUT: "Укажите максимальную задержку между боями\nДопустимые значения от 2 до 300 секунд",
      COUNT_BATTLES: "проведено {count} боев",
      BATTLES_COUNT: "боев проведено",
      HP_LEFT: "% хп осталось",
      NEW_BEST_RESULT: "Новый лучший результат: ",
      NEW_RESULT: "Новый результат: ",
      GAME_CONNECT_FAILED: "Сервер игры не отвечает",
      RESTART_BATTLE_FAILED: "Не удалось перезапустить бой",
      ATTEMPT_RESTART_BATTLE: "Ожидайте, пробуем перезапустить бой",
      FOR_AUTO_RESTART: "Для автоматического перезапуска авто-атаки активируйте\nгалочку \"Сохранять онлайн\" в \"Общих настройках скрипта\"",
      BOSS_WIN: "<span style=\"color:green;\">Босс побежден</span>",
      WIN_BOSS: "Побежден Босс",
      WAIT_END_BATTLE: "Ожидайте завершения боя",
      CALC_STATS_STOPPED: "Расчет статистики <span style=\"color:green;\">остановлен!</span>",
      BEST_TEAMS_VS_BOSS: "Лучшие команды против Босса",
      ALL_BUFFS: "Все усиления",
      ALL_BUFFS_TITLE: "Показывает лучшую команду для каждого усиления против выбранного Босса",
      SELECT_BUFF: "Выберите усиление против Босса",
      NO_FIND_WIN_TEAM: "Еще не найдено ни одной победной команды 😢",
      AUTO_IMPROVED: "Авто-улучшение боя",
      AUTO_IMPROVED_INVASION_TITLE: "Вместо ожидания между боями использует это время для улучшения последнего боя\nИспользование этой функции позволяет во много раз ускорить победу над боссом с низким шансом\nА в некоторых случаях позволит победить даже с усилением и командой у которых 0% побед\nВремя которое отводится на улучшение можно настроить максимальной задержкой",
      FOR_IMPROVED_CHECK: "Для использования улучшения боя вместе с авто-атакой босса\nАктивируйте доступ: " + dq,
      NEED_IMPROVED_CHECK: "Для использования функции активируйте\n<span style=\"color:green;\">Улучшение боя</span> в Боевых настройках",
      NOT_INFO_BEST: "С текущим усилением нет известных команд",
      KILL_SOUL_EVENT: "Убито врагов: {score}\nИспользовано героев: {countUsed}/{countHero}",
      GET_250_POINT: "Набрать 250 очков",
      GET_250_POINT_TITLE: "Проходит по 1 герою пока не наберет 250 очков для получения всех ежедневных наград",
      GET_MAX_POINT: "Потратить всех героев",
      GET_MAX_POINT_TITLE: "Проходит по 1 герою пока не использует всех героев, чтобы набрать максимум очков",
      RUN_ARCHDEMON_SOULS: "Выберите режим прохождения Горнила душ",
      GAME_INTERFACE: "Интерфейс игры",
      GAME_INTERFACE_TITLE: "Все настройки связанные с изменением визуальной части игры",
      HIDE_TUTORIAL: "Скрыть игровое обучение",
      HIDE_TUTORIAL_TITLE: "Убирает большинство обучающих подсказок в игре",
      HIDE_SERVERS: "Свернуть список серверов",
      HIDE_SERVERS_TITLE: "Скрывает лишние сервера, отображая только те, на которых вы играете",
      SHOW_ERRORS: "Отображать игровые ошибки",
      SHOW_ERRORS_TITLE: "Показывает ошибки запросов к серверу игры",
      SEASON_QUEST: "Показать 4-ое задание сезонов",
      SEASON_QUEST_TITLE: "Разблокирует отображение 4-го задания сезонов даже если у вас не куплен билет\nЗавершить его все равно не получится - игра выдаст ошибку\nНо если планируете купить билет позже, то сможете заранее выполнять это задание",
      ISLAND_FOG: "Убрать туман на карте острова",
      ISLAND_FOG_TITLE: "Убирает весь туман на карте Таинственного Острова",
      NEED_RELOAD: "Перезагрузите игру, чтобы применить изменения!",
      STAT_EBR: "Сбор статистики",
      STAT_EBR_TITLE: "Выполняет предрасчет по боям из журнала Вселенской Битвы для сбора статистики лучших команд\nОставляя настройку включенной вы помогаете составлять Рейтинг лучших команд для защиты и нападения",
      NEW_MISSION: "Миссии на выживание в кампании",
      NEW_MISSION_TITLE: "Разблокирует для повторного прохождения 2 миссии на выживание в кампании:\nЦистерна в 14 главе\nПристанище Духов Стихий в 15 главе",
      BLOCK_TRACKING: "Запретить слежку",
      BLOCK_TRACKING_TITLE: "Блокирует большинство нежелательных запросов\nC информацией о действиях пользователя в игре",
      BLOCK_TRACKING_INFO: "\n\nВсего заблокировано: {allBlocked} запросов\nЗа текущую сессию:    {nowBlocked} запросов",
      BLOCK_TRACKING_WARNING: "<span style=\"color:red;\">Внимание! Функция экспериментальная и последствия ее использования неизвестны!</span>\n\nБлокирует большинство запросов, собирающих информацию о ваших действиях в игре.\nЭто позволит уменьшить сетевой трафик и ускорить загрузку игры!\n\nВключить блокировку отслеживания?",
      CASTLE_UPGRADE: "Замок Территории Завоеваний",
      CASTLE_UPGRADE_TITLE: "Позволяет указывать точное количество Монет Превосходства, которое будет потрачено на улучшение Замка Гильдии в Территории Завоеваний",
      AFTER_INVALID_BATTLE: "Результат не был засчитан!\nСервер игры сохранил бой на авто.",
      PASS_THE_TOWER_TITLE: "Автоматически проходит башню или собирает все бесплатные награды в ней на 130 уровне",
      ASSEMBLE_OUTLAND_3_TITLE: "Собирает 3 бесплатных сундука в Запределье",
      ASSEMBLE_OUTLAND_12_TITLE: "Собирает 3 бесплатных, а также 6 платных сундуков по {price} изумрудов и 3 подарочных сундука",
      ASSEMBLE_OUTLAND_21_TITLE: "Собирает 3 бесплатных, а также 6 платных сундуков по {firstPrice} изумрудов и 6 платных сундуков по {secondPrice} изумрудов и 6 подарочных сундуков",
      CHECK_EXPEDITIONS_TITLE: "Проверяет и при необходимости запускает экспедиции или собирает награды за их выполнение",
      CHECK_SEER_TITLE: "Проверяет и при необходимости расходует попытки Астрального Провидца\nС понедельника по субботу расходуется 1 попытка, если их 7/7\nВ воскресенье квест \"Воспользуйся Астральным Провидением\" выполняется полностью на 5/5",
      All_RAID_ADVENTURE_TITLE: "Выполнить рейд приключения на все оставшиеся заряды порталов",
      COLLECT_MAIL_TITLE: "Собирает всю почту, кроме писем с энергией, душами и зарядами порталов",
      COMPLETE_DAILY_QUESTS_TITLE: "Выполняет большую часть ежедневных заданий",
      COLLECT_DAILY_REWARDS_TITLE: "Собирает календарные награды, пасхалки, награды за подписку и прочее",
      COLLECT_QUEST_REWARDS_TITLE: "Собирает награды за выполнение всех ежедневных заданий и заданий ивентов",
      COMPLETE_TOE_TITLE: "Проходит Турнир Стихий той командой, которая последней стояла в Атаке в Турнире",
      COMPLETE_DUNGEON_TITLE: "Фармит подземелье пока не наберет указанное количество титанита",
      MAKE_A_SYNC_TITLE: "Синхронизирует большую часть игровых данных, чтобы не перезагружать игру",
      RELOAD_GAME_TITLE: "Если синхронизации недостаточно, то лучше использовать перезагрузку",
      INVENTORY_LOOTBOX: "Шкатулки и Матрешки в инвентаре🆕",
      INVENTORY_LOOTBOX_TITLE: "Позволяет указывать количество открываемых Шкатулок и Матрешек в инвентаре для которых нет выбора количества",
      INVENTORY_DOOL: "Рекурсивное открытие Матрешек🆕",
      INVENTORY_DOOL_TITLE: "Позволяет рекурсивно открывать любые матрешки пока они не закончатся",
      SUMMARY_CAMPAIGN: "Суммирование наград в кампании🆕",
      SUMMARY_CAMPAIGN_TITLE: "Объединяет все одинаковые награды полученные в рейдах и отображает их суммы в компактном виде",
      ASGARD: "Асгард",
      ASGARD_TITLE: "Быстрый переход в Асгард",
      TITAN_VALLEY: "Долина Титанов",
      TITAN_VALLEY_TITLE: "Быстрый переход к Долине Титанов",
      SANCTUARY: "Святилище",
      SANCTUARY_TITLE: "Быстрый переход к Святилищу",
      GUILD_WAR: "Война гильдий",
      GUILD_WAR_TITLE: "Быстрый переход к Войне гильдий",
      AVATAR_NAME: "Аватар",
      DELAY_INPUT: "Задержка в секундах между выполнением всех действий (запросов) скрипта\nУказывается среднее значение, а фактическое определяется случайным образом в некотором диапазоне\nДанная настройка сделает использование скрипта более безопасным,\nустраняя аномально высокую скорость отправки запросов\nНо при этом снизится скорость работы многих функций.",
      CANCEL_BATTLE: "Отмена боев",
      CANCEL_BATTLE_TITLE: "Позволяет отменять бои в случае поражения",
      AUTO_CANCEL_TITLE: "В случае поражения автоматически отменяет бои",
      EVENT_NEWS: "Конкурс ивента",
      EVENT_NEWS_TITLE: "Новости о проходящем конкурсе среди пользователей скрипта для текущего события в игре",
      EVENT_NEWS_TEXT: "Друзья!\nВ нашем сообществе проходит конкурс для текущего Ивента.\nВ конкурсе разыгрываются " + dq + " и " + dy + " версии. А также уникальные доступы к тестовой версии скрипта, в которой функционал чуть шире и плановые обновления выходят раньше.\n\nПодробнее узнать о конкурсе вы можете в нашей <a href=\"https://t.me/HW_Goodwin/42806/84366\" target=\"_blank\">официальной группе в телеграмм</a>.",
      BOSS_KILL: "Кавабанга!🔥",
      BOSS_KILL_TITLE: "Нападите на главного босса в событии любой командой,\nчтобы моментально убить его с минимально возможным усилением",
      FAST_KILL: "Убить Босса",
      FAST_KILL_TITLE: "Убивает текущего Босса 1 нажатием за 1 атаку\nТребуется только купить минимальное усиление",
      KNOWN_FAST_KILL: "Прогресс проверки усилений: ",
      UKNOWN_ANY_KILL: "нет никаких данных.",
      WRONG_INPUT: "Что-то пошло не так и победить не удалось!",
      FIND_TEAM: "Поиск команды",
      FIND_TEAM_TITLE: "Запускает поиск победной команды с выбранным усилением против текущего Босса",
      TEAM_FOUND: "Победная команда найдена!",
      NOTHING_TEST: "Нечего тестировать!",
      BEST_TEAM_FOUND: "Все лучшие команды уже найдены.",
      FIND_PROGRESS: "Питомец: {pet}/{petAll}\nКоманда: {pack}/{packLast}\nПокровители: {favor}/{favorAll}\nВсего проверено: {progress}%",
      CONGRATS: "Поздравляем!!!",
      KAWABANGA_BEST_TEAM: "Вы нашли лучшую команду против Босса!",
      KAWABANGA_MANY_TEST: "Вы уже провели <span style=\"color:green;\">{count}</span> боев в Кавабанге!",
      KAWABANGA_ACCESS: "И получаете полный доступ к ✅<span style=\"color:lime;\">Кавабанге🔥</span> для прохождения главного Босса всех уровней\nна этом аккаунте!",
      KAWABANGA_BATTLE: "Вы уже провели <span style=\"color:white;\">{count}</span> боев",
      FOR_USE_KAWABANGA: "Осталось провести <span style=\"color:white;\">{kawabanga}</span> боев\n\nИли активируйте доступ <span style=\"color:green;\">VIP</span> и используйте\nвсе возможности ✅<span style=\"color:lime;\">Кавабанги🔥</span> сразу!",
      KAWABANGA_STATS: "Показать прогресс",
      KAWABANGA_STATS_TITLE: "Отображает текущий прогресс проверки выбранного босса на всех оставшихся усилениях",
      KAWABANGA_LEGEND_BUFF: "BUFF - Усиление команды Атаки (0 - 300)",
      KAWABANGA_LEGEND_TEAM: "TEAM - Кол-во команд, которые осталось проверить",
      KAWABANGA_LEGEND_PP: "PP% - Прогресс проверки выбранного босса в %",
      KAWABANGA_BOSS_PROGRESS: "Прогресс поиска команд против Босса",
      THANKS_FOR_YOU: "✅<span style=\"color:lime;\">Кавабанга🔥</span> ценит ваш вклад!",
      AUTO_SELECT: "Авто-поиск",
      AUTO_SELECT_TITLE: "Автоматически выбирает усиление для поиска и переключается на новое, когда тестировать уже нечего"
    }
  };
  let di = false;
  let ds = false;
  let dk = {};
  let dG = {};
  let dO = Object.assign(vE("blockedUrl", {
    all: 0
  }), {
    now: 0
  });
  let dR = dA[vE("language", "RU")];
  const dI = {
    open: XMLHttpRequest.prototype.open,
    send: XMLHttpRequest.prototype.send,
    setRequestHeader: XMLHttpRequest.prototype.setRequestHeader,
    SendWebSocket: WebSocket.prototype.send,
    fetch: fetch
  };
  const dK = dI;
  function dJ(yr) {
    if (yr.includes("http") && !yr.includes("hero-wars") && !yr.includes("nexters") && !yr.includes(".akamai") && !yr.includes("onesignal") && !yr.includes("graph") && !yr.includes(".fbsbx") && !yr.includes("meya.ai") && !yr.includes("hw-script.goodwin")) {
      console.log("%cUrl not blocked", "color: green", yr);
    }
  }
  function dE(yr) {
    return yr.includes("/clientStat") || yr.includes(".clarity") || yr.includes(".taboola") || yr.includes(".google") || yr.includes(".reddit") || yr.includes(".yahoo") || yr.includes(".exponea");
  }
  function da(yr, ym = true) {
    dO.all++;
    dO.now++;
    va("blockedUrl", dO);
    if (ym && p7.blockTracking.div?.title) {
      p7.blockTracking.div.title = p7.blockTracking.title + p3(dR.BLOCK_TRACKING_INFO, {
        allBlocked: dr(dO.all),
        nowBlocked: dr(dO.now)
      });
    }
  }
  this.fetch = function (yr, ym) {
    try {
      const yU = typeof yr === "string" ? yr : yr.href;
      if (yU.includes("sentry.io")) {
        da(yU, false);
        console.log(ym?.body);
        let yQ = {
          id: md5(Date.now())
        };
        let q0 = {};
        try {
          q0 = JSON.parse(ym.body);
        } catch (q3) {}
        if (q0.event_id) {
          yQ.id = q0.event_id;
        }
        const q2 = {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          },
          body: yQ
        };
        return Promise.resolve(new Response("", q2));
      }
      if (pd("blockTracking")) {
        if (dE(yU)) {
          da(yU);
          return Promise.resolve(new Response("{}", {
            status: 200,
            headers: {
              "Content-Type": "text/javascript"
            }
          }));
        } else {
          dJ(yU);
        }
      }
    } catch (q6) {
      console.log(q6);
    }
    return dK.fetch.apply(this, arguments);
  };
  const du = new TextDecoder("utf-8");
  const dP = new TextEncoder("utf-8");
  let dT = {};
  let de = "";
  let dx = "";
  setInterval(function () {
    let yr = Date.now();
    for (let ym in dT) {
      const yU = +ym.split("_")[0];
      if (yr - yU > 300000) {
        delete dT[ym];
      }
    }
  }, 300000);
  this.Send = function (yr, ym) {
    return new Promise((yU, yQ) => {
      try {
        b0(yr, yU, ym);
      } catch (q0) {
        yQ(q0);
      }
    });
  };
  this.getRequestHistory = function () {
    return dT;
  };
  function dr(yr) {
    var ym = " ";
    var yU = ".";
    var yQ = yr.toString();
    if (yU) {
      yQ = yQ.replace(".", yU);
    }
    return yQ.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ym);
  }
  function dm(yr, ym) {
    var yU = yr.reduce(function (yQ, q0) {
      yQ[q0] = true;
      return yQ;
    }, {});
    return ym.every(function (yQ) {
      return yQ in yU;
    });
  }
  function dU(yr, ym) {
    let yU = {};
    for (let yQ of Object.keys(yr)) {
      if (yQ.includes(ym)) {
        yU[yQ] = yr[yQ];
      }
    }
    return yU;
  }
  function dQ(yr) {
    let ym = document.createElement("textarea");
    ym.style.opacity = "0";
    ym.textContent = yr;
    document.body.appendChild(ym);
    ym.select();
    document.execCommand("copy");
    document.body.removeChild(ym);
    delete ym;
  }
  function p0(yr, ym, yU, yQ) {
    if (typeof yr === "string") {
      yr = yr.replace(",", ".");
    }
    let q0 = parseFloat(yr);
    if (isNaN(q0)) {
      q0 = parseFloat(yr.slice(1));
      if (isNaN(q0)) {
        q0 = ym;
      }
    }
    return Math.min(Math.max(yU, q0), yQ);
  }
  const p1 = function (yr, ym) {
    return Math.floor(yr + Math.random() * (ym - yr + 0.99999999));
  };
  Number.prototype.round = function (yr) {
    let ym = Math.pow(10, yr);
    return Math.round(this * ym) / ym;
  };
  Number.prototype.floor = function (yr) {
    let ym = Math.pow(10, yr);
    return Math.floor(this * ym) / ym;
  };
  Number.prototype.ceil = function (yr) {
    let ym = Math.pow(10, yr);
    return Math.ceil(this * ym) / ym;
  };
  String.prototype.fixed = function (yr) {
    if (this.length < yr) {
      return this + " ".repeat((yr - this.length) * 2);
    } else {
      return this;
    }
  };
  function p2(yr) {
    return vE(GM_info.script.name + ":" + yr);
  }
  function p3(yr, ym) {
    if (yr && ym) {
      return yr.sprintf(ym);
    }
    return yr || "undefined";
  }
  async function p4(yr) {
    const ym = yr + "_ext";
    const yU = vo(ym, {});
    const yQ = [];
    for (let q4 in p6[yr]) {
      let q5 = p6[yr][q4];
      const q6 = {
        name: q4,
        checked: q5.default,
        label: q5.label,
        title: q5.title,
        color: q5.color,
        action: q5.action
      };
      yQ.push(q6);
    }
    lY(yQ, yU);
    const q1 = {
      checkBoxes: yQ
    };
    let q2 = await vI.confirm(p3(dR.EXT_CHECKED_TITLE)[yr], {}, {
      buttons: [{
        isClose: true,
        result: 0
      }, {
        msg: p3(dR.SAVE),
        result: 1
      }]
    }, q1);
    const q3 = vI.getCheckBoxes();
    if (q2 == 1) {
      q3.forEach(q7 => {
        p6[yr][q7.name].checked = q7.checked;
        yU[q7.name].checked = q7.checked;
      });
    }
    vu(ym, yU);
    for (let q7 in yU) {
      if (yU[q7].checked) {
        return true;
      }
    }
    return false;
  }
  const p5 = {
    all: {
      label: p3(dR.DETAILS_ALL),
      count: 9
    },
    battle: {
      label: p3(dR.DETAILS_BATTLE),
      count: 7
    },
    eventInvasion: {
      label: p3(dR.DETAILS_EVENT),
      hidden: true,
      color: "rgb(140,250,0)",
      count: 1
    },
    eventDomination: {
      label: p3(dR.DETAILS_EVENT),
      hidden: true,
      color: "rgb(140,250,0)",
      count: 1
    },
    eventEBR: {
      label: p3(dR.DETAILS_EVENT),
      hidden: true,
      color: "rgb(140,250,0)",
      count: 1
    }
  };
  const p6 = {
    countControl: {
      smartRaid: {
        default: false,
        label: p3(dR.SMART_RAID),
        title: p3(dR.SMART_RAID_TITLE),
        action: function (yr) {
          if (yr) {
            let ym = [];
            if (!bN()) {
              ym.push(p3(dR.SMART_RAID_VIP5));
              yr = false;
            }
            if (ym.length > 0) {
              b3(ym.join("\n"), 6000);
            }
          }
          return yr;
        }
      },
      multiRaid: {
        default: true,
        label: p3(dR.MULTI_RAID),
        title: p3(dR.MULTI_RAID_TITLE)
      },
      castleUpgrade: {
        default: true,
        label: p3(dR.CASTLE_UPGRADE),
        title: p3(dR.CASTLE_UPGRADE_TITLE)
      },
      petSummon: {
        default: true,
        label: p3(dR.PET_SUMMON),
        title: p3(dR.COUNT_OPEN_TITLE)
      },
      titanSummon: {
        default: true,
        label: p3(dR.TITAN_SUMMON),
        title: p3(dR.COUNT_OPEN_TITLE)
      },
      titanArt: {
        default: true,
        label: p3(dR.TITAN_ART),
        title: p3(dR.COUNT_OPEN_TITLE)
      },
      heroArt: {
        default: true,
        label: p3(dR.HERO_ART),
        title: p3(dR.COUNT_OPEN_TITLE)
      },
      inventoryLootbox: {
        default: false,
        label: p3(dR.INVENTORY_LOOTBOX),
        title: p3(dR.INVENTORY_LOOTBOX_TITLE),
        color: "rgb(140,250,0)"
      },
      inventoryDoll: {
        default: true,
        label: p3(dR.INVENTORY_DOOL),
        title: p3(dR.INVENTORY_DOOL_TITLE),
        color: "rgb(140,250,0)"
      },
      evolve: {
        default: false,
        label: p3(dR.EVOLVE_CONTROL),
        title: p3(dR.EVOLVE_CONTROL_TITLE)
      }
    },
    interface: {
      hideServers: {
        default: true,
        label: p3(dR.HIDE_SERVERS),
        title: p3(dR.HIDE_SERVERS_TITLE)
      },
      hideTutorial: {
        default: false,
        label: p3(dR.HIDE_TUTORIAL),
        title: p3(dR.HIDE_TUTORIAL_TITLE),
        action: function (yr) {
          b3(p3(dR.NEED_RELOAD), 6000);
          return yr;
        }
      },
      seasonQuest: {
        default: false,
        label: p3(dR.SEASON_QUEST),
        title: p3(dR.SEASON_QUEST_TITLE)
      },
      islandFog: {
        default: true,
        label: p3(dR.ISLAND_FOG),
        title: p3(dR.ISLAND_FOG_TITLE),
        action: function (yr) {
          b3(p3(dR.NEED_RELOAD), 6000);
          return yr;
        }
      },
      newMission: {
        default: true,
        label: p3(dR.NEW_MISSION),
        title: p3(dR.NEW_MISSION_TITLE),
        color: "rgb(140,250,0)"
      },
      summaryCampaign: {
        default: true,
        label: p3(dR.SUMMARY_CAMPAIGN),
        title: p3(dR.SUMMARY_CAMPAIGN_TITLE),
        color: "rgb(140,250,0)"
      },
      selectItem: {
        default: true,
        label: p3(dR.BUY_INTERFACE),
        title: p3(dR.BUY_INTERFACE_TITLE)
      },
      showErrors: {
        default: true,
        label: p3(dR.SHOW_ERRORS),
        title: p3(dR.SHOW_ERRORS_TITLE)
      }
    }
  };
  const p7 = {
    unlockRaid: {
      label: p3(dR.UNLOCK_RAID),
      title: p3(dR.UNLOCK_RAID_TITLE),
      default: false,
      hidden: true,
      color: "rgb(140,250,0)"
    },
    stayOnline: {
      label: p3(dR.STAY_ONLINE),
      title: p3(dR.STAY_ONLINE_TITLE),
      default: false,
      hidden: true,
      remote: true,
      action: function (yr) {
        
        return yr;
      }
    },
    swapGrand: {
      label: p3(dR.GRAND_ARENA_DEF),
      title: p3(dR.GRAND_ARENA_DEF_TITLE),
      default: false,
      action: function (yr) {
        
        return yr;
      }
    },
    sendExpedition: {
      label: p3(dR.AUTO_EXPEDITION),
      title: p3(dR.AUTO_EXPEDITION_TITLE),
      default: false
    },
    buyInStore: {
      label: p3(dR.BUY_IN_STORE),
      title: p3(dR.BUY_IN_STORE_TITLE),
      default: false
    },
    countControl: {
      label: p3(dR.QUANTITY_CONTROL),
      title: p3(dR.QUANTITY_CONTROL_TITLE),
      default: true,
      color: "rgb(140,250,0)",
      action: async function (yr) {
        return yr && (await p4("countControl"));
      }
    },
    interface: {
      label: p3(dR.GAME_INTERFACE),
      title: p3(dR.GAME_INTERFACE_TITLE),
      default: true,
      color: "rgb(140,250,0)",
      action: async function (yr) {
        return yr && (await p4("interface"));
      }
    },
    noOfferDonat: {
      label: p3(dR.DISABLE_DONAT),
      title: p3(dR.DISABLE_DONAT_TITLE),
      default: false,
      action: function (yr) {
        b3(p3(dR.NEED_RELOAD), 6000);
        return yr;
      }
    },
    blockTracking: {
      label: p3(dR.BLOCK_TRACKING),
      title: p3(dR.BLOCK_TRACKING_TITLE),
      default: false,
      action: async function (yr) {
        return yr && (await vI.confirm(p3(dR.BLOCK_TRACKING_WARNING), {}, {
          buttons: [{
            msg: p3(dR.BTN_YES),
            result: true
          }, {
            msg: p3(dR.BTN_NO),
            result: false
          }, {
            isClose: true,
            result: false
          }]
        }));
      }
    },
    hackBattle: {
      label: p3(dR.HACK_BATTLE),
      title: p3(dR.HACK_BATTLE_TITLE),
      default: false,
      action: async function (yr) {
        return yr && (await vI.confirm(p3(dR.HACK_BATTLE_WARNING), {}, {
          buttons: [{
            msg: p3(dR.BTN_YES_I_AGREE),
            result: true
          }, {
            msg: p3(dR.BTN_NO_I_AM_AGAINST),
            result: false
          }, {
            isClose: true,
            result: false
          }]
        }));
      }
    },
    preCalcBattle: {
      label: p3(dR.BATTLE_RECALCULATION),
      title: p3(dR.BATTLE_RECALCULATION_TITLE),
      default: true
    },
    passBattle: {
      label: p3(dR.SKIP_FIGHTS),
      title: p3(dR.SKIP_FIGHTS_TITLE),
      default: false
    },
    autoBattle: {
      label: p3(dR.AUTO_BATTLE),
      title: p3(dR.AUTO_BATTLE_TITLE),
      default: false
    },
    testBattle: {
      label: p3(dR.TEST_BATTLE),
      title: p3(dR.TEST_BATTLE_TITLE),
      default: false,
      action: function (yr) {
        if (yr) {
          
          vX("finishBattle", false);
          vX("testAsgard", false);
        }
        return yr;
      }
    },
    finishBattle: {
      label: p3(dR.FINISH_BATTLE),
      title: p3(dR.FINISH_BATTLE_TITLE),
      default: false,
      action: function (yr) {
        if (yr) {
          
          vX("testBattle", false);
          vX("testAsgard", false);
        }
        return yr;
      }
    },
    testAsgard: {
      label: p3(dR.TEST_ASGARD),
      title: p3(dR.TEST_ASGARD_TITLE),
      default: false,
      action: function (yr) {
        if (yr) {
          
          vX("testBattle", false);
          vX("finishBattle", false);
        }
        return yr;
      }
    },
    invBossKill: {
      label: p3(dR.BOSS_KILL),
      title: p3(dR.BOSS_KILL_TITLE),
      default: false,
      color: "rgb(100,250,0)"
    },
    showTown: {
      label: p3(dR.SHOW_TOWN),
      title: p3(dR.SHOW_TOWN_TITLE),
      default: true
    },
    statEBR: {
      label: p3(dR.STAT_EBR),
      title: p3(dR.STAT_EBR_TITLE),
      default: true
    }
  };
  function p8(yr) {
    return p7[yr]?.cbox?.checked ?? p2(yr) ?? p7[yr]?.default ?? false;
  }
  function p9(yr, ym) {
    return p6[yr]?.[ym]?.checked ?? p2(yr + "_ext")?.[ym]?.checked ?? p6[yr]?.[ym]?.default ?? false;
  }
  function pd(yr) {
    const ym = yr.split(".");
    const yU = ym[0];
    const yQ = ym[1];
    if (yQ) {
      return p8(yU) && p9(yU, yQ);
    } else {
      return p8(yr);
    }
  }
  let pp = {
    countBattle: {
      input: null,
      title: p3(dR.NUMBER_OF_TEST),
      pattern: "{value}",
      default: 10,
      min: 1,
      max: 10000,
      func: function () {}
    },
    speedBattle: {
      input: null,
      title: p3(dR.COMBAT_SPEED),
      pattern: "x{value}",
      default: 5,
      min: 0.01,
      max: 100,
      func: function () {}
    },
    interfaceSize: {
      input: null,
      title: p3(dR.INTERFACE_SCALE),
      pattern: "{value}%",
      default: 100,
      min: 25,
      max: 250,
      func: vS
    },
    FPS: {
      input: null,
      title: p3(dR.FPS_INPUT),
      pattern: "{value} FPS",
      default: 300,
      min: 1,
      max: 300,
      func: vt
    },
    delay: {
      input: null,
      title: p3(dR.DELAY_INPUT),
      pattern: "{value}⏳",
      default: 0,
      min: 0,
      max: 10,
      func: function () {}
    }
  };
  function pz(yr) {
    return vm.get(yr, pp[yr].default);
  }
  const pl = {
    titanDef: {
      name: p3(dR.TOE_DEF),
      hidden: true,
      title: p3(dR.TOE_DEF_TITLE),
      color: "rgb(0,255,0)",
      func: ye
    },
    attackLord: {
      name: p3(dR.LORD_ATTACK),
      hidden: true,
      title: p3(dR.LORD_ATTACK_TITLE),
      color: "rgb(0,255,0)",
      func: yu
    },
    doYourBest: {
      name: p3(dR.TO_DO_EVERYTHING),
      title: p3(dR.TO_DO_EVERYTHING_TITLE),
      func: YW
    },
    dungeon: {
      name: p3(dR.DUNGEON),
      title: p3(dR.DUNGEON_TITLE),
      func: async function () {
        const yr = await ya();
        if (yr.show) {
          dv.showLootboxReward(yr.rewards);
        }
      }
    },
    asgard: {
      name: p3(dR.ASGARD),
      title: p3(dR.ASGARD_TITLE),
      func: function () {
        dv.goNavigator("ASGARD");
      }
    },
    titanValley: {
      name: p3(dR.TITAN_VALLEY),
      title: p3(dR.TITAN_VALLEY_TITLE),
      func: function () {
        dv.goNavigator("TITAN_VALLEY");
      }
    },
    sanctuary: {
      name: p3(dR.SANCTUARY),
      title: p3(dR.SANCTUARY_TITLE),
      func: function () {
        dv.goNavigator("SANCTUARY");
      }
    },
    clanWar: {
      name: p3(dR.GUILD_WAR),
      title: p3(dR.GUILD_WAR_TITLE),
      func: dv.goClanWar
    },
    swapGrand: {
      name: p3(dR.SWAP_GA_DEF),
      hidden: true,
      title: p3(dR.SWAP_GA_DEF_TITLE),
      color: "rgb(0,255,0)",
      func: l4
    },
    raidNodes: {
      name: p3(dR.RAID_MINIONS),
      hidden: true,
      title: p3(dR.RAID_MINIONS_TITLE),
      color: "rgb(0,255,0)",
      func: async function () {
        let yr = [{
          name: "battleCancel",
          label: p3(dR.CANCEL_BATTLE),
          title: p3(dR.AUTO_CANCEL_TITLE),
          checked: false
        }];
        let ym = vo("raidChecked", {});
        lY(yr, ym);
        const q0 = {
          checkBoxes: yr,
          options: {
            inRow: true
          }
        };
        if (await vI.confirm(p3(dR.RUN_MINIONS), {}, {
          buttons: [{
            msg: p3(dR.BTN_RUN),
            result: 1
          }, {
            isClose: true,
            result: 0
          }]
        }, q0)) {
          vI.getCheckBoxes().forEach(q2 => {
            ym[q2.name].checked = q2.checked;
          });
          vu("raidChecked", ym);
          const q1 = await Y9(ym.battleCancel.checked);
          if (Object.keys(q1?.rewards ?? {}).length > 0) {
            dv.showLootboxReward(q1.rewards);
          }
        }
      }
    },
    adventure: {
      name: p3(dR.ADVENTURE),
      hidden: true,
      title: p3(dR.ADVENTURE_TITLE),
      color: "rgb(0,255,0)",
      func: Yf
    },
    adventureSolo: {
      name: p3(dR.STORM),
      hidden: true,
      title: p3(dR.STORM_TITLE),
      color: "rgb(0,255,0)",
      func: Yj
    },
    adventureRaid: {
      name: p3(dR.AUTO_RAID_ADVENTURE),
      hidden: true,
      title: p3(dR.AUTO_RAID_ADVENTURE_TITLE),
      color: "rgb(0,255,0)",
      func: async function () {
        bn(false);
      }
    },
    autoBrawls: {
      name: p3(dR.AUTO_BRAWL),
      hidden: true,
      title: p3(dR.AUTO_BRAWL_TITLE),
      color: "rgb(0,255,0)",
      func: yO
    },
    bossInvasionRating: {
      name: p3(dR.INVASION_RATING),
      hidden: true,
      title: p3(dR.INVASION_RATING_TITLE),
      color: "rgb(0,255,0)",
      func: yD
    },
    eventNews: {
      name: p3(dR.EVENT_NEWS),
      hidden: true,
      title: p3(dR.EVENT_NEWS_TITLE),
      color: "rgb(0,255,0)",
      func: async function () {
        vI.confirm(p3(dR.EVENT_NEWS_TEXT), {}, {
          buttons: [{
            msg: p3(dR.BTN_OK),
            result: 1
          }, {
            isClose: true,
            result: 0
          }]
        });
      }
    },
    epicBrawlDefRating: {
      name: p3(dR.EPIC_BRAWL_DEF_RATING),
      hidden: true,
      title: p3(dR.EPIC_BRAWL_DEF_RATING_TITLE),
      color: "rgb(0,255,0)",
      func: yi
    },
    epicBrawlAttRating: {
      name: p3(dR.EPIC_BRAWL_ATT_RATING),
      hidden: true,
      title: p3(dR.EPIC_BRAWL_ATT_RATING_TITLE),
      color: "rgb(0,255,0)",
      func: yG
    },
    changeMap: {
      name: p3(dR.CHANGE_MAP),
      hidden: true,
      title: p3(dR.CHANGE_MAP_TITLE),
      color: "rgb(0,255,0)",
      func: async function () {
        const yU = Object.values(dv.lib.seasonAdventure.list).filter(q0 => q0.map.cells.length > 2).map(q0 => ({
          msg: p3(dR.MAP_NUM, {
            num: q0.id
          }),
          result: q0.id
        }));
        const yQ = await vI.confirm(p3(dR.SELECT_ISLAND), {}, {
          buttons: [...yU, {
            result: false,
            isClose: true
          }],
          options: {
            inColumn: true
          }
        });
        if (yQ) {
          dv.changeIslandMap(yQ);
        }
      }
    },
    bossRatingEventSouls: {
      name: p3(dR.ARCHDEMON_SOULS),
      hidden: true,
      title: p3(dR.ARCHDEMON_SOULS_TITLE),
      color: "rgb(0,255,0)",
      func: yJ
    },
    bossRatingEvent: {
      name: p3(dR.ARCHDEMON),
      hidden: true,
      title: p3(dR.ARCHDEMON_TITLE),
      color: "rgb(0,255,0)",
      func: function () {
        lJ(p3(dR.RUN_ARCHDEMON), yK);
      }
    },
    buyHeroFragments: {
      name: p3(dR.BUY_SOULS),
      hidden: true,
      title: p3(dR.BUY_SOULS_TITLE),
      color: "rgb(0,255,0)",
      func: Y6
    },
    allRewardsFarm: {
      name: p3(dR.ALL_REWARDS),
      hidden: true,
      title: p3(dR.ALL_REWARDS_TITLE),
      color: "rgb(0,255,0)",
      func: bQ
    },
    swapHoney: {
      name: p3(dR.SWAP_HONEY),
      hidden: true,
      title: p3(dR.SWAP_HONEY_TITLE),
      color: "rgb(0,255,0)",
      func: bi
    },
    updateArtifacts: {
      name: p3(dR.ARTIFACTS_UPGRADE),
      hidden: true,
      title: p3(dR.ARTIFACTS_UPGRADE_TITLE),
      color: "rgb(0,255,0)",
      func: Yr
    },
    updateSkins: {
      name: p3(dR.SKINS_UPGRADE),
      hidden: true,
      title: p3(dR.SKINS_UPGRADE_TITLE),
      color: "rgb(0,255,0)",
      func: Ym
    },
    openCache: {
      name: p3(dR.OPEN_CACHE),
      hidden: true,
      title: p3(dR.OPEN_CACHE_TITLE),
      color: "rgb(0,255,0)",
      func: bA
    },
    autoQuiz: {
      name: p3(dR.AUTO_QUIZ),
      hidden: true,
      title: p3(dR.AUTO_QUIZ_TITLE),
      color: "rgb(0,255,0)",
      func: bG
    },
    rollAscension: {
      name: p3(dR.OPEN_SEER),
      hidden: true,
      title: p3(dR.OPEN_SEER_TITLE),
      color: "rgb(0,255,0)",
      func: bF
    }
  };
  let pv = 0;
  let pb = 130;
  let pY = {};
  let py = {};
  let pq = {};
  let pc = false;
  let pN = false;
  let pC = false;
  let pW;
  let ph = {};
  let pn;
  let pg = {};
  let pZ = [];
  let pf = {};
  let pj = "";
  let pV = "";
  let pB = {};
  let pw = null;
  let pX = true;
  let pH = null;
  let pS = {
    id: 0
  };
  let pD = null;
  let pt = 0;
  let pA = false;
  let pi = false;
  let ps = false;
  let pk = "";
  let pG = 0;
  let pF = false;
  let pL = false;
  let pO = false;
  let pR = false;
  let pI = false;
  let pK = false;
  let pJ = false;
  let pE = false;
  let pa = false;
  let po = false;
  let pu = false;
  let pP = 0;
  let pT = 0;
  let pe = 0;
  let px = {};
  let pr = {};
  let pm = {};
  let pU = {};
  let pQ = {};
  let z0 = {};
  let z1 = false;
  let z2 = false;
  let z3;
  let z4 = {};
  let z5 = {};
  let z6;
  let z7;
  let z8 = {};
  let z9 = {};
  let zd = 0;
  const zp = "EBR_";
  const zz = "invasion_boss_battle_";
  const zl = "invasion_boss_rating_";
  const zv = "kawabanga_boss_rating_";
  const zb = "auto_brawl_precalc_";
  const zY = "auto_brawl_packs_";
  const zy = "rating_asgard_boss_";
  const zq = "repley_asgard_";
  const zc = "gift_codes";
  const zN = "lord_repleys_";
  const zC = "user_settings_";
  const zW = "lord_titans";
  const zh = "titan_best_attacks";
  const zn = "titan_best_defs";
  const zg = "lord_defs_";
  const zZ = "toe_defs_";
  const zf = "toe_attacks_";
  const zj = "war_attacks_";
  const zV = "lord_attacks_";
  const zB = "available";
  const zw = "kawabanga_stats";
  function zX(yr, ym, yU, yQ) {
    if (z7[yr] && ym && yU && yQ) {
      const q0 = {
        pack: yU,
        score: ym,
        progress: yQ
      };
      z6[yr] = q0;
      console.log("Сохранен реплей для Повелителя с id = " + yr);
      return "Set";
    }
    console.log("Указаны некорректные данные для реплея c id Повелителя: " + yr);
    return null;
  }
  function zH(yr) {
    return z6[yr] || z7[yr] || null;
  }
  async function zM(yr) {
    if (yr) {
      const ym = [{
        name: "battleGetReplay",
        args: {
          id: yr.toString().slice(-19)
        },
        ident: "battleGetReplay"
      }];
      const yU = {
        calls: ym
      };
      const yQ = await dd.Send(yU);
      const q0 = yQ?.results[0]?.result?.response?.replay;
      if (q0) {
        const q1 = q0?.typeId;
        const q2 = q0?.result?.scoreAttack;
        const q3 = Object.keys(q0?.attackers);
        const q4 = {
          input: q0?.progress[0]?.attackers?.input
        };
        const q5 = {
          attackers: q4
        };
        const q6 = [q5];
        const q7 = zX(q1, q2, q3, q6);
        if (q7) {
          lM();
          return q7;
        }
      }
    }
    console.log("Указан некорректный реплей!");
    return null;
  }
  function zS(yr) {
    let ym;
    try {
      ym = JSON.parse(yr);
    } catch (yQ) {
      console.log("Возникла ошибка при чтении JSON");
      return null;
    }
    let yU = 0;
    for (let q0 in ym) {
      let q1 = ym[q0];
      let q2 = q1?.score;
      let q3 = q1?.pack;
      let q4 = q1?.progress;
      let q5 = zX(q0, q2, q3, q4);
      if (q5) {
        yU++;
      }
    }
    if (yU > 0) {
      lM();
      return "Set All";
    }
    return null;
  }
  function zD(yr) {
    if (yr) {
      delete z6[yr];
      return "Delete";
    } else {
      z6 = {};
      return "Delete All";
    }
  }
  function zt(yr, ym, yU) {
    let yQ = yr * 5 + ym + 1;
    return "-400" + (yU + 7).toString() + (yQ < 10 ? "0" + yQ : yQ.toString());
  }
  function zA(yr, ym, yU) {
    let yQ = zt(yr, ym, yU);
    return {
      [yQ]: zH(yQ)
    };
  }
  function zi(yr, ym) {
    let yU = {};
    for (let yQ = 0; yQ < 3; yQ++) {
      Object.assign(yU, zA(yr, ym, yQ));
    }
    return yU;
  }
  function zs(yr) {
    let ym = {};
    for (let yU = 0; yU < 5; yU++) {
      Object.assign(ym, zi(yr, yU));
    }
    return ym;
  }
  function zk() {
    let yr = {};
    for (let ym = 0; ym < 3; ym++) {
      Object.assign(yr, zs(ym));
    }
    return yr;
  }
  function zG(yr, ym, yU) {
    return JSON.stringify(zA(yr, ym, yU));
  }
  function zF(yr, ym) {
    return JSON.stringify(zi(yr, ym));
  }
  function zL(yr) {
    return JSON.stringify(zs(yr));
  }
  function zO() {
    return JSON.stringify(zk());
  }
  function zR(yr, ym, yU) {
    return zD(zt(yr, ym, yU));
  }
  function zI(yr, ym) {
    for (let yU = 0; yU < 3; yU++) {
      zR(yr, ym, yU);
    }
    return "Delete All";
  }
  function zK(yr, ym, yU) {
    if (zR(yr, ym, yU)) {
      lM();
    }
  }
  function zJ(yr, ym) {
    if (zI(yr, ym)) {
      lM();
    }
  }
  function zE(yr) {
    for (let ym = 0; ym < 5; ym++) {
      zI(yr, ym);
    }
    lM();
  }
  function za() {
    if (zD()) {
      lM();
    }
  }
  function zo(yr) {
    let ym = {};
    for (let yU of yr) {
      ym[yU] = z3.titan[yU];
    }
    return ym;
  }
  function zu(yr, ym) {
    let yU = 250;
    let yQ = yr[0].defenders.heroes;
    for (let q0 in yQ) {
      yU -= (yQ[q0].hp * 50 / ym[q0].hp).ceil(0);
    }
    return yU;
  }
  function zP(yr, ym) {
    let yU = 50;
    let yQ = yr[0].attackers.heroes;
    for (let q0 in yQ) {
      yU -= (yQ[q0].hp * 10 / ym[q0].hp).ceil(0);
    }
    return yU;
  }
  async function ze(yr, ym = false, yU = {
    battleData: true,
    base: true
  }) {
    return new Promise(function (yQ, q0) {
      try {
        if (ym) {
          yr.seed = (Date.now() / 1000).floor(0) - p1(0, 1000000000);
        }
        dv.BattleCalc(yr, vB(yr), yU, q1 => yQ(q1));
      } catch (q1) {
        console.log(q1);
        yQ(null);
      }
    });
  }
  function zx(yr, ym) {
    return {
      attackers: yr,
      defenders: [ym],
      effects: [],
      reward: [],
      seed: 123456789,
      startTime: (new Date().getTime() / 1000).floor(0),
      type: "titan_arena",
      typeId: "1234567",
      userId: "7654321"
    };
  }
  const zr = [4021, 4023];
  function zm(yr) {
    let ym = 1;
    for (let yU of yr) {
      if ((yU / 1000).floor(0) != 4 || zr.includes(+yU)) {
        ym *= 1000;
      }
    }
    return ym;
  }
  function zU(yr, ym, yU) {
    let yQ = zm(yr);
    let q0 = zm(ym);
    return Math.min(yU, yQ * q0 > 10000 ? 10000 : Math.max(yQ, q0));
  }
  function zQ(yr) {
    return Object.values(yr).map(ym => ym.id);
  }
  function l0(yr, ym) {
    return zU(zQ(yr.attackers), zQ(yr.defenders[0]), ym);
  }
  function l1(yr) {
    let ym = [-3, -3, -3, -2, -2];
    for (let yU of yr) {
      ym[yU.toString().slice(2, 3)]++;
    }
    return ym;
  }
  async function l2() {
    pK = true;
    pJ = true;
    return await new Promise(yr => {
      const ym = setInterval(async () => {
        if (!pI) {
          clearInterval(ym);
          yr();
        }
      }, 100);
    });
  }
  const l3 = [[0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]];
  async function l4() {
    
    const yr = ["arenaGetAll", "teamGetFavor", "team_getBanners"].map(qp => ({
      name: qp,
      args: {},
      ident: qp
    }));
    const ym = {
      calls: yr
    };
    const yU = await dd.Send(ym);
    const yQ = yU.results[0].result.response.grandHeroes;
    const q0 = yU.results[1].result.response.grand_def;
    const q1 = yU.results[2].result.response.grand_def ?? [null, null, null];
    const q2 = [];
    const q3 = [];
    const q4 = [];
    const q5 = p1(0, 4);
    const q6 = l3[q5];
    for (let qp in q6) {
      let qz = q6[qp];
      q4.push(q1[qz]);
      q2.push([]);
      for (let ql = 0; ql < yQ[qz].length; ql++) {
        let qv = yQ[qz][ql];
        if (qv?.type == "pet") {
          q3.push(qv.id);
        } else {
          q2[qp].push(qv.id);
        }
      }
    }
    const q7 = {
      heroes: q2,
      pets: q3,
      favor: q0,
      banners: q4
    };
    const q8 = {
      name: "grandSetHeroes",
      args: q7,
      ident: "grandSetHeroes"
    };
    const q9 = {
      calls: [q8]
    };
    let qd = (await dd.Send(q9)).results[0].result.response.grandHeroes;
    console.log(qd);
    b3(p3(dR.ORDER_GA_CHANGE), 5000);
  }
  function l5(yr) {
    let ym = 0;
    for (let yU in yr) {
      ym += yr[yU].power;
    }
    return ym;
  }
  let l6 = [];
  let l7 = {};
  let l8 = 0;
  let l9 = {};
  function ld() {
    let yr = vo("epicBrawlAttOptionsChecked", {});
    if (yr?.fastShow?.checked) {
      yG(true);
    }
    let ym = dv.lib.hero;
    let yU = [];
    for (let q0 in l9) {
      let q1 = l9[q0];
      let q2 = ym[q0].battleOrder;
      yU.push({
        order: q2,
        message: dv.translate("LIB_HERO_NAME_" + q0) + (q1.favorPetId ? " (" + dv.translate("LIB_HERO_NAME_" + q1.favorPetId) + ") - " : " - ") + "<span style=\"color:green;\">" + (q1.power / 1000).round(0) + "K</span>"
      });
    }
    yU.sort((q3, q4) => q3.order - q4.order);
    let yQ = p3(dR.RIVAL_COSMIC_BATTLE);
    for (let q3 of yU) {
      yQ += "\n" + q3.message;
    }
    b5(yQ);
  }
  function lp() {
    pR = true;
  }
  async function lz(yr) {
    yr.replay.progress[0].attackers.input = [];
    const ym = await lh(yr.replay, 9);
    for (let yU of ym) {
      yr.data.w += yU.result.win;
      yr.data.c++;
    }
  }
  async function ll(yr = true) {
    pO = false;
    let ym = {};
    for (let yU of l6) {
      let yQ = yU.replay.id;
      l7[yQ] = true;
      ym[yQ] = yU.data;
    }
    vu("epicBrawlReplays", l7);
    lH(ym);
    if (yr) {
      b3(p3(pR ? dR.PRECALC_STOPPED : dR.THANKS_FOR_WAIT), 7000);
    }
  }
  async function lv() {
    if (!pR && l8 < l6.length) {
      await lz(l6[l8]);
      const yr = {
        count: l6.length - ++l8
      };
      b3(p3(dR.PLEASE_WAIT_CALC, yr), 0, lp);
      setTimeout(lv, 0);
    } else {
      ll();
    }
  }
  async function lb(yr) {
    if (yr && !pO) {
      l8 = 0;
      l6 = [];
      l7 = vo("epicBrawlReplays", {});
      for (let ym of yr) {
        if (!l7[ym.id] && l5(ym.attackers) > 900000 && l5(ym.defenders[0]) > 900000) {
          let yU = yn(ym.attackers);
          let yQ = yU.hero;
          let q0 = yU.pet;
          yU = yn(ym.defenders[0]);
          let q1 = yU.hero;
          let q2 = yU.pet;
          let q3 = ym.result.win ? 1 : 0;
          let q4 = 1;
          if (q1.length == 12 && yQ.length == 12 && +q0 > 0 && +q2 > 0) {
            const q5 = {
              ahc: yQ,
              apc: q0,
              dhc: q1,
              dpc: q2,
              w: q3,
              c: q4
            };
            const q6 = {
              data: q5,
              replay: ym
            };
            l6.push(q6);
          } else {
            l7[ym.id] = true;
          }
        }
      }
      if (l6.length > 0) {
        if (pd("statEBR")) {
          pO = true;
          pR = false;
          setTimeout(lv, 0);
        } else {
          ll(false);
        }
      }
    }
  }
  function lY(yr, ym) {
    yr.forEach(yU => {
      if (!ym[yU.name]) {
        ym[yU.name] = {
          checked: yU.checked
        };
      } else {
        yU.checked = ym[yU.name].checked;
      }
    });
  }
  async function ly(yr) {
    const ym = new DecompressionStream("gzip");
    return new Response(yr.stream().pipeThrough(ym)).json();
  }
  async function lq(yr) {
    return ly(await yr.blob());
  }
  async function lc(yr) {
    const yU = new CompressionStream("gzip");
    const yQ = new Blob([JSON.stringify(yr)], {
      type: "application/json"
    });
    return new Response(yQ.stream().pipeThrough(yU));
  }
  async function lN(yr) {
    return (await lc(yr)).blob();
  }
  function lC(yr) {
    return yr.headers.get("Content-Type") == "application/json; charset=utf8";
  }
  async function lW(yr) {
    const ym = yr.length;
    if (ym <= 0) {
      return [];
    }
    return await Promise.all(yr.map(yU => ze(yU)));
  }
  async function lh(yr, ym, yU = true) {
    if (ym <= 0) {
      return [];
    }
    if (yU) {
      ym = l0(yr, ym);
    }
    const q0 = await Promise.all([...Array(ym)].map(() => ze(yr, true, {
      base: true
    })));
    for (let q1 of q0) {
      q1.battleData = yr;
    }
    return q0;
  }
  async function ln(yr, ym = [], yU = "goodwin.best") {
    const yQ = GM_info.script.version;
    const q0 = GM_info.script.name;
    const q1 = GM_info.script.author;
    const q2 = dd.NXFlashVars.uid;
    const q3 = dd.NXFlashVars.auth_key;
    const q4 = {
      auth_key: q3,
      uid: q2,
      version: yQ,
      name: q0,
      author: q1
    };
    return new Promise(async q5 => {
      fetch("https://hw-script." + yU + "/request/" + yr + ".php", {
        method: "POST",
        body: await lN([q4].concat(ym))
      }).then(q6 => lC(q6) ? q6.json() : lq(q6)).then(q6 => q5(q6)).catch(q6 => {
        console.error(q6);
        q5({
          error: true
        });
      });
    });
  }
  async function lg(yr) {
    const ym = yr.version;
    const yU = yr.changelog;
    const yQ = "skipUpdate_" + ym.slice(0, 5);
    if (GM_info.script.version < ym && !vo(yQ, false) && (await vI.confirm(p3(dR.SCRIPT_UPDATE, {
      version: ym,
      changelog: yU
    }), {}, {
      buttons: [{
        msg: p3(dR.BTN_OK),
        result: true
      }, {
        isClose: true,
        result: false
      }]
    }, {
      checkBoxes: [{
        name: "skipUpdate",
        checked: false,
        label: p3(dR.SKIP_UPDATE),
        title: p3(dR.SKIP_UPDATE_TITLE)
      }]
    }))) {
      vu(yQ, vI.getCheckBoxes()[0].checked);
    }
  }
  async function lZ() {
    dG.platform = dx;
    const yr = await ln("auth", [dG]);
    if (yr && !yr.error) {
      console.log("Script server connected");
      Object.assign(z8, yr.data);
      yr.data.script.code = new Function("rc", "mi", "ma", yr.data.script.code)(z8.gift_codes ? z8.gift_codes.split(";")[1] : "invalid", dd.NXFlashVars.uid, 5);
        console.log(z8.script.code(1));
        console.log(z8.script.code(2));
        console.log(z8.script.code(3));
        console.log(z8.script.code(0));
      lg(yr.data.script);
      return;
    }
    vI.confirm(p3(dR.AUTH_ERROR) + "\n" + p3(dR.ERROR_NEED_RELOAD), {}, {
      buttons: [{
        msg: p3(dR.BTN_OK),
        result: false
      }, {
        isClose: true,
        result: false
      }]
    });
    const yU = {
      [zc]: ""
    };
    Object.assign(z8, yU);
  }
  async function lf(yr) {
    let ym = await ln("download", [yr]);
    if (ym && !ym.error) {
      return ym.data;
    } else {
      return {};
    }
  }
  async function lj(yr) {
    let ym = await lf([yr]);
    if (ym) {
      return ym[yr];
    } else {
      return null;
    }
  }
  async function lV(yr, ym, yU) {
    const yQ = {
      teams: yr,
      factors: ym,
      powers: yU
    };
    return ln("dungeonTeams", [yQ]);
  }
  async function lB() {
    ln("upload/userData", [dG.id, z9]);
  }
  async function lw(yr) {
    ln("upload/asgardReplay", [dG, yr]);
  }
  async function lX(yr, ym) {
    ln("upload/autoBrawlPrecalc", [yr, ym]);
  }
  async function lH(yr) {
    ln("upload/EBR", [dG, dx, yr]);
  }
  async function lM() {
    ln("upload/lordReplay", [dG.id, z6]);
  }
  async function lS(yr, ym) {
    ln("upload/battleInvasion", [yr, ym]);
  }
  async function lD(yr) {
    ln("upload/invRating", [yr]);
  }
  async function lt(yr) {
    ln("upload/quiz", [yr]);
  }
  async function lA(yr) {
    ln("upload/banReport", [yr]);
  }
  async function li(yr) {
    let ym = await ln("upload/invasionResult", [yr]);
    if (ym && !ym.error && ym.data == "Kawabanga!") {
      vI.confirm(p3(dR.CONGRATS) + "\n" + p3(dR.KAWABANGA_BEST_TEAM) + "\n\n" + p3(dR.KAWABANGA_ACCESS), {}, {
        buttons: [{
          msg: p3(dR.BTN_OK),
          result: false
        }, {
          isClose: true,
          result: false
        }]
      });
    }
  }
  async function ls(yr, ym) {
    let yU = await ln("upload/kawabanga", [yr, ym]);
    if (yU && !yU.error) {
      let yQ = yU.data;
      if (yQ?.kawabanga) {
        vI.confirm(p3(dR.CONGRATS) + "\n" + p3(dR.KAWABANGA_MANY_TEST, {
          count: dr(yQ.kawabanga)
        }) + "\n\n" + p3(dR.KAWABANGA_ACCESS), {}, {
          buttons: [{
            msg: p3(dR.BTN_OK),
            result: false
          }, {
            isClose: true,
            result: false
          }]
        });
      }
      return yQ?.test;
    } else {
      return null;
    }
  }
  async function lk(yr, ym, yU, yQ) {
    let q0 = "kawabanga_" + yr + "_" + ym + "_" + yU + "_" + yQ;
    if (!(q0 in z8)) {
      const q1 = {
        id: yr,
        seed: ym,
        lvl: yU,
        buff: yQ
      };
      let q2 = await ln("kawabangaKill", [q1]);
      z8[q0] = q2 && !q2.error ? q2.data : null;
    }
    return z8[q0];
  }
  async function lG() {
    if (Date.now() - zd > 5000000 || !z8[zw]) {
      let yr = await ln("kawabangaStats");
      z8[zw] = yr && !yr.error ? yr.data : null;
      zd = Date.now();
    }
    return z8[zw];
  }
  function lF(yr) {
    if (!z8[zw][yr]) {
      z8[zw][yr] = {};
    }
    for (let ym = 0; ym <= 300; ym += 5) {
      if (!z8[zw][yr][ym]) {
        z8[zw][yr][ym] = {
          possible: 0,
          percent: 0,
          team: 55385
        };
      }
    }
  }
  async function lL(yr) {
    let ym = await ln("getQuiz", [yr]);
    if (ym && !ym.error) {
      return ym.data;
    } else {
      return {
        id: 0,
        error: true
      };
    }
  }
  async function lO() {
    let yr = await ln("getImp");
    if (yr && !yr.error) {
      return yr.data;
    } else {
      return {
        valid: false
      };
    }
  }
  async function lR() {
    return await ln("getStatsQuiz");
  }
  function lI(yr) {
    if (typeof yr == "string") {
      yr = JSON.parse(yr);
    }
    if (yr?.error) {
      console.warn(yr.error);
      return false;
    }
    return yr;
  }
  async function lK(yr) {
    const ym = await lW([yr]);
    return ym[0];
  }
  function lJ(yr, ym, yU) {
    let yQ = [];
    yr = yr || p3(dR.DO_YOU_WANT);
    yU = yU || (() => {});
    if (ym) {
      yQ = [{
        msg: p3(dR.YES_RUN),
        result: true
      }, {
        msg: p3(dR.BTN_CANCEL),
        result: false
      }];
    } else {
      ym = () => {};
      yQ = [{
        msg: p3(dR.BTN_OK),
        result: true
      }];
    }
    const q0 = {
      buttons: yQ
    };
    vI.confirm(yr, {}, q0).then(q1 => {
      if (q1) {
        ym();
      } else {
        yU();
      }
    });
  }
  WebSocket.prototype.send = function (yr) {
    if (!this.isSetOnMessage) {
      const ym = this.onmessage;
      if (ym) {
        this.onmessage = function (yU) {
          try {
            const yQ = JSON.parse(yU.data);
            if (!this.isWebSocketLogin && yQ.result.type == "iframeEvent.login") {
              this.isWebSocketLogin = true;
            } else if (yQ.result.type == "iframeEvent.login") {
              return;
            }
          } catch (q0) {}
          return ym.apply(this, arguments);
        };
        this.isSetOnMessage = true;
      }
    }
    dK.SendWebSocket.call(this, yr);
  };
  XMLHttpRequest.prototype.open = function (yr, ym, yU, yQ, q0) {
    this.uniqid = Date.now() + "_" + p1(1000000, 10000000);
    this.errorRequest = false;
    if (yr == "POST" && ym.includes(".nextersglobal.com/api/") && /api\/$/.test(ym)) {
      if (!de) {
        de = ym;
        const q2 = /heroes-(.+?)\./.exec(de);
        dx = q2[1];
      }
      const q1 = {
        method: yr,
        url: ym,
        error: [],
        headers: {},
        request: null,
        response: null,
        signature: [],
        calls: {}
      };
      dT[this.uniqid] = q1;
    } else if (ym.includes("error.nextersglobal.com")) {
      this.errorRequest = true;
      da(ym, false);
    } else if (pd("blockTracking")) {
      if (dE(ym)) {
        this.errorRequest = true;
        da(ym);
      } else {
        dJ(ym);
      }
    }
    return dK.open.call(this, yr, ym, yU, yQ, q0);
  };
  XMLHttpRequest.prototype.setRequestHeader = function (yr, ym, yU) {
    if (this.uniqid in dT) {
      dT[this.uniqid].headers[yr] = ym;
    } else {
      yU = true;
    }
    if (yr == "X-Auth-Signature") {
      dT[this.uniqid].signature.push(ym);
      if (!yU) {
        return;
      }
    }
    return dK.setRequestHeader.call(this, yr, ym);
  };
  XMLHttpRequest.prototype.send = async function (yr) {
    if (this.uniqid in dT) {
      let ym = null;
      if (vw(yr) == "ArrayBuffer") {
        ym = du.decode(yr);
      } else {
        ym = yr;
      }
      dT[this.uniqid].request = ym;
      let yU = dT[this.uniqid].headers;
      dk = Object.assign({}, yU);
      if (!di && yU["X-Request-Id"] > 2) {
        di = true;
        vR();
        await lZ();
        vO();
        if (ds) {
          setTimeout(vM, 200);
        } else {
          vI.confirm(p3(dR.GAME_LIB_ERROR) + "\n" + p3(dR.ERROR_NEED_RELOAD), {}, {
            buttons: [{
              msg: p3(dR.BTN_OK),
              result: false
            }, {
              isClose: true,
              result: false
            }]
          });
        }
      }
      yr = await v1.call(this, yr, ym);
      const yQ = this.onreadystatechange;
      this.onreadystatechange = async function (q1) {
        if (this.errorRequest) {
          if (typeof this.onReadySuccess == "function") {
            setTimeout(this.onReadySuccess, 100);
          }
          return yQ.apply(this, arguments);
        }
        if (this.readyState == 4 && this.status == 200) {
          let q2 = this.responseType === "text" || this.responseType === "";
          let q3 = q2 ? this.responseText : this.response;
          dT[this.uniqid].response = q3;
          if (q2) {
            await v9.call(this, q3);
          }
          if (typeof this.onReadySuccess == "function") {
            setTimeout(this.onReadySuccess, 100);
          }
        }
        if (yQ) {
          return yQ.apply(this, arguments);
        }
      };
    }
    try {
      if (this.errorRequest) {
        const q1 = this.onreadystatechange;
        this.onreadystatechange = function () {
          Object.defineProperty(this, "status", {
            writable: true
          });
          this.status = 200;
          Object.defineProperty(this, "readyState", {
            writable: true
          });
          this.readyState = 4;
          Object.defineProperty(this, "responseText", {
            writable: true
          });
          this.responseText = JSON.stringify({
            result: true
          });
          return q1.apply(this, arguments);
        };
        this.onreadystatechange();
      } else {
        return dK.send.call(this, yr);
      }
    } catch (q2) {}
  };
  const lE = function (yr) {
    for (const ym in yr) {
      let yU = yr[ym];
      yU.energy = p1(1, 1000);
      if (yU.hp > 0) {
        yU.hp = p1(1, yU.hp);
      }
    }
  };
  const la = function (yr) {
    lE(yr.progress[0].attackers.heroes);
    lE(yr.progress[0].defenders.heroes);
  };
  async function lo(yr, ym = 1000000000, yU = false) {
    let q0 = await vI.confirm(p3(dR.MSG_SPECIFY_QUANT), {}, {
      buttons: [{
        msg: yU ? p3(dR.BTN_RUN) : p3(dR.BTN_OPEN),
        isInput: true,
        default: Math.min(yr, ym)
      }, {
        isClose: true,
        result: 0
      }]
    });
    return p0(q0, 0, 0, ym);
  }
  function lu(yr, ym, yU = {}) {
    const yQ = [{
      msg: p3(dR.END_BATTLE),
      title: p3(dR.END_BATTLE_TITLE),
      result: 0
    }];
    if (ym.f5) {
      yQ.push({
        msg: p3(dR.BTN_AUTO_F5),
        title: p3(dR.BTN_AUTO_F5_TITLE),
        result: 1
      });
    }
    if (ym.calc) {
      yQ.push({
        msg: p3(dR.BTN_IMPROVED),
        title: p3(dR.BTN_IMPROVED_TITLE),
        result: 2
      });
    }
    if (ym.cancel) {
      yQ.push({
        msg: p3(dR.BTN_CANCEL),
        title: p3(dR.BTN_CANCEL_TITLE),
        result: 3
      });
    }
    if (ym.auto) {
      yQ.push({
        msg: p3(dR.BTN_AUTO),
        title: p3(dR.BTN_AUTO_TITLE),
        result: 4
      });
    }
    if (yQ.length > 1) {
      const q0 = {
        isClose: true,
        result: yU.default ?? 0
      };
      if (ym.close) {
        yQ.push(q0);
      }
      const q1 = {
        buttons: yQ
      };
      return vI.confirm(yr, yU, q1);
    } else {
      return 0;
    }
  }
  function lP(yr) {
    if (yr) {
      return yr.replaceAll("‎", "").replaceAll("\"", "").replaceAll("'", "").replaceAll("?", "").replaceAll("¿", "").toLowerCase().trim();
    } else {
      return "";
    }
  }
  function lT(yr, ym) {
    return lP(yr) + (ym ? " " + ym : "");
  }
  function le(yr, ym) {
    if (ym) {
      return ym;
    } else {
      return lP(yr);
    }
  }
  function lx(yr) {
    const ym = yr?.consumable?.[81];
    if (ym) {
      pT += ym;
      console.log("Cards: " + pT);
    }
    if (Array.isArray(yr)) {
      for (let yU of yr) {
        const yQ = yU?.consumable?.[81];
        if (yQ) {
          pT += yQ;
          console.log("Cards: " + pT);
        }
      }
    }
  }
  function lr(yr) {
    const ym = dv.lib.adventure.buff;
    const yU = {};
    for (let yQ of yr) {
      yU[ym[yQ.id].effect.effect] = yQ.value;
    }
    return yU;
  }
  function lm(yr, ym, yU) {
    if (!Array.isArray(dT[yU].calls[yr])) {
      dT[yU].calls[yr] = [dT[yU].calls[yr]];
    }
    dT[yU].calls[yr].push(ym);
  }
  function lU(yr, ym) {
    let yU = 0;
    for (let yQ in yr) {
      let q0 = yr[yQ];
      for (let q1 in q0) {
        if (typeof q0[q1] == "object") {
          if (!ym[q1]) {
            ym[q1] = {};
          }
          for (let q2 in q0[q1]) {
            if (!ym[q1][q2]) {
              ym[q1][q2] = 0;
              yU++;
            }
            ym[q1][q2] += +q0[q1][q2];
          }
        } else {
          if (!ym[q1]) {
            ym[q1] = 0;
          }
          ym[q1] += +q0[q1];
        }
      }
    }
    return yU;
  }
  function lQ(yr) {
    let ym = 0;
    for (let yU in yr) {
      if (typeof yr[yU] == "object") {
        for (let yQ in yr[yU]) {
          ym++;
        }
      } else {
        ym++;
      }
    }
    return ym;
  }
  async function v0(yr, ym, yU) {
    if (yr.id == Object.values(dv.lib.invasion.boss.list).at(-1).id) {
      yr.lvl = +ym.typeId;
      yr.buff = +(ym.effects?.attackers?.percentInOutDamageModAndEnergyIncrease_any_99_100_300_99_1000_300 ?? 0);
      yr.seed = +ym.seed;
      yr.input = yU?.[0]?.attackers?.input ?? [];
      li(yr);
      if (z8[zw]) {
        if (!z8[zw][yr.lvl]) {
          z8[zw][yr.lvl] = {};
        }
        z8[zw][yr.lvl][yr.buff] = {
          possible: 1,
          percent: 100,
          team: 0
        };
      }
    }
  }
  async function v1(yr, ym) {
    try {
      let yU = false;
      let yQ = JSON.parse(ym);
      for (const q2 of yQ.calls) {
        if (!ps) {
          dT[this.uniqid].calls[q2.name] = q2.ident;
        }
        if ((q2.name == "demoBattles_endBattle" || q2.name == "chatChallengeEndBattle") && (pd("finishBattle") || pd("testBattle") || pd("testAsgard"))) {
          this.errorRequest = true;
        }
        if (q2.name == "adventureSolo_turnStartBattle" || q2.name == "bossRatingEvent_startBattle" || q2.name == "clanDomination_startBattle" || q2.name == "adventure_turnStartBattle" || q2.name == "clanRaid_startNodeBattles" || q2.name == "clanRaid_startBossBattle" || q2.name == "crossClanWar_startBattle" || q2.name == "demoBattles_startBattle" || q2.name == "titanArenaStartBattle" || q2.name == "epicBrawl_startBattle" || q2.name == "chatAcceptChallenge" || q2.name == "invasion_bossStart" || q2.name == "dungeonStartBattle" || q2.name == "brawl_startBattle" || q2.name == "towerStartBattle" || q2.name == "clanWarAttack" || q2.name == "missionStart" || q2.name == "arenaAttack" || q2.name == "grandAttack" || q2.name == "bossAttack") {
          pj = q2.name;
          pf = q2.args;
          if (pf.broadcast) {
            pf.broadcast = false;
          }
          z4 = {};
          z5 = {};
          if (pI && q2.name != "dungeonStartBattle") {
            await l2();
          }
        }
        if (q2.name == "invasion_bossStart" && pd("invBossKill") && !pF) {
          setTimeout(yH, 0, q2.args);
          this.errorRequest = true;
        }
        let q3 = false;
        let q4 = q2.name == "adventureSolo_endBattle" || q2.name == "adventure_endBattle";
        let q5 = q2.name == "demoBattles_endBattle" || q2.name == "chatChallengeEndBattle";
        let q6 = q2.name == "clanWarEndBattle" || q2.name == "crossClanWar_endBattle";
        let q7 = q2.name == "titanArenaEndBattle";
        let q8 = q2.name == "clanRaid_endBossBattle";
        let q9 = q2.name == "clanRaid_endNodeBattle";
        let qd = q2.name == "towerEndBattle";
        let qp = q2.name == "bossEndBattle";
        if (pX && (q3 || q4 || q5 || q6 || q7 || q8 || q9 || qd || qp)) {
          pV = q2.name;
          let ql = 0;
          let qv = pt + 160000 - Date.now();
          let qb = {
            isAsgard: false,
            isCancel: false,
            time: 180000
          };
          let qY;
          if (q8 || q5 && q2?.args?.progress?.[0]?.defenders?.heroes?.[1]?.extra?.damageTaken) {
            qb = {
              isAsgard: true,
              isCancel: false,
              time: 150000
            };
            b9(qv / 1000, p3(dR.LOST_TIME));
            let qq = vN(q2.args);
            let qc = z5?.best?.dmg ?? 0;
            ql = await lu(p3(dR.MSG_YOU_APPLIED, {
              damage: dr(qq)
            }), {
              f5: !q5 && qc > 0,
              calc: pd("hackBattle")
            }, {
              timeout: qv,
              default: qc > qq ? 1 : 0
            });
          } else if (qd && q2.args.result.stars < 3) {
            ql = await lu(q2.args.result.win ? dR.LOST_HEROES : dR.MSG_HAVE_BEEN_DEFEATED, {
              cancel: true,
              close: true
            }, {
              timeout: 300000,
              default: 3
            });
          } else if (!q2.args.result.win) {
            if (q6) {
              qb = {
                isAsgard: false,
                isCancel: false,
                time: 150000
              };
              const qh = {
                progress: q2.args.progress,
                battleData: pD
              };
              let qn = vb(qh);
              let qg = 100 - qn.hp - qn.enrg / 10;
              let qZ = z5.state ?? -100;
              let qf = p3(dR.MSG_HAVE_BEEN_DEFEATED);
              let qj = await vv(q2.args, pD);
              b9(qv / 1000, p3(dR.MANUAL_RESULT) + qj.result + qj.unitInfo + "\n" + p3(dR.LOST_TIME));
              const qV = {
                f5: qZ > -100
              };
              const qB = {
                timeout: qv,
                default: qZ > qg ? 1 : 0
              };
              ql = await lu(qf, qV, qB);
            } else if (q3) {
              ql = await lu(p3(dR.MSG_HAVE_BEEN_DEFEATED), {
                calc: pd("hackBattle")
              });
            } else if (q7) {
              let qw = q2.args.rivalId.slice(0, 4) == "-400";
              let qX = pd("hackBattle");
              let qH = pd("autoBattle");
              let qM = true;
              let qS = true;
              
              const qD = {
                auto: qH && qM,
                calc: qX && qM,
                autoCalc: qX && qH && qS,
                close: true
              };
              ql = await lu(dR.MSG_HAVE_BEEN_DEFEATED, qD);
            } else if (q4) {
              qb = {
                isAsgard: false,
                isCancel: true,
                time: 180000
              };
              let qA = true;
              let qi = pd("hackBattle");
              let qs = pd("autoBattle");
              if (qi && qs && !qA) {
                b5(p3(dR.FOR_USE_ACCESS, {
                  function: p3(dR.AUTO_IMPROVED)
                }) + dy, 8000);
              }
              const qk = {
                cancel: true,
                auto: qs,
                calc: qi,
                autoCalc: qi && qs && qA,
                close: true
              };
              ql = await lu(dR.MSG_HAVE_BEEN_DEFEATED, qk, {
                timeout: 300000,
                default: 3
              });
            } else if (qp) {
              let qF = pd("hackBattle");
              let qL = pd("autoBattle");
              const qO = {
                auto: qL,
                calc: qF,
                autoCalc: qF && qL,
                close: true
              };
              ql = await lu(dR.MSG_HAVE_BEEN_DEFEATED, qO);
            } else if (q9) {
              qb = {
                isAsgard: false,
                isCancel: true,
                time: 180000
              };
              ql = await lu(dR.MSG_HAVE_BEEN_DEFEATED, {
                cancel: true,
                close: true
              });
            }
          }
          pN = true;
          if (ql > 2) {
            if (qb.isCancel) {
              la(q2.args);
            } else {
              this.errorRequest = true;
            }
          }
          if (ql == 4) {
            this.onReadySuccess = Yp;
          } else if (ql == 1) {
            qY = z5.data;
          } else if (ql == 2) {
            qY = await vZ(pD, qb.isAsgard, false, q2.args, true, qb.time);
            setTimeout(b5, 0, qY.message);
            qb.window = qb.isCancel && !qY.result.win;
          }
          if (qY) {
            q2.args.result = qY.result;
            q2.args.progress[0].attackers = qY.progress[0].attackers;
            q2.args.progress[0].defenders = qY.progress[0].defenders;
            if (qb.window && (qY.damage < 20 || (await lu(p3(dR.MSG_HAVE_BEEN_DEFEATED), {
              cancel: true,
              close: true
            }, {
              timeout: 30000,
              default: 3
            })))) {
              la(q2.args);
            } else if (qp && qY.result.win) {
              dv.refreshGame();
            }
          }
          yU = true;
        }
        if (q2.name == "titanEvolve" || q2.name == "titanLevelUp" || q2.name == "titanSkinUpgrade" || q2.name == "titanArtifactEvolve" || q2.name == "titanArtifactLevelUp" || q2.name == "consumableUseTitanXp" || q2.name == "titanArtifactLevelUpStarmoney") {
          pg[q2.args.titanId] = null;
        }
        if (q2.name == "titanSpiritLevelUp" || q2.name == "titanSpiritEvolve") {
          let qE = q2.args.id * 10 - 36010;
          for (let qa of [0, 1, 2, 3].map(qo => qE + qo)) {
            pg[qa] = null;
          }
        }
        if (pd("swapGrand") && q2.name == "grandAttack") {
          setTimeout(l4, 100);
        }
        if (q2.name == "dungeonEndBattle") {
          if (q2.args.isRaid && pT > 0) {
            pT--;
            const qo = {
              countCard: pT
            };
            console.log(p3(dR.USE_CARD_LOG, qo));
          } else if (!pI) {
            const qu = pD;
            if (q2.args.isRaid) {
              delete q2.args.isRaid;
              qu.progress = [{
                attackers: {
                  input: ["auto", 0, 0, "auto", 0, 0]
                }
              }];
              yU = true;
            } else {
              qu.progress = q2.args.progress;
            }
            const qP = await lK(qu);
            if (yU) {
              q2.args.progress = qP.progress;
              q2.args.result = qP.result;
            }
            let qT = qP.battleTime[0];
            let qe = (Date.now() - pt) / 1000;
            let qx = b8(qT) - qe;
            if (qx > 0) {
              console.log(p3(dR.NEED_WAIT_LOG, {
                time: qT.round(1),
                timer: qx.round(1)
              }));
              await b9(qx);
            }
          }
        }
        if (pD && q2.name == "missionEnd") {
          pD.progress = q2.args.progress;
          pD.result = q2.args.result;
          let qU = await lK(pD);
          let qQ = qU.battleTime.reduce((c2, c3) => c2 + b8(c3), 0);
          let c0 = qQ - (Date.now() - pt) / 1000;
          let c1 = true;
          pD = null;
          if (c0 > 0 && !q2.args.result.win) {
            b9(c0);
            const c2 = {
              timeout: c0 * 1000,
              default: false
            };
            if (await vI.confirm(p3(dR.MSG_HAVE_BEEN_DEFEATED), c2, {
              buttons: [{
                msg: p3(dR.SAVE_BATTLE),
                title: p3(dR.SAVE_BATTLE_TITLE),
                result: false
              }, {
                msg: p3(dR.RETREAT),
                title: p3(dR.RETREAT_TITLE),
                result: true
              }, {
                isClose: true,
                result: true
              }]
            })) {
              pN = true;
              c1 = false;
            }
            c0 = qQ - (Date.now() - pt) / 1000;
          }
          if (c1) {
            if (c0 > 0) {
              await b9(c0);
            }
          } else {
            this.errorRequest = true;
          }
        }
        if (!pF && q2.name == "invasion_bossEnd") {
          if (q2.args.result.win) {
            v0(pf, pD, q2.args.progress);
            pD.progress = q2.args.progress;
            pD.result = q2.args.result;
            let c4 = await lK(pD);
            let c5 = c4.battleTime.reduce((c6, c7) => c6 + b8(c7), 0) - (Date.now() - pt) / 1000;
            if (c5 > 0) {
              await b9(c5);
            }
          } else {
            this.errorRequest = true;
          }
        }
        if (pd("autoBattle") && q2.name == "missionEnd") {
          if (!pi && q2.args.result.win) {
            let c6 = vo("countRepeatMission", 100);
            c6 = p0(await vI.confirm(p3(dR.MSG_REPEAT_MISSION), {}, {
              buttons: [{
                msg: p3(dR.BTN_REPEAT),
                isInput: true,
                default: c6
              }, {
                isClose: true,
                result: 0
              }]
            }), 0, 0, 10000);
            if (c6 > 0) {
              vu("countRepeatMission", c6);
              setTimeout(async () => {
                pA = false;
                pi = true;
                const c8 = {
                  id: q2.args.id,
                  result: q2.args.result,
                  heroes: q2.args.progress[0].attackers.heroes,
                  count: 0,
                  countRepeatMission: c6,
                  rewards: {}
                };
                Y8(c8);
              }, 0);
            }
          }
        }
        if (q2.name == "quizGetNewQuestion") {
          const c8 = {
            lang: q2.args.locale
          };
          pH = c8;
        }
        if (q2.name == "quizAnswer") {
          if (pS.id > 0) {
            q2.args.answerId = pS.id;
            yU = true;
          }
        }
        if (q2.name == "clanCastle_upgrade") {
          if (q2.args.amount <= 0) {
            this.errorRequest = true;
          }
        }
        if (!q2.args.paid && !pC && !yU && (q2.name == "pet_chestOpen" && pd("countControl.petSummon") || q2.name == "titanUseSummonCircle" && pd("countControl.titanSummon"))) {
          const c9 = q2.args.amount;
          q2.args.amount = await lo(1);
          if (q2.args.amount > 0) {
            const cz = q2.name == "pet_chestOpen" ? {
              id: 90,
              type: "consumable"
            } : {
              id: 13,
              type: "coin"
            };
            const cl = {
              [cz.type]: {
                [cz.id]: c9 - q2.args.amount
              }
            };
            dv.updateInventory(cl);
            yU = true;
          } else {
            this.errorRequest = true;
          }
        }
        if (q2.args.free && !pC && !yU && (q2.name == "artifactChestOpen" && pd("countControl.heroArt") || q2.name == "titanArtifactChestOpen" && pd("countControl.titanArt"))) {
          pk = q2.name;
          let cv = q2.args.amount;
          let cb = await lo(1);
          if (cb > 0) {
            let cY = cb < 10 ? 1 : 10;
            q2.args.amount = cY;
            for (let cN = cb - cY; cN > 0; cN -= cY) {
              if (cN < 10) {
                cY = 1;
              }
              const cC = q2.name + "_" + cN;
              const cW = {
                amount: cY,
                free: true
              };
              const ch = {
                name: q2.name,
                args: cW,
                ident: cC
              };
              yQ.calls.push(ch);
              lm(q2.name, cC, this.uniqid);
            }
            const cy = q2.name == "artifactChestOpen" ? 45 : 55;
            const cq = {
              [cy]: cv - cb
            };
            const cc = {
              consumable: cq
            };
            dv.updateInventory(cc);
            ps = true;
            yU = true;
          } else {
            this.errorRequest = true;
          }
        }
        if (q2.name == "missionRaid" && !yU) {
          if (q2.args.times > 1) {
            if (pI) {
              await l2();
            }
            const cn = bN();
            const cg = q2.args.times;
            const cZ = cn ? 10 : 1;
            const cf = cn ? cg >= 20 && pd("countControl.smartRaid") : pd("countControl.multiRaid");
            if (pd("interface.summaryCampaign") || cf) {
              pk = q2.name;
              ps = true;
            }
            if (cf) {
              yU = true;
              q2.args.times = cg % cZ + (cg >= cZ ? cZ : 0);
              for (let cB = q2.args.id, cw = cg - q2.args.times; cw > 0; cw -= cZ) {
                const cX = q2.name + "_" + cw;
                const cH = {
                  id: cB,
                  times: cZ
                };
                const cM = {
                  name: q2.name,
                  args: cH,
                  ident: cX
                };
                yQ.calls.push(cM);
                lm(q2.name, cX, this.uniqid);
              }
              let cj = 40 / yQ.calls.length;
              let cV = 0;
              if (cj <= 5) {
                pN = false;
                new Promise(cS => {
                  const cD = setInterval(async () => {
                    cV += cj;
                    if (pN) {
                      cV = 100;
                    }
                    b3(p3(dR.CALL_PROGRESS, {
                      progress: Math.min(100, cV.round(0))
                    }), cV >= 100 ? 3000 : 30000);
                    if (cV >= 100) {
                      pN = false;
                      clearInterval(cD);
                      cS();
                    }
                  }, 100);
                });
              }
            }
          } else if (q2.args.times < 1) {
            this.errorRequest = true;
          }
        }
        if (q2.name == "consumableUseLootBox") {
          pw = q2.args.libId;
          if (q2.args.amount <= 0) {
            this.errorRequest = true;
          }
        }
      }
      let q0 = dT[this.uniqid].headers;
      if (yU) {
        yr = JSON.stringify(yQ);
        q0["X-Auth-Signature"] = dd.getSignature(q0, yr);
      }
      let q1 = q0["X-Auth-Signature"];
      if (q1) {
        dK.setRequestHeader.call(this, "X-Auth-Signature", q1);
      }
    } catch (cS) {
      console.log("Request(send, " + this.uniqid + "):\n", yr, "Error:\n", cS);
    }
    return yr;
  }
  function v2(yr, ym) {
    return yr == ym || ym && ym.includes(yr);
  }
  function v3(yr, ym = 2) {
    return String(Math.floor(yr)).padStart(ym, "0");
  }
  function v4(yr) {
    return (yr / 86400).floor(0) + " day " + v3(yr % 86400 / 3600) + ":" + v3(yr % 3600 / 60) + ":" + v3(yr % 60);
  }
  function v5(yr, ym) {
    let yU = vE(yr, {});
    let yQ = new Date();
    let q0 = yQ.getMonth() + 1 + "." + yQ.getFullYear();
    let q1 = ("0" + yQ.getDate()).slice(-2);
    let q2 = ("0" + yQ.getHours()).slice(-2);
    if (!yU[ym]) {
      yU[ym] = {
        a: 0
      };
    }
    if (!yU[ym][q0]) {
      yU[ym][q0] = {
        a: 0
      };
    }
    if (!yU[ym][q0][q1]) {
      yU[ym][q0][q1] = {
        a: 0
      };
    }
    if (!yU[ym][q0][q1][q2]) {
      yU[ym][q0][q1][q2] = 0;
    }
    yU[ym][q0][q1][q2]++;
    yU[ym][q0][q1].a++;
    yU[ym][q0].a++;
    yU[ym].a++;
    va(yr, yU);
  }
  function v6(yr) {
    v5("log_" + dd.NXFlashVars.uid, yr);
  }
  function v7(yr) {
    v5("log_error_" + dd.NXFlashVars.uid, yr);
  }
  function v8() {
    return {
      calls: vE("log_" + dd.NXFlashVars.uid, {}),
      errors: vE("log_error_" + dd.NXFlashVars.uid, {})
    };
  }
  async function v9(yr) {
    let ym = false;
    let yU = 0;
    let yQ;
    let q0;
    try {
      q0 = dT[this.uniqid].calls;
      yQ = JSON.parse(yr);
      if (yQ.error) {
        ym = true;
        console.error(yQ.error);
        if (yQ.error.name == "AccountBan") {
          di = true;
          const q5 = yQ.error.description.until;
          const q6 = "ban_" + dd.NXFlashVars.uid + "_" + q5;
          console.log("Until the end: " + v4(q5 - yQ.date));
          if (!vE(q6, false)) {
            lA({
              banEnd: q5,
              log: v8()
            });
            va(q6, true);
          }
        } else {
          v7(yQ.error.name);
          const q7 = {
            name: yQ.error.name,
            description: yQ.error.description
          };
          if (pd("interface.showErrors")) {
            vI.confirm(p3(dR.ERROR_MSG, q7));
          }
          delete yQ.error;
          yQ.results = [];
        }
      }
      let q1 = {};
      let q2 = null;
      let q3 = 0;
      let q4 = 0;
      for (const q8 of yQ.results ?? []) {
        let q9 = q8?.result?.response;
        if (q9?.error) {
          v7((Object.entries(q0).find(qd => qd[1] == q8.ident)?.[0] ?? "") + "_" + (q9.reason ?? ""));
          console.error(q9);
          continue;
        }
        if (q9?.result?.afterInvalid) {
          vI.confirm(p3(dR.AFTER_INVALID_BATTLE), {}, {
            buttons: [{
              msg: p3(dR.BTN_OK),
              result: false
            }, {
              isClose: true,
              result: false
            }]
          });
          v7("afterInvalid_" + (Object.entries(q0).find(qp => qp[1] == q8.ident)?.[0] ?? ""));
          console.log(q9);
        }
        if (q8.ident == q0.bossAttack || q8.ident == q0.missionStart || q8.ident == q0.clanWarAttack || q8.ident == q0.brawl_startBattle || q8.ident == q0.invasion_bossStart || q8.ident == q0.dungeonStartBattle || q8.ident == q0.chatAcceptChallenge || q8.ident == q0.epicBrawl_startBattle || q8.ident == q0.titanArenaStartBattle || q8.ident == q0.demoBattles_startBattle || q8.ident == q0.crossClanWar_startBattle || q8.ident == q0.clanRaid_startBossBattle || q8.ident == q0.adventure_turnStartBattle || q8.ident == q0.adventureSolo_turnStartBattle) {
          pD = q9.battle || q9;
          pt = Date.now();
        }
        if (q8.ident == q0.adventure_start || q8.ident == q0.adventure_join || q8.ident == q0.adventure_raid) {
          px.amount--;
          bz();
        }
        if (q8.ident == q0.clanDomination_getInfo) {
          pY = q9;
        }
        if (q8.ident == q0.clanDomination_mapState) {
          let qp = {};
          for (let qz in q9.castlePositions) {
            qp[q9.castlePositions[qz]] = true;
          }
          for (let ql in q9.townPositions) {
            qp[ql] = true;
          }
          pY.view = qp;
        }
        if (q8.ident == q0.clanRaid_logBoss) {
          let qv = vo("asgardReplays", {});
          let qb = {};
          for (let qY in q9) {
            for (let qy in q9[qY]) {
              if (!qv[qy]) {
                qv[qy] = true;
                let qq = q9[qY][qy];
                let qc = qq.result.damage[1] + qq.result.damage[2];
                let qN = yh(qq.attackers);
                if (qc >= 5000000) {
                  qb[qy] = {
                    damage: qc,
                    petCode: qN.pet,
                    heroCode: qN.hero,
                    power: l5(qq.attackers),
                    bossLvl: +qq.result.level,
                    raidId: +qq.result.raidId ?? 1
                  };
                }
              }
            }
          }
          if (Object.keys(qb).length > 0) {
            vu("asgardReplays", qv);
            lw(qb);
          }
        }
        if (q8.ident == q0.registration) {
          let qC = q9.userId;
          localStorage.userId = qC;
          await vQ(qC);
        }
        if (q8.ident == q0.offerGetAll || q8.ident == q0.specialOffer_getAll) {
          let qW = (q9 ?? []).filter(qh => qh.type == "costReplace");
          for (let qh of qW) {
            let qn = qh?.offerData?.outlandChest?.discountPercent;
            if (qn) {
              Y0 = 1 - qn / 100;
            }
          }
        }
        if (pd("noOfferDonat")) {
          if (q8.ident == q0.billingGetAll) {
            q8.result.response.bundle = [];
            ym = true;
          }
          if (q8.ident == q0.bundleGetAllAvailableId) {
            q8.result.response = [];
            ym = true;
          }
          if (q8.ident == q0.offerGetAll || q8.ident == q0.specialOffer_getAll) {
            if (q9) {
              q8.result.response = q9.filter(qg => !["addBilling", "bundleCarousel"].includes(qg.type) || ["idleResource", "stagesOffer"].includes(qg.offerType) || ["sideBarIcon_tripleSkinBundle"].includes(qg.offerType));
              ym = true;
            }
          }
          if (q8.result?.bundleUpdate) {
            delete q8.result.bundleUpdate;
            ym = true;
          }
          if (q8.result?.heroesMerchant) {
            delete q8.result.heroesMerchant;
            ym = true;
          }
        }
        if (q8.ident == q0.quizGetNewQuestion) {
          let qg = "";
          pS = await vV(q9);
          if (pS.id > 0) {
            qg = p3(dR.ANSWER_KNOWN) + ": " + pS.id;
          } else {
            dQ(q9.question);
            if (pS.error) {
              qg = p3(dR.SERVER_NOT_CONNECT) + "\n" + p3(dR.ANSWER_NOT_KNOWN) + "\n" + p3(dR.QUESTION_COPY);
            } else {
              qg = p3(dR.ANSWER_NOT_KNOWN) + "\n" + p3(dR.QUESTION_COPY);
            }
          }
          b3(qg);
        }
        if (q8.ident == q0.quizAnswer) {
          const qZ = q9?.rightAnswer;
          if (pH && qZ && !pS.error && pS.id != qZ) {
            const qf = pH.answers.find(qw => +qw.id == qZ);
            const qj = le(qf.answerText, qf.answerIcon);
            const qV = lT(pH.question, pH.questionIcon);
            const qB = {
              answer: qj,
              question: qV,
              lang: pH.lang,
              diff: pH.difficulty,
              update: pS.id > 0
            };
            if (pS.id > 0) {
              const qw = pH.answers.find(qX => +qX.id == pS.id);
              qB.oldAns = le(qw.answerText, qw.answerIcon);
            }
            setTimeout(lt, 0, qB);
          }
        }
        if (q8.ident == q0.userGetInfo) {
          if (!dG?.name) {
            document.title = q9.name + (" (" + document.title + ")");
          }
          px = q9.refillable.find(qX => qX.id == 45);
          pr = q9.refillable.find(qX => qX.id == 47);
          dG = Object.assign({}, q9);
          delete dG.refillable;
          bz();
        }
        if (q8.ident == q0.chatAcceptChallenge || q8.ident == q0.demoBattles_startBattle) {
          let qX = q9.battle;
          let qH = structuredClone(qX.effects);
          if (pd("testAsgard")) {
            if (true) {
              const qM = ["clanRaid_getInfo"].map(qt => ({
                name: qt,
                args: {},
                ident: qt
              }));
              const qS = await dd.Send({
                calls: qM
              }).then(qt => qt.results[0].result.response);
              const qD = qS.stats.clanBuff.concat(Object.values(qS.buffs));
              qX.effects = {
                battleConfig: "clan_pvp",
                attackers: lr(qD)
              };
              qX.defenders[0] = qS.boss.teams[0].states[0];
              qX.type = "clan_raid";
              ym = true;
            } else {
              b3(p3(dR.FOR_USE_ACCESS, {
                function: p3(dR.TEST_ASGARD)
              }) + dy, 8000);
            }
          } else if (pd("finishBattle") || pd("testBattle")) {
            if (true) {
              if (pB.defenders) {
                qX.defenders = structuredClone(pB.defenders);
                qX.type = pB.type;
                if (pB.effects?.battleConfig) {
                  const qs = {
                    battleConfig: pB.effects?.battleConfig
                  };
                  qX.effects = qs;
                } else {
                  qX.effects = {};
                }
                qX.effects.defenders = pB.effects?.defenders;
                qX.effects.defendersBanner = pB.effects?.defendersBanner;
                if (qX.type == "clan_raid" || qX.type == "brawl") {
                  qX.effects.attackers = pB.effects?.attackers;
                  qX.effects.attackersBanner = pB.effects?.attackersBanner;
                  if (qX.type == "brawl") {
                    qX.attackers = vd(qX.attackers);
                  }
                } else {
                  qX.effects.attackers = qH?.attackers;
                  qX.effects.attackersBanner = qH?.attackersBanner;
                }
                let qt = qX.defenders[0];
                let qA = pB?.progress?.[0]?.defenders?.heroes;
                let qi = true;
                if (pd("finishBattle") && qA && Object.values(qA).filter(qk => qk.hp > 0).length > 0) {
                  for (let qk in pB.defenders[0]) {
                    if (!pB.defenders[0][qk]?.state) {
                      qi = false;
                    }
                  }
                  if (qi) {
                    for (let qG in qt) {
                      let qF = qt[qG].state;
                      let qL = qA[qG];
                      if (qL) {
                        qF.hp = qL.hp;
                        qF.energy = qL.energy;
                        qF.isDead = qL.isDead;
                      } else {
                        qF.hp = 0;
                        qF.energy = 0;
                        qF.isDead = true;
                      }
                    }
                    if (qX.type == "clan_raid") {
                      if (qt[1].state.hp == 0) {
                        qt[1] = structuredClone(qt[2]);
                        qt[2].state.hp = qt[2].state.maxHp;
                        qt[2].state.energy = 0;
                      }
                      qt[1].state.energy = 0;
                      delete qt[1].skills[2030];
                    }
                  } else {
                    b3(p3(dR.TRAINING_BATTLE_TYPE) + qX.type, 6000);
                  }
                } else {
                  for (let qO in qt) {
                    let qR = qt[qO].state;
                    if (qR) {
                      qR.hp = qR.maxHp;
                      qR.energy = 0;
                      qR.isDead = false;
                    }
                  }
                }
                ym = true;
              } else {
                b3(p3(dR.TRAINING_NOT_REPLAY), 8000);
              }
            } else {
              b3(p3(dR.FOR_USE_ACCESS, {
                function: pd("finishBattle") ? p3(dR.FINISH_BATTLE) : p3(dR.TEST_BATTLE)
              }) + dy, 8000);
            }
          }
        }
        if (pd("preCalcBattle")) {
          let qI = q9?.battle || q9?.replay || q9;
          if (qI?.type && qI?.attackers && qI?.defenders) {
            let qK;
            let qJ = yU > 0 ? 0 : pz("countBattle") - 1;
            let qE = qI.defenders[0][1]?.id ?? 0;
            if (q8.ident == q0.clanRaid_startBossBattle) {
              qK = await vh(qI, 0, true);
            } else if (qI.type.includes("clan_raid")) {
              qK = await vh(qI, qJ, qE == 2015 || qE == 2025);
            } else if (!qI.type.includes("titan_arena_def") && (q8.ident == q0.epicBrawl_startBattle || q8.ident == q0.brawl_startBattle || q8.ident == q0.invasion_bossStart || q8.ident == q0.clanWarAttack || q8.ident == q0.crossClanWar_startBattle || q8.ident == q0.adventure_turnStartBattle || q8.ident == q0.adventureSolo_turnStartBattle || q8.ident == q0.titanArenaStartBattle || q8.ident == q0.demoBattles_startBattle || q8.ident == q0.chatAcceptChallenge || q8.ident == q0.towerStartBattle || q8.ident == q0.bossAttack || q8.ident == q0.battleGetReplay)) {
              qK = await vh(qI, q8.ident == q0.invasion_bossStart && qI.seed == 8008 ? 0 : qJ);
              if (q8.ident == q0.epicBrawl_startBattle) {
                qK += "\n\n" + p3(dR.MAY_TRAINING);
              }
            }
            if (qK) {
              b3(qK);
            }
          }
        }
        if (q8.ident == q0.tutorialGetInfo && pd("interface.hideTutorial")) {
          let qa = q9.chains;
          for (let qo in qa) {
            qa[qo] = 9999;
          }
          ym = true;
        }
        if (ps && v2(q8.ident, q0[pk])) {
          if (pk == "missionRaid") {
            if (!pd("interface.summaryCampaign")) {
              if (!q1.raid) {
                q1 = {
                  "0": {},
                  raid: {}
                };
              }
              const qP = {
                raid: q9.raid
              };
              lU(qP, q1.raid);
              for (let qT = 0; q9[qT]; qT++, q4++) {
                q1[q4] = q9[qT];
              }
            } else {
              lU(q9, q1);
            }
          } else {
            let qe;
            switch (pk) {
              case "artifactChestOpen":
                qe = "chestReward";
                break;
              case "titanArtifactChestOpen":
                qe = "reward";
                break;
            }
            q3 += lU(q9[qe], q1);
            if (q3 > 20) {
              pG = 3;
            } else {
              pG = 0;
            }
          }
          if (!q8.ident.includes(pk)) {
            q2 = q8.result;
          }
        }
        if (pd("countControl.petSummon") && q8.ident == q0.pet_chestOpen) {
          const qx = q9.rewards;
          if (qx.length > 10) {
            for (const qr of qx) {
              if (qr.petCard) {
                delete qr.petCard;
              }
            }
          }
          lU(qx, q1);
          q8.result.response.rewards = [q1];
          ym = true;
        }
        if (q8.ident == q0.consumableUseLootBox && pd("countControl.inventoryDoll")) {
          let [qm, qU] = Object.entries(q8.result.response).pop();
          let qQ = 0;
          if (qU?.consumable?.[pw]) {
            qQ += qU.consumable[pw];
          }
          if (qQ) {
            const c0 = {
              newCount: qQ
            };
            if (await vI.confirm(p3(dR.OPEN_DOLLS, c0), {}, {
              buttons: [{
                msg: p3(dR.BTN_OPEN),
                result: true
              }, {
                msg: p3(dR.BTN_NO),
                result: false
              }]
            })) {
              const c1 = await bp(pw, qQ, +qm);
              lU([c1.rewards], qU);
              if (qU?.consumable) {
                delete qU.consumable[pw];
                if (Object.keys(qU.consumable).length == 0) {
                  delete qU.consumable;
                }
              }
              const c2 = {
                [c1.count]: qU
              };
              q8.result.response = c2;
              ym = true;
            }
          }
        }
        if (q8.ident == q0.titanUseSummonCircle) {
          if (q9.rewards.length > 10) {
            for (const c3 of q9.rewards) {
              if (c3.titanCard) {
                delete c3.titanCard;
              }
            }
            ym = true;
          }
        }
        if (q8.ident == q0.battleGetReplay || q8.ident == q0.epicBrawl_startBattle) {
          pB = structuredClone(q9.replay || q9.battle);
        }
        if (q8.ident == q0.epicBrawl_getEnemy || q8.ident == q0.epicBrawl_getInfo) {
          let c4 = q9.enemy || q9;
          if (c4?.defence) {
            l9 = c4.defence.units;
            ld();
          }
        }
        if (q8.ident == q0.brawl_findEnemies) {
          pq = {};
          if (q9) {
            for (let c5 in q9) {
              let c6 = q9[c5];
              let c7 = Object.values(c6.heroes)[0].type == "titan";
              const c8 = {
                battleConfig: c7 ? "titan_clan_pvp" : "clan_pvp"
              };
              pq[c6.userId] = {
                defenders: [c6.heroes],
                effects: c8,
                type: c7 ? "brawl_titan" : "brawl"
              };
            }
          }
        }
        if (q8.ident == q0.subscriptionGetInfo) {
          let c9 = q9.subscription;
          if (c9 && c9?.daysLeft > 0) {
            pP = c9.endTime * 1000;
          }
        }
        if (q8.ident == q0.inventoryGet) {
          pT = q9.consumable?.[81] ?? 0;
          pe = q9.consumable?.[151] ?? 0;
        }
        if (q8.ident == q0.questFarm || q8.ident == q0.quest_questsFarm) {
          lx(q9);
        }
        if (q8.ident == q0.questGetAll || q8.ident == q0.shopBuy) {
          const cd = q8.result.quests ?? q9;
          pW = cd.find(cp => cp?.id >= 20000000 && cp?.id < 20000010)?.progress;
        }
        if (q8.ident == q0.serverGetAll && pd("interface.hideServers")) {
          let cp = q9.users.map(cz => cz.serverId);
          q8.result.response.servers = q9.servers.filter(cz => cp.includes(cz.id));
          ym = true;
        }
        if (q8.ident == q0.adventure_getLobbyInfo) {
          const cl = Object.values(q9.users);
          const cv = q9.mapIdent;
          const cb = q9.adventureId;
          const cY = {
            adv_strongford_3pl_hell: 9,
            adv_valley_3pl_hell: 10,
            adv_ghirwil_3pl_hell: 11,
            adv_angels_3pl_hell: 12
          };
          let cy = p3(dR.MAP) + (cv in cY ? cY[cv] : cb);
          cy += "<br>" + p3(dR.PLAYER_POS);
          for (const cq of cl) {
            cy += "<br>" + cq.user.name + " - " + cq.currentNode;
          }
          b3(cy);
        }
        if (q8.ident == q0.adventure_end) {
          bn(false);
        }
        if (q8.ident == q0.clanWarGetInfo) {
          pm = q9;
          bl();
        }
        if (q8.ident == q0.crossClanWar_getInfo) {
          pU = q9;
          bl();
        }
        if (q8.ident == q0.titanArenaGetStatus || q8.ident == q0.titanArenaSetDefenders || q8.ident == q0.titanArenaCompleteTier) {
          pQ = q9;
          bb();
        }
        if (q8.ident == q0.clanRaid_getInfo) {
          z0 = q9;
          bY(yQ.date);
        }
        if (q8.ident == q0.clanGetInfo) {
          const cc = q9?.stat;
          if (cc) {
            by(cc.todayDungeonActivity);
          }
        }
        if (q8.ident == q0.hallOfFameGetTrophies) {
          const cN = [];
          for (const cC in q9) {
            const cW = q9[cC];
            const ch = {
              trophyId: cC,
              rewardType: "champion"
            };
            const cn = {
              name: "hallOfFameFarmTrophyReward",
              args: ch,
              ident: "body_champion_" + cC
            };
            if (!cW.championRewardFarmed) {
              cN.push(cn);
            }
            const cg = {
              trophyId: cC,
              rewardType: "clan"
            };
            const cZ = {
              name: "hallOfFameFarmTrophyReward",
              args: cg,
              ident: "body_clan_" + cC
            };
            if (Object.keys(cW.clanReward).length && !cW.clanRewardFarmed) {
              cN.push(cZ);
            }
          }
          if (cN.length > 3) {
            const cf = {
              calls: cN
            };
            dd.Send(cf).then(cj => cj.results.map(cV => cV.result.response)).then(async cj => {
              let cV = 0;
              let cB = 0;
              let cw = 0;
              let cX = 0;
              for (const cM of cj) {
                cV += cM?.coin ? +cM.coin[18] : 0;
                cB += cM?.coin ? +cM.coin[19] : 0;
                cw += cM?.gold ? +cM.gold : 0;
                cX += cM?.starmoney ? +cM.starmoney : 0;
              }
              let cH = p3(dR.ELEMENT_TOURNAMENT_REWARD) + "<br>";
              if (cV) {
                cH += dv.translate("LIB_COIN_NAME_18") + (": " + cV + "<br>");
              }
              if (cB) {
                cH += dv.translate("LIB_COIN_NAME_19") + (": " + cB + "<br>");
              }
              if (cw) {
                cH += dv.translate("LIB_PSEUDO_COIN") + (": " + cw + "<br>");
              }
              if (cX) {
                cH += dv.translate("LIB_PSEUDO_STARMONEY") + (": " + cX + "<br>");
              }
              await vI.confirm(cH, {}, {
                buttons: [{
                  msg: p3(dR.BTN_OK),
                  result: 0
                }]
              });
            });
          }
        }
      }
      if (q2 && ps) {
        console.log(q1);
        if (pk == "missionRaid") {
          pN = true;
          if (pd("interface.summaryCampaign")) {
            const cV = {
              "0": {},
              "1": {},
              raid: {}
            };
            const cB = ["gear", "scroll", "fragmentGear", "fragmentScroll"];
            for (let cw in q1) {
              cV[cB.includes(cw) ? 0 : cw == "consumable" ? 1 : "raid"][cw] = q1[cw];
            }
            q2.response = cV;
          } else {
            q2.response = q1;
          }
        } else {
          q2.response[pk == "artifactChestOpen" ? "chestReward" : "reward"] = [q1];
        }
        ym = true;
      }
    } catch (cX) {
      console.log("Request(response, " + this.uniqid + "):\n", "Error:\n", yr, cX);
    }
    ps = false;
    pk = "";
    if (ym) {
      Object.defineProperty(this, "responseText", {
        writable: true
      });
      this.responseText = JSON.stringify(yQ);
    }
  }
  function vd(yr) {
    let ym = dv.lib.roleAscension;
    let yU = {};
    for (let yQ in ym) {
      let q0 = ym[yQ];
      let q1 = {};
      for (let q2 of q0.levels) {
        for (let q3 in q2.battleStatData) {
          if (!q1[q3]) {
            q1[q3] = 0;
          }
          q1[q3] += q2.battleStatData[q3];
        }
      }
      yU[q0.hero_perk] = q1;
    }
    for (let q4 in yr) {
      if (yr[q4].type == "hero") {
        let q5 = yU[yr[q4].perks[0]];
        for (let q6 in q5) {
          if (yr[q4][q6]) {
            yr[q4][q6] -= q5[q6];
          }
        }
      }
    }
    return yr;
  }
  function vp(yr, ym) {
    let yU = (yr - ym).floor(0);
    let yQ = ("00" + (yU / 60).floor(0)).slice(-2);
    let q0 = ("00" + (yU - yQ * 60).floor(0)).slice(-2);
    return yQ + ":" + q0;
  }
  async function vz(yr) {
    let ym = 0;
    let yU = dv.lib.hero;
    let yQ = Object.entries(yr);
    let q0 = 0;
    let q1 = 0;
    let q2 = [];
    for (let q4 in yr) {
      let q5 = structuredClone(yr[q4]);
      let q6 = q5.energy / 10;
      q1 += Math.max(0, q5.hp);
      q0 += q5.maxHp;
      ym += q6;
      q5.hp = (Math.max(0, q5.hp) / q5.maxHp * 100).ceil(0) + "% ";
      q5.energy = q6.ceil(0) + "% ";
      q5.order = yU[q5.id].battleOrder;
      q2.push(q5);
    }
    q1 = Math.min(100, (q1 * 100 / q0).ceil(0)) + "% ";
    ym = (ym / q2.length).ceil(0) + "% ";
    q2.sort((q7, q8) => q7.order - q8.order);
    let q3 = p3(dR.GENERAL) + ":         " + (q1 + p3(dR.HP) + ", ").fixed(9) + ym + p3(dR.ENRG) + ",";
    for (let q7 of q2) {
      if (!q7.isDead) {
        q3 += "\n" + (dv.translate("LIB_HERO_NAME_" + q7.id) + ": ").fixed(12) + (q7.hp + p3(dR.HP) + ", ").fixed(9) + q7.energy + p3(dR.ENRG) + ",";
      }
    }
    return q3;
  }
  function vl(yr) {
    let ym = yr?.state;
    if (ym && +ym.maxHp >= 0) {
      return +ym.maxHp;
    } else if (yr.hp) {
      return +yr.hp + (yr.strength ?? 0) * 40;
    } else {
      return -1;
    }
  }
  async function vv(yr, ym) {
    let yU = {
      result: p3(dR.DEFEAT),
      unitInfo: ""
    };
    if (yr.result.win) {
      yU.result = p3(dR.VICTORY);
    } else {
      let yQ = {};
      let q0 = ym.defenders[0];
      let q1 = yr.progress[0].defenders.heroes;
      for (let q2 in q0) {
        let q3 = q0[q2].id;
        let q4 = +(q1[q2]?.hp ?? 0);
        let q5 = +(q1[q2]?.energy ?? 0);
        let q6 = q4 == 0;
        let q7 = vl(q0[q2]);
        const q8 = {
          id: q3,
          hp: q4,
          energy: q5,
          isDead: q6,
          maxHp: q7
        };
        yQ[q2] = q8;
      }
      if (Object.keys(yQ).length > 0) {
        yU.unitInfo = "\n\n" + (await vz(yQ));
      }
    }
    return yU;
  }
  function vb(yr) {
    let ym = yr.battleData.defenders[0];
    let yU = yr.progress[0].defenders.heroes;
    let yQ = 0;
    let q0 = 0;
    let q1 = 0;
    let q2 = 0;
    for (let q6 in ym) {
      let q7 = vl(ym[q6]);
      if (q7 > 0) {
        q2++;
        yQ += q7;
        q0 += +(yU[q6]?.hp ?? 0);
        q1 += +(yU[q6]?.energy ?? 0);
      }
    }
    let q3 = q0 * 100 / yQ;
    let q4 = q1 / q2 / 10;
    const q5 = {
      hp: q3,
      enrg: q4
    };
    return q5;
  }
  async function vY(yr = z4) {
    let ym = p3(dR.HP);
    let yU = p3(dR.ENRG);
    const yQ = {
      count: yr.count
    };
    let q0 = "\n\n" + p3(dR.STATS_COUNT_BATTLE, yQ);
    let q1 = {
      best: p3(dR.BEST) + ":   ",
      avr: p3(dR.AVR) + ":  ",
      bad: p3(dR.BAD) + ":   "
    };
    for (let q2 in q1) {
      let q3 = yr[q2];
      q0 += "\n" + q1[q2];
      q0 += "dmg" in q3 ? (dr(q3.dmg) + ", ").fixed(13) : "";
      q0 += "hp" in q3 ? q3.hp.toString() + "% " + ym + ", ".fixed(5 - q3.hp.toString().length) : "";
      q0 += "enrg" in q3 ? q3.enrg.toString() + "% " + yU + ", ".fixed(5 - q3.enrg.toString().length) : "";
      q0 += q3.time + ", ";
    }
    return q0;
  }
  function vy(yr, ym, yU = 0, yQ = z4) {
    for (let q0 in yQ.avr) {
      yQ.avr[q0] /= ym;
    }
    for (let q1 in yQ) {
      if (typeof yQ[q1].time === "number") {
        yQ[q1].time = vp(yr, yQ[q1].time);
      }
      for (let q2 of ["dmg", "enrg", "hp"]) {
        if (q2 in yQ[q1]) {
          yQ[q1][q2] = yQ[q1][q2].ceil(0);
        }
      }
    }
    yQ.winRate = yU / ym * 100;
    yQ.count = ym;
  }
  function vq(yr, ym = z4) {
    yr.complex = yr.dmg ? yr.dmg : 100 - yr.hp - yr.enrg / 10 - yr.time / 100;
    for (let yU in yr) {
      ym.avr[yU] += yr[yU];
    }
    if (yr.complex > ym.best.complex) {
      ym.best = yr;
    }
    if (yr.complex < ym.bad.complex) {
      ym.bad = yr;
    }
  }
  function vc(yr = false) {
    const ym = {
      hp: 0,
      enrg: 0,
      time: 0,
      complex: -1000000000000
    };
    const q0 = {
      best: ym,
      avr: {
        hp: 0,
        enrg: 0,
        time: 0,
        complex: 0
      },
      bad: {
        hp: 0,
        enrg: 0,
        time: 0,
        complex: 1000000000000
      }
    };
    if (yr) {
      const q1 = {
        dmg: 0,
        time: 0,
        complex: -1000000000000
      };
      const q4 = {
        best: q1,
        avr: {
          dmg: 0,
          time: 0,
          complex: 0
        },
        bad: {
          dmg: 0,
          time: 0,
          complex: 1000000000000
        }
      };
      z4 = q4;
    } else {
      z4 = q0;
    }
    return z4;
  }
  function vN(yr) {
    let ym = yr.progress[0].defenders.heroes[1].extra;
    return ym.damageTaken + ym.damageTakenNextLevel;
  }
  function vC(yr, ym = false) {
    let yU = ym ? {
      dmg: vN(yr)
    } : vb(yr);
    yU.time = yr?.battleTime?.[0] ?? 0;
    return yU;
  }
  async function vW(yr, ym, yU, yQ) {
    vc(yU);
    let q0 = yr[yr.length - 1];
    let q1 = 0;
    let q2 = "";
    let q3 = vp(ym, q0.battleTime[0]);
    for (let q4 of yr) {
      q1 += q4.result.win;
      vq(vC(q4, yU));
    }
    vy(ym, yr.length, q1);
    if (yU) {
      z4.damage = vN(q0);
      q2 += p3(dR.AUTO_DMG, {
        damage: dr(z4.damage),
        endTime: q3
      });
    } else {
      let q5 = await vv(q0, q0.battleData);
      let q6 = vb(q0);
      z4.state = 100 - q6.hp - q6.enrg / 10;
      q2 += p3(dR.AUTO_RESULT, {
        result: q5.result,
        endTime: q3,
        winRate: z4.winRate.round(1)
      }) + q5.unitInfo;
    }
    z4.data = q0;
    z5 = z4;
    if (yQ) {
      q2 += await vY();
    }
    return q2;
  }
  async function vh(yr, ym, yU = false) {
    let yQ = structuredClone(yr);
    let q0 = 120;
    let q1 = vB(yQ);
    let q2 = Date.now();
    yQ.progress = [{
      attackers: {
        input: ["auto", 0, 0, "auto", 0, 0]
      }
    }];
    try {
      q0 = +dv.lib.battleConfig[q1.split("_")[1]].config.battleDuration;
    } catch (q7) {}
    ym = l0(yQ, ym + 1) - 1;
    const q5 = await ze(yQ);
    const q6 = await lh(yQ, ym, false);
    console.log("Время расчетов: " + (Date.now() - q2).round(0) / 1000 + " сек.");
    q6.push(q5);
    return await vW(q6, q0, yU, ym > 0);
  }
  function vn(yr, ym) {
    let yU = 0;
    let yQ = yr.length - 1;
    while (yU <= yQ) {
      let q0 = yQ + yU >> 1;
      if (ym > yr[q0]) {
        yU = q0 + 1;
      } else if (ym < yr[q0]) {
        yQ = q0 - 1;
      } else {
        return q0;
      }
    }
    return yU - 1;
  }
  async function vg(yr, ym, yU, yQ, q0, q1, q2, q3) {
    const q4 = {
      damage: -100,
      message: "",
      count: 0,
      startTime: 0,
      endTime: 0
    };
    const q5 = q4;
    const q6 = pt;
    const q7 = q6 + q3;
    let q8 = [];
    let q9 = [];
    let qd = [];
    let qp = 0;
    let qz;
    let ql;
    let qv = Date.now();
    let qb = [];
    function qY() {
      q0(q5);
    }
    function qy(qH) {
      return ["auto", 0, 0, "auto", 0, qH];
    }
    function qq(qH) {
      return qH.delta / qp + qH.damage / q5.damage / 2;
    }
    function qc(qH, qM) {
      return (qM > qH ? qM / qH : qH / qM) - 1;
    }
    function qN(qH, qM, qS) {
      return qS > 0.00001 && qc(qH, qM) > 0.00001;
    }
    function qC() {
      return !q5.result.win && !pR && Date.now() < q7;
    }
    function qW(qH, qM) {
      const qS = qM.hp.round(1);
      const qD = qM.enrg.round(1);
      return qH.result + ", " + qS + ("% " + p3(dR.HP) + ", ") + qD + ("% " + p3(dR.ENRG));
    }
    function qh(qH) {
      return (qH?.[5] ?? 0).round(2);
    }
    function qn() {
      const qH = {
        damage: q5.damage,
        info: q5.info,
        state: q5.state
      };
      const qM = ql ?? qH;
      const qS = qh(q5.input);
      const qD = q5.count;
      if (yU) {
        q5.message = p3(dR.BEST_STAT_ASGARD, {
          startDamage: dr(qM.damage),
          bestDamage: dr(q5.damage)
        });
      } else {
        q5.message = p3(dR.BEST_STAT_BATTLE, {
          startState: qW(qM.info, qM.state),
          bestState: qW(q5.info, q5.state)
        });
      }
      const qt = {
        moment: qS,
        count: qD
      };
      q5.message += p3(dR.BEST_STAT_INFO, qt);
    }
    function qg(qH, qM, qS, qD, qt, qA) {
      const qi = {
        damage: qH
      };
      const qs = {
        moment: qD,
        count: qt,
        time: qA
      };
      return "\n\n" + (yU ? p3(dR.LAST_STAT_ASGARD, qi) : p3(dR.LAST_STAT_BATTLE, {
        state: qW(qM, qS)
      })) + p3(dR.LAST_STAT_INFO, qs);
    }
    function qZ() {
      q5.endTime = p1(990000, 1000000) / 1000000 * (yU ? 30 : 120);
      qn();
      qp = q5.endTime - q5.startTime;
    }
    async function qf(qH, qM, qS, qD) {
      const qt = await qj(qS, qD);
      const qA = (qM.input[5] - qH.input[5]) / 2;
      const qi = qN(qH.damage, qt.damage, qA);
      const qs = qN(qt.damage, qM.damage, qA);
      const qk = {
        left: qH,
        right: qt,
        delta: qA,
        damage: (qH.damage + qt.damage) / 2
      };
      const qG = {
        left: qt,
        right: qM,
        delta: qA,
        damage: (qt.damage + qM.damage) / 2
      };
      const qF = {
        middle: qt,
        delta: qA,
        leftValid: qi,
        rightValid: qs,
        leftInterval: qk,
        rightInterval: qG
      };
      return qF;
    }
    async function qj(qH, qM) {
      q5.count++;
      const qS = {
        input: qM,
        damage: 0
      };
      if (qH) {
        qH.battleData = yr;
        let qD = vC(qH, yU);
        let qt = yU ? qD.dmg : 100 - qD.hp;
        let qA = vp(ym, qD.time);
        let qi = yU ? {} : await vv(qH, yr);
        let qs = qH.progress[0].attackers.input;
        let qk = qH.progress;
        qH = {
          state: qD,
          damage: qt,
          input: qs,
          info: qi,
          progress: qk,
          result: qH.result,
          battleTime: qD.time
        };
        if (qt > q5.damage) {
          Object.assign(q5, qH);
          qn();
        }
        qz = qg(dr(qt), qi, qD, qh(qs), q5.count, vp(q3 / 1000 + 1.5, ((Date.now() - q6) / 1000).ceil(0)));
        vq(qD);
        if (!pR && Date.now() - qv > 100) {
          qv = Date.now();
          b5(q5.message + qz, 0, lp);
          await bd();
        }
      } else {
        return qS;
      }
      return qH;
    }
    async function qV(qH, qM) {
      while (qC()) {
        const qS = qy((qM.input[5] + qH.input[5]) / 2);
        const qD = Date.now();
        yr.progress[0].attackers.input = qS;
        const qt = await ze(yr);
        const qA = await qf(qH, qM, qt, qS);
        if (qA.leftValid) {
          if (qA.rightValid) {
            q8.push(qA.leftInterval);
          } else {
            q9.push(qA.leftInterval);
          }
        } else {
          qd.push(qA.leftInterval);
        }
        if (qA.rightValid) {
          if (qA.leftValid) {
            q8.push(qA.rightInterval);
          } else {
            q9.push(qA.rightInterval);
          }
        } else {
          qd.push(qA.rightInterval);
        }
        if (q8.length > 0) {
          q8.sort((qi, qs) => qq(qs) - qq(qi));
        } else if (q9.length > 0) {
          q8 = q9.sort((qi, qs) => qq(qs) - qq(qi));
          q9 = [];
        } else if (qd.length > 0) {
          q8 = qd.sort((qi, qs) => qq(qs) - qq(qi));
          qd = [];
        } else {
          qY();
        }
        if (q8.length > 0) {
          qp = Math.max(...q8.map(qs => qs.delta));
          let qi = q8.shift();
          qH = qi.left;
          qM = qi.right;
        }
      }
      qY();
    }
    ql = q1 ? await qj(structuredClone(q1)) : null;
    yr.progress = [{
      attackers: {
        input: ["auto", 0, 0, "auto", 0, 0]
      }
    }];
    const qX = await qj(await ze(yr));
    if (!q5.result.win) {
      qZ();
      const qH = qy(q5.endTime);
      yr.progress[0].attackers.input = qH;
      const qM = await qj(await ze(yr), qH);
      qV(qX, qM);
    } else {
      qY();
    }
  }
  async function vZ(yr, ym = false, yU = false, yQ, q0 = false, q1 = 160000) {
    let q2 = structuredClone(yr);
    let q3 = 120;
    try {
      q3 = +dv.lib.battleConfig[vB(q2).split("_")[1]].config.battleDuration;
    } catch (q5) {}
    pR = false;
    vc(ym);
    let q4 = await new Promise(q6 => {
      vg(q2, q3, ym, yU, q6, yQ, q0, q1);
    });
    console.log("Найден результат:\nУрон: " + dr(q4.damage.round(3)) + "\nТайминг: " + q4.input[5] + "\nТестов: " + q4.count);
    vy(q3, q4.count);
    q4.message += await vY();
    return q4;
  }
  function vf(yr, ym = true) {
    let yU = Object.values(dv.lib.hero);
    let yQ = yr.split(":");
    let q0 = yQ[1];
    let q1;
    switch (yQ[0]) {
      case "titanArtifact_id":
        return {
          name: dv.translate("LIB_TITAN_ARTIFACT_NAME_" + q0)
        };
      case "titan":
        return {
          name: dv.translate("LIB_HERO_NAME_" + q0)
        };
      case "skill":
        return {
          name: dv.translate("LIB_SKILL_" + q0)
        };
      case "inventoryItem_gear":
        return {
          name: dv.translate("LIB_GEAR_NAME_" + q0)
        };
      case "inventoryItem_coin":
        return {
          name: dv.translate("LIB_COIN_NAME_" + q0)
        };
      case "artifact":
        q1 = {
          name: dv.translate("LIB_ARTIFACT_NAME_" + q0)
        };
        if (ym) {
          q1.answers = yU.filter(q3 => q3.id < 100 && q3.artifacts.includes(+q0)).map(q3 => dv.translate("LIB_HERO_NAME_" + q3.id));
        }
        return q1;
      case "hero":
        q1 = {
          name: dv.translate("LIB_HERO_NAME_" + q0)
        };
        if (ym) {
          q1.answers = dv.lib.hero[q0].artifacts.map(q3 => dv.translate("LIB_ARTIFACT_NAME_" + q3));
        }
        return q1;
      default:
        const q2 = {
          name: yr
        };
        return q2;
    }
  }
  function vj(yr) {
    const ym = {};
    if (yr?.questionIcon) {
      const yU = vf(yr.questionIcon);
      ym.answer = yr.answers.find(yQ => yU.name == yQ.answerText.slice(1));
      if (!ym?.answer && yU?.answers) {
        ym.answer = yr.answers.find(yQ => yU.answers.includes(yQ.answerText.slice(1)));
      }
    }
    if (yr.answers[0]?.answerIcon) {
      ym.answer = yr.answers.find(yQ => yr.question.includes(vf(yQ.answerIcon, false).name));
    }
    if (ym?.answer?.id) {
      return +ym.answer.id;
    }
    return false;
  }
  async function vV(yr) {
    console.log(yr.question);
    pH = Object.assign(pH, yr);
    let ym;
    let yU;
    try {
      ym = vj(yr);
    } catch (yQ) {}
    if (ym) {
      const q0 = {
        id: ym,
        error: true
      };
      yU = q0;
    } else {
      let q1 = pH.answers.map(q4 => ({
        id: q4.id,
        answer: le(q4.answerText, q4.answerIcon)
      }));
      let q2 = lT(pH.question, pH.questionIcon);
      const q3 = {
        answers: q1,
        question: q2
      };
      yU = await lL(q3);
    }
    console.log(yU.id);
    return yU;
  }
  function vB(yr) {
    const ym = yr?.effects?.battleConfig ?? yr?.type;
    switch (ym) {
      case "titan_pvp":
        return "get_titanPvp";
      case "titan_pvp_manual":
      case "titan_clan_pvp":
      case "clan_pvp_titan":
      case "clan_global_pvp_titan":
      case "brawl_titan":
      case "challenge_titan":
      case "titan_mission":
        return "get_titanPvpManual";
      case "clan_raid":
      case "adventure":
      case "clan_global_pvp":
      case "epic_brawl":
      case "clan_pvp":
        return "get_clanPvp";
      case "dungeon_titan":
      case "titan_tower":
        return "get_titan";
      case "tower":
      case "clan_dungeon":
        return "get_tower";
      case "pve":
      case "mission":
        return "get_pve";
      case "mission_boss":
        return "get_missionBoss";
      case "challenge":
      case "pvp_manual":
        return "get_pvpManual";
      case "grand":
      case "arena":
      case "pvp":
      case "clan_domination":
        return "get_pvp";
      case "core":
        return "get_core";
      default:
        {
          if (ym.includes("invasion")) {
            return "get_invasion";
          }
          if (ym.includes("boss")) {
            return "get_boss";
          }
          if (ym.includes("titan_arena")) {
            return "get_titanPvpManual";
          }
          return "get_clanPvp";
        }
    }
  }
  function vw(yr) {
    return {}.toString.call(yr).slice(8, -1);
  }
  this.getSignature = function (yr, ym) {
    const yU = {
      signature: "",
      length: 0,
      add: function (q0) {
        this.signature += q0;
        if (this.length < this.signature.length) {
          this.length = (this.signature.length + 1) * 3 >> 1;
        }
      }
    };
    const yQ = yU;
    yQ.add(yr["X-Request-Id"]);
    yQ.add(":");
    yQ.add(yr["X-Auth-Token"]);
    yQ.add(":");
    yQ.add(yr["X-Auth-Session-Id"]);
    yQ.add(":");
    yQ.add(ym);
    yQ.add(":");
    yQ.add("LIBRARY-VERSION=1");
    yQ.add("UNIQUE-SESSION-ID=" + yr["X-Env-Unique-Session-Id"]);
    return md5(yQ.signature);
  };
  function vX(yr, ym) {
    vm.set(yr, ym);
    p7[yr].cbox.checked = ym;
  }
  async function vH(yr) {
    const ym = dv.lib.titanArtifact;
    const yU = ym.battleEffect;
    const yQ = dv.lib.rule.titanPowerPerStat;
    const q0 = z3.titan[4000].level;
    const q1 = Math.pow(yr, 1.5) - Math.pow(q0, 1.5);
    const q2 = yr - q0;
    const q3 = q2 + 120;
    const q4 = q3 * 0.00003268 * q3 + q3 * 0.00527383 - 1.10341462;
    for (let q5 in yU) {
      if (q5 == 201) {
        yU[q5][yr] = q2 * 250;
      } else if (q5 == 202) {
        yU[q5][yr] = q2 * 450;
      } else {
        yU[q5][yr] = (yU[q5].levels[q0] * q4).round(0);
      }
    }
    for (const q6 in z3.titan) {
      const q7 = z3.titan[q6];
      const q8 = dv.lib.titan[q6];
      const q9 = q8.stars[6].battleStatData;
      const qd = q1 * +q9.physicalAttack;
      const qp = q1 * +q9.hp;
      for (const qz of q7.artifacts) {
        qz.level = yr;
      }
      for (const ql in q7.skills) {
        q7.skills[ql] = yr;
      }
      q7.elementSpiritLevel = yr;
      q7.level = yr;
      q7.hp += qp.round(0);
      q7.physicalAttack += qd.round(0);
      q7.power += yQ.hp * qp + yQ.physicalAttack * qd;
      for (const qv of q8.artifacts.concat(q8.spiritArtifact)) {
        const qb = ym.id[qv];
        const qY = +ym.type[qb.type].evolution[6].battleEffectMultiplier;
        for (const qy of qb.battleEffect) {
          const qq = yU[qy];
          const qc = qq.effect;
          const qN = qq[yr] * qY;
          q7[qc] += qN;
          q7.power += (yQ[qc] ?? 0) * qN;
        }
      }
      q7.power = q7.power.round(0);
    }
  }
  async function vM() {
    z9 = z8[zC + dG.id] ?? {};
    vX("stayOnline", z9?.stayOnline ? true : false);
    p7.stayOnline.cbox.checked = false;
    if (pd("stayOnline") && z9?.stayOnline) {
      let yQ = vo("invasionAutoStart", null);
      if (yQ) {
        new Promise((q0, q1) => {
          let q2 = new yM(q0, q1, yQ);
          q2.quickStart();
        });
      }
    }
    vm.delete("invasionAutoStart");
    if (bC()) {
      p7.unlockRaid.cbox.checked = false;
    } else {
      p7.unlockRaid.div.hidden = false;
    }
    let yr = {};
    let ym = Object.keys(dv.lib.hero);
    let yU = ym.filter(q0 => q0 < 100);
    for (let q0 of yU) {
      dv.lib.hero[q0].availableFavor = [0];
    }
    for (let q1 of Object.values(dv.lib.pet)) {
      for (let q2 of q1.favorHeroes) {
        dv.lib.hero[q2].availableFavor.push(q1.id);
      }
    }
    if (pd("buyInStore")) {
      const q3 = await bh();
      lU([q3?.rewards ?? []], yr);
    }
    if (pd("sendExpedition")) {
      const q4 = await bZ();
      lU([q4?.rewards ?? []], yr);
    }
    if (Object.keys(yr).length > 0) {
      dv.showLootboxReward(yr);
    }
    bq();
    bg();
    z3 = (await dd.Send({
      calls: [{
        name: "teamGetMaxUpgrade",
        args: {
          units: {
            hero: yU,
            titan: ym.filter(q5 => (q5 / 1000).floor(0) == 4),
            pet: ym.filter(q5 => (q5 / 1000).floor(0) == 6)
          }
        },
        ident: "teamGetMaxUpgrade"
      }]
    }).then(q5 => q5.results))[0].result.response;
    if (!z3.hero[65]) {
      z3.hero[65] = z8.full_units[65];
    }
    pb = 130;
    if (z3.titan[4000].level < pb) {
      vH(pb);
    }
  }
  function vS(yr) {
    vK.setStyle(yr);
    vI.setStyle(yr);
  }
  const vD = dd.requestAnimationFrame;
  function vt(yr) {
    if (yr < pp.FPS.max) {
      let ym = 1000 / yr;
      let yU = Date.now();
      dd.requestAnimationFrame = async function (yQ) {
        const q0 = Date.now();
        const q1 = yU - q0;
        yU = Math.max(q0, yU) + ym;
        if (q1 > 0) {
          await new Promise(q2 => setTimeout(q2, q1));
        }
        vD(yQ);
      };
    } else {
      dd.requestAnimationFrame = vD;
    }
  }
  function vA() {
    vt(1);
  }
  function vi() {
    vt(pz("FPS"));
  }
  async function vs() {
    if (true) {
      const ym = vE("language", "RU");
      const yU = Object.keys(dA);
      const yQ = await vI.confirm("Выберите язык интерфейса\nSelect interface language", {}, {
        buttons: [{
          msg: "Сохранить (Save)",
          result: 1,
          inRow: true,
          selects: [{
            selected: 0,
            options: yU
          }]
        }, {
          isClose: true,
          result: 0
        }]
      });
      if (yQ?.id == 1) {
        let q0 = yU[yQ.results[0]];
        if (q0 != ym) {
          va("language", q0);
          location.reload();
        }
      }
    } else {
      b3("For switch to the English version\nactivate access: " + dq, 8000);
      b5("Для переключения на английскую версию\nактивируйте доступ: " + dq, 8000);
    }
  }
  function vk() {
    return async function () {
      const yr = this.dataset.name;
      const ym = this.checked;
      const yU = p7[yr].action;
      const yQ = yU ? await yU.call(this, ym) : ym;
      vX(yr, yQ);
      if (p7[yr].remote && z9[yr] != yQ) {
        z9[yr] = yQ;
        lB();
      }
    };
  }
  function vG() {
    return function () {
      const yr = this.dataset.name;
      const ym = p0(this.value, pp[yr].default, pp[yr].min, pp[yr].max);
      const yU = {
        value: ym
      };
      pp[yr].input.value = pp[yr].pattern.sprintf(yU);
      vm.set(yr, ym);
      pp[yr].func.call(this, ym);
    };
  }
  function vF() {
    let yr = [];
    let ym = 0;
    for (let yQ in p5) {
      p5[yQ].cbox = vK.addDetails(p5[yQ].label, p5[yQ].hidden, yQ, p5[yQ].color);
      for (let q0 = 0; q0 < p5[yQ].count; q0++) {
        yr.push(p5[yQ].cbox);
      }
    }
    for (let q1 in p7) {
      const q2 = vK.addCheckbox(p7[q1].label, p7[q1].title, yr[ym++], p7[q1].hidden, p7[q1].color);
      p7[q1].cbox = q2.checkbox;
      p7[q1].div = q2.divCheckbox;
      let q3 = vm.get(q1, p7[q1].default);
      p7[q1].cbox.checked = q3;
      vm.set(q1, q3);
      p7[q1].cbox.dataset.name = q1;
      p7[q1].cbox.addEventListener("change", vk());
    }
    for (let q4 in p6) {
      let q5 = q4 + "_ext";
      let q6 = vm.get(q5, {});
      for (let q7 in p6[q4]) {
        if (!q6[q7]) {
          q6[q7] = {
            checked: p6[q4][q7].default
          };
        }
        p6[q4][q7].checked = q6[q7].checked;
      }
      vm.set(q5, q6);
    }
    const yU = vK.addDetails(p3(dR.DETAILS_VALUE), false, "value");
    for (let q8 in pp) {
      pp[q8].input = vK.addInputText(pp[q8].title, false, yU);
      let q9 = vm.get(q8, pp[q8].default);
      vm.set(q8, q9);
      const qd = {
        value: q9
      };
      pp[q8].input.value = pp[q8].pattern.sprintf(qd);
      pp[q8].func.call(this, q9);
      pp[q8].input.dataset.name = q8;
      pp[q8].input.addEventListener("change", vG());
    }
  }
  function vL() {
    for (let yr in pl) {
      let ym = pl[yr];
      ym.button = vK.addButton(ym.name, ym.func, ym.title, ym.hidden, ym.color);
    }
  }
  function vO() {
    let yr = ["Free", "Base", "VIP"];
    let ym = [p3(dR.PLAN_DESC_FREE), p3(dR.PLAN_DESC_BASE), p3(dR.PLAN_DESC_VIP)];
    let yU = vK.addHeader(p3(dR.ACTIVE_PLAN));
    yU.style = "padding: 3px 0px 0px 0px;";
    let yQ = vK.addHeader("");
    for (let q1 in yr) {
      let q2 = vK.addCheckbox(yr[q1], ym[q1], yQ);
      q2.checkbox.labels[0].style = "font-size: 14px; ";
      q2.checkbox.checked = q1 > 0 ? true : true;
      q2.checkbox.disabled = true;
    }
    let q0 = vK.addHeader(p3(dR.BOTTOM_URLS));
    vK.addHeader(p3(dR.LANGUAGE_BUTTON), vs, q0);
  }
  function vR() {
    vK.init();
    vK.addHeader(GM_info.script.name, bq);
    vK.addHeader("v" + GM_info.script.version);
    vI.init();
    vF();
    vL();
  }
  (function (yr) {
    'use strict';

    function ym(qp, qz) {
      var ql = (qp & 65535) + (qz & 65535);
      return (qp >> 16) + (qz >> 16) + (ql >> 16) << 16 | ql & 65535;
    }
    function yU(qp, qz, ql, qv, qb, qY) {
      return ym((qz = ym(ym(qz, qp), ym(qv, qY))) << qb | qz >>> 32 - qb, ql);
    }
    function yQ(qp, qz, ql, qv, qb, qY, qy) {
      return yU(qz & ql | ~qz & qv, qp, qz, qb, qY, qy);
    }
    function q0(qp, qz, ql, qv, qb, qY, qy) {
      return yU(qz & qv | ql & ~qv, qp, qz, qb, qY, qy);
    }
    function q1(qp, qz, ql, qv, qb, qY, qy) {
      return yU(qz ^ ql ^ qv, qp, qz, qb, qY, qy);
    }
    function q2(qp, qz, ql, qv, qb, qY, qy) {
      return yU(ql ^ (qz | ~qv), qp, qz, qb, qY, qy);
    }
    function q3(qp, qz) {
      qp[qz >> 5] |= 128 << qz % 32;
      qp[14 + (qz + 64 >>> 9 << 4)] = qz;
      var ql;
      var qv;
      var qb;
      var qY;
      var qy = 1732584193;
      var qq = -271733879;
      var qc = -1732584194;
      var qN = 271733878;
      for (var qC = 0; qC < qp.length; qC += 16) {
        qy = yQ(ql = qy, qv = qq, qb = qc, qY = qN, qp[qC], 7, -680876936);
        qN = yQ(qN, qy, qq, qc, qp[qC + 1], 12, -389564586);
        qc = yQ(qc, qN, qy, qq, qp[qC + 2], 17, 606105819);
        qq = yQ(qq, qc, qN, qy, qp[qC + 3], 22, -1044525330);
        qy = yQ(qy, qq, qc, qN, qp[qC + 4], 7, -176418897);
        qN = yQ(qN, qy, qq, qc, qp[qC + 5], 12, 1200080426);
        qc = yQ(qc, qN, qy, qq, qp[qC + 6], 17, -1473231341);
        qq = yQ(qq, qc, qN, qy, qp[qC + 7], 22, -45705983);
        qy = yQ(qy, qq, qc, qN, qp[qC + 8], 7, 1770035416);
        qN = yQ(qN, qy, qq, qc, qp[qC + 9], 12, -1958414417);
        qc = yQ(qc, qN, qy, qq, qp[qC + 10], 17, -42063);
        qq = yQ(qq, qc, qN, qy, qp[qC + 11], 22, -1990404162);
        qy = yQ(qy, qq, qc, qN, qp[qC + 12], 7, 1804603682);
        qN = yQ(qN, qy, qq, qc, qp[qC + 13], 12, -40341101);
        qc = yQ(qc, qN, qy, qq, qp[qC + 14], 17, -1502002290);
        qy = q0(qy, qq = yQ(qq, qc, qN, qy, qp[qC + 15], 22, 1236535329), qc, qN, qp[qC + 1], 5, -165796510);
        qN = q0(qN, qy, qq, qc, qp[qC + 6], 9, -1069501632);
        qc = q0(qc, qN, qy, qq, qp[qC + 11], 14, 643717713);
        qq = q0(qq, qc, qN, qy, qp[qC], 20, -373897302);
        qy = q0(qy, qq, qc, qN, qp[qC + 5], 5, -701558691);
        qN = q0(qN, qy, qq, qc, qp[qC + 10], 9, 38016083);
        qc = q0(qc, qN, qy, qq, qp[qC + 15], 14, -660478335);
        qq = q0(qq, qc, qN, qy, qp[qC + 4], 20, -405537848);
        qy = q0(qy, qq, qc, qN, qp[qC + 9], 5, 568446438);
        qN = q0(qN, qy, qq, qc, qp[qC + 14], 9, -1019803690);
        qc = q0(qc, qN, qy, qq, qp[qC + 3], 14, -187363961);
        qq = q0(qq, qc, qN, qy, qp[qC + 8], 20, 1163531501);
        qy = q0(qy, qq, qc, qN, qp[qC + 13], 5, -1444681467);
        qN = q0(qN, qy, qq, qc, qp[qC + 2], 9, -51403784);
        qc = q0(qc, qN, qy, qq, qp[qC + 7], 14, 1735328473);
        qy = q1(qy, qq = q0(qq, qc, qN, qy, qp[qC + 12], 20, -1926607734), qc, qN, qp[qC + 5], 4, -378558);
        qN = q1(qN, qy, qq, qc, qp[qC + 8], 11, -2022574463);
        qc = q1(qc, qN, qy, qq, qp[qC + 11], 16, 1839030562);
        qq = q1(qq, qc, qN, qy, qp[qC + 14], 23, -35309556);
        qy = q1(qy, qq, qc, qN, qp[qC + 1], 4, -1530992060);
        qN = q1(qN, qy, qq, qc, qp[qC + 4], 11, 1272893353);
        qc = q1(qc, qN, qy, qq, qp[qC + 7], 16, -155497632);
        qq = q1(qq, qc, qN, qy, qp[qC + 10], 23, -1094730640);
        qy = q1(qy, qq, qc, qN, qp[qC + 13], 4, 681279174);
        qN = q1(qN, qy, qq, qc, qp[qC], 11, -358537222);
        qc = q1(qc, qN, qy, qq, qp[qC + 3], 16, -722521979);
        qq = q1(qq, qc, qN, qy, qp[qC + 6], 23, 76029189);
        qy = q1(qy, qq, qc, qN, qp[qC + 9], 4, -640364487);
        qN = q1(qN, qy, qq, qc, qp[qC + 12], 11, -421815835);
        qc = q1(qc, qN, qy, qq, qp[qC + 15], 16, 530742520);
        qy = q2(qy, qq = q1(qq, qc, qN, qy, qp[qC + 2], 23, -995338651), qc, qN, qp[qC], 6, -198630844);
        qN = q2(qN, qy, qq, qc, qp[qC + 7], 10, 1126891415);
        qc = q2(qc, qN, qy, qq, qp[qC + 14], 15, -1416354905);
        qq = q2(qq, qc, qN, qy, qp[qC + 5], 21, -57434055);
        qy = q2(qy, qq, qc, qN, qp[qC + 12], 6, 1700485571);
        qN = q2(qN, qy, qq, qc, qp[qC + 3], 10, -1894986606);
        qc = q2(qc, qN, qy, qq, qp[qC + 10], 15, -1051523);
        qq = q2(qq, qc, qN, qy, qp[qC + 1], 21, -2054922799);
        qy = q2(qy, qq, qc, qN, qp[qC + 8], 6, 1873313359);
        qN = q2(qN, qy, qq, qc, qp[qC + 15], 10, -30611744);
        qc = q2(qc, qN, qy, qq, qp[qC + 6], 15, -1560198380);
        qq = q2(qq, qc, qN, qy, qp[qC + 13], 21, 1309151649);
        qy = q2(qy, qq, qc, qN, qp[qC + 4], 6, -145523070);
        qN = q2(qN, qy, qq, qc, qp[qC + 11], 10, -1120210379);
        qc = q2(qc, qN, qy, qq, qp[qC + 2], 15, 718787259);
        qq = q2(qq, qc, qN, qy, qp[qC + 9], 21, -343485551);
        qy = ym(qy, ql);
        qq = ym(qq, qv);
        qc = ym(qc, qb);
        qN = ym(qN, qY);
      }
      return [qy, qq, qc, qN];
    }
    function q4(qp) {
      var qz = "";
      for (var ql = qp.length * 32, qv = 0; qv < ql; qv += 8) {
        qz += String.fromCharCode(qp[qv >> 5] >>> qv % 32 & 255);
      }
      return qz;
    }
    function q5(qp) {
      var qz = [];
      qz[(qp.length >> 2) - 1] = undefined;
      qv = 0;
      for (; qv < qz.length; qv += 1) {
        qz[qv] = 0;
      }
      for (var ql = qp.length * 8, qv = 0; qv < ql; qv += 8) {
        qz[qv >> 5] |= (qp.charCodeAt(qv / 8) & 255) << qv % 32;
      }
      return qz;
    }
    function q6(qp) {
      var qz;
      var ql = "0123456789abcdef";
      var qv = "";
      for (var qb = 0; qb < qp.length; qb += 1) {
        qz = qp.charCodeAt(qb);
        qv += ql.charAt(qz >>> 4 & 15) + ql.charAt(qz & 15);
      }
      return qv;
    }
    function q7(qp) {
      return unescape(encodeURIComponent(qp));
    }
    function q8(qp) {
      return q4(q3(q5(qp = q7(qp)), qp.length * 8));
    }
    function q9(qp, qz) {
      var ql;
      var qp = q7(qp);
      var qz = q7(qz);
      var qv = q5(qp);
      var qb = [];
      var qY = [];
      qb[15] = qY[15] = undefined;
      if (qv.length > 16) {
        qv = q3(qv, qp.length * 8);
      }
      ql = 0;
      for (; ql < 16; ql += 1) {
        qb[ql] = qv[ql] ^ 909522486;
        qY[ql] = qv[ql] ^ 1549556828;
      }
      qp = q3(qb.concat(q5(qz)), 512 + qz.length * 8);
      return q4(q3(qY.concat(qp), 640));
    }
    function qd(qp, qz, ql) {
      if (qz) {
        if (ql) {
          return q9(qz, qp);
        } else {
          return q6(q9(qz, qp));
        }
      } else if (ql) {
        return q8(qp);
      } else {
        return q6(q8(qp));
      }
    }
    if (typeof define == "function" && define.amd) {
      define(function () {
        return qd;
      });
    } else if (typeof module == "object" && module.exports) {
      module.exports = qd;
    } else {
      yr.md5 = qd;
    }
  })(this);
  const vI = new function () {
    this.popUp;
    this.downer;
    this.middle;
    this.middle2;
    this.msgText;
    this.buttons = [];
    this.checkboxes = [];
    this.inputs = [];
    this.dialogPromice = null;
    this.style;
    this.option = {
      scale: 100
    };
    this.ident = 0;
    this.init = function (q3 = {}) {
      this.option = Object.assign(this.option, q3);
      yU();
      yQ();
      ym();
    };
    const ym = () => {
      document.addEventListener("keyup", q3 => {
        if (q3.key == "Escape") {
          if (this.dialogPromice) {
            const {
              func: q4,
              result: q5
            } = this.dialogPromice;
            this.dialogPromice = null;
            vI.hide();
            q4(q5);
          }
        }
      });
    };
    const yU = () => {
      this.style = document.createElement("style");
      this.setStyle(this.option.scale);
      document.head.appendChild(this.style);
    };
    this.setStyle = function (q3) {
      this.option.scale = q3;
      this.style.innerText = "\n\t.PopUp_ {\n\t\tposition: relative;\n\t\twidth: max-content;\n\t\tmin-width: 300px;\n\t\tmax-width: 600px;\n\t\tmax-height: 1000px;\n\t\tbackground-color: #190e08e6;\n\t\tz-index: 10001;\n\t\ttop: 45%;\n\t\ttransform: translate(-50%, -50%) scale(" + q3 + "%);\n\t\tleft: 50%;\n\t\tborder: 3px #ce9767 solid;\n\t\tborder-radius: 10px;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tjustify-content: space-around;\n\t\tpadding: 15px 12px;\n\t}\n\n\t.PopUp_back {\n\t\tposition: absolute;\n\t\tbackground-color: #00000066;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tz-index: 10000;\n\t\ttop: 0;\n\t\tleft: 0;\n\t}\n\n\t.PopUp_close {\n\t\twidth: 40px;\n\t\theight: 40px;\n\t\tposition: absolute;\n\t\tright: -18px;\n\t\ttop: -18px;\n\t\tborder: 3px solid #c18550;\n\t\tborder-radius: 20px;\n\t\tbackground: radial-gradient(circle, rgba(190,30,35,1) 0%, rgba(0,0,0,1) 100%);\n\t\tbackground-position-y: 3px;\n\t\tbox-shadow: -1px 1px 3px black;\n\t\tcursor: pointer;\n\t\tbox-sizing: border-box;\n\t}\n\n\t.PopUp_button:hover {\n\t\tfilter: brightness(1.2);\n\t}\n\n\t.PopUp_crossClose {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tbackground-size: 65%;\n\t\tbackground-position: center;\n\t\tbackground-repeat: no-repeat;\n\t\tbackground-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='%23f4cd73' d='M 0.826 12.559 C 0.431 12.963 3.346 15.374 3.74 14.97 C 4.215 15.173 8.167 10.457 7.804 10.302 C 7.893 10.376 11.454 14.64 11.525 14.372 C 12.134 15.042 15.118 12.086 14.638 11.689 C 14.416 11.21 10.263 7.477 10.402 7.832 C 10.358 7.815 11.731 7.101 14.872 3.114 C 14.698 2.145 13.024 1.074 12.093 1.019 C 11.438 0.861 8.014 5.259 8.035 5.531 C 7.86 5.082 3.61 1.186 3.522 1.59 C 2.973 1.027 0.916 4.611 1.17 4.873 C 0.728 4.914 5.088 7.961 5.61 7.995 C 5.225 7.532 0.622 12.315 0.826 12.559 Z'/%3e%3c/svg%3e\")\n\t}\n\n\t.PopUp_blocks {\n\t\twidth: 100%;\n\t\theight: 50%;\n\t\tdisplay: flex;\n\t\tjustify-content: space-evenly;\n\t\talign-items: center;\n\t\tflex-wrap: wrap;\n\t\tjustify-content: center;\n\t}\n\n\t.PopUp_blocks:last-child {\n\t\tmargin-top: 10px;\n\t}\n\n\t.PopUp_buttons {\n\t\tdisplay: flex;\n\t\tmargin: 10px 12px;\n\t\tflex-direction: column;\n\t}\n\n\t.PopUp_buttonsColumn {\n\t\tflex-direction: column;\n\t}\n\n\t.PopUp_buttonSelects {\n\t\tdisplay: flex;\n\t\tmargin: 10px 12px;\n\t\tflex-direction: row;\n\t}\n\n\t.PopUp_button {\n\t\tbackground-color: #52A81C;\n\t\tborder-radius: 5px;\n\t\tbox-shadow: inset 0px -4px 10px, inset 0px 3px 2px #99fe20, 0px 0px 4px, 0px -3px 1px #d7b275, 0px 0px 0px 3px #ce9767;\n\t\tcursor: pointer;\n\t\tpadding: 5px 15px 7px;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\n\t}\n\n\t.PopUp_input {\n\t\ttext-align: center;\n\t\tfont-size: 16px;\n\t\theight: 30px;\n\t\tborder: 1px solid #cf9250;\n\t\tborder-radius: 9px 9px 0px 0px;\n\t\tbackground: transparent;\n\t\tcolor: #fce1ac;\n\t\tpadding: 1px 10px;\n\t\tbox-sizing: border-box;\n\t\tbox-shadow: 0px 0px 4px, 0px 0px 0px 3px #ce9767;\n\t}\n\n\t.PopUp_inputText {\n\t\ttext-align: center;\n\t\tfont-size: 16px;\n\t\theight: 30px;\n\t\tborder: 1px solid #cf9250;\n\t\tborder-radius: 9px;\n\t\tbackground: transparent;\n\t\tcolor: #fce1ac;\n\t\tpadding: 0px 10px;\n\t\tbox-sizing: border-box;\n\t\tbox-shadow: 0px 0px 4px, 0px 0px 0px 3px #ce9767;\n\t}\n\n\t.PopUp_select {\n\t\ttext-align: center;\n\t\tfont-size: 18px;\n\t\theight: 32px;\n\t\tborder: 1px solid #cf9250;\n\t\tborder-radius: 5px 0px 0px 5px;\n\t\tbackground: #271810;\n\t\tcolor: #fce1ac;\n\t\tpadding: 1px 4px;\n\t\tbox-sizing: border-box;\n\t\tbox-shadow: 0px 0px 4px, 0px 0px 0px 3px #ce9767;\n\t}\n\n\t.PopUp_checkboxes {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tmargin: 10px 10px 5px 30px;\n\t\talign-items: flex-start;\n\t\tjustify-content: space-evenly;\n\t}\n\n\t.PopUp_checkboxesRow {\n\t\tflex-direction: row;\n\t}\n\n\t.PopUp_ContCheckbox {\n\t\tmargin: 5px 6px 0px 6px;\n\t}\n\n\t.PopUp_inputs {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tmargin: 5px 5px 5px 5px;\n\t\talign-items: center;\n\t\tjustify-content: space-evenly;\n\t}\n\n\t.PopUp_inputsRow {\n\t\tflex-direction: row;\n\t}\n\n\t.PopUp_ContInput {\n\t\tdisplay: flex;\n\t\tmargin: 5px 5px;\n\t\tflex-direction: column;\n\t}\n\n\t.PopUp_checkbox {\n\t\tposition: absolute;\n\t\tz-index: -1;\n\t\topacity: 0;\n\t}\n\t.PopUp_checkbox+label {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tuser-select: none;\n\t\tfont-size: 15px;\n\t\tfont-family: sans-serif;\n\t\tfont-weight: 600;\n\t\tfont-stretch: condensed;\n\t\tletter-spacing: 1px;\n\t\tcolor: #fce1ac;\n\t\ttext-shadow: 0px 0px 1px;\n\t\twhite-space: pre-wrap;\n        margin: 1px;\n\t}\n\t.PopUp_checkbox+label::before {\n\t\tcontent: '';\n\t\tdisplay: inline-block;\n\t\twidth: 20px;\n\t\theight: 20px;\n\t\tborder: 1px solid #cf9250;\n\t\tborder-radius: 7px;\n\t\tmargin-left: -26px;\n        position: fixed;\n\t}\n\t.PopUp_checkbox:checked+label::before {\n\t\tbackground-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2388cb13' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e\");\n\t}\n\n\t.PopUp_input::placeholder {\n\t\tcolor: #fce1ac75;\n\t}\n\n\t.PopUp_input:focus {\n\t\toutline: 0;\n\t}\n\n\t.PopUp_input + .PopUp_button {\n\t\tborder-radius: 0px 0px 5px 5px;\n\t\tpadding: 2px 18px 5px;\n\t}\n\n\t.PopUp_button:active {\n\t\tbox-shadow: inset 0px 5px 10px, inset 0px 1px 2px #99fe20, 0px 0px 4px, 0px -3px 1px #d7b275, 0px 0px 0px 3px #ce9767;\n\t}\n\n\t.PopUp_text {\n\t\tfont-size: 20px;\n\t\tfont-family: sans-serif;\n\t\tfont-weight: 600;\n\t\tfont-stretch: condensed;\n\t\twhite-space: pre-wrap;\n\t\tletter-spacing: 1px;\n\t\ttext-align: center;\n\t}\n\n\t.PopUp_buttonText {\n\t\tfont-size: 18px;\n\t\tcolor: #E4FF4C;\n\t\ttext-shadow: 0px 1px 2px black;\n\t}\n\n\t.PopUp_msgText {\n\t\tcolor: #FDE5B6;\n\t\ttext-shadow: 0px 0px 2px;\n\t}\n\n\t.PopUp_hideBlock {\n\t\tdisplay: none;\n\t}\n\t";
    };
    const yQ = () => {
      this.back = document.createElement("div");
      this.back.classList.add("PopUp_back");
      this.back.classList.add("PopUp_hideBlock");
      document.body.append(this.back);
      this.popUp = document.createElement("div");
      this.popUp.classList.add("PopUp_");
      this.back.append(this.popUp);
      let q3 = document.createElement("div");
      q3.classList.add("PopUp_blocks");
      this.popUp.append(q3);
      this.middle = document.createElement("div");
      this.middle.classList.add("PopUp_blocks");
      this.middle.classList.add("PopUp_checkboxes");
      this.popUp.append(this.middle);
      this.middle2 = document.createElement("div");
      this.middle2.classList.add("PopUp_blocks");
      this.middle2.classList.add("PopUp_inputs");
      this.popUp.append(this.middle2);
      this.downer = document.createElement("div");
      this.downer.classList.add("PopUp_blocks");
      this.popUp.append(this.downer);
      this.msgText = document.createElement("div");
      this.msgText.classList.add("PopUp_text", "PopUp_msgText");
      q3.append(this.msgText);
    };
    this.showBack = function () {
      this.back.classList.remove("PopUp_hideBlock");
    };
    this.hideBack = function () {
      this.back.classList.add("PopUp_hideBlock");
    };
    this.show = function () {
      if (this.checkboxes.length) {
        this.middle.classList.remove("PopUp_hideBlock");
      }
      if (this.inputs.length) {
        this.middle2.classList.remove("PopUp_hideBlock");
      }
      this.showBack();
      this.popUp.classList.remove("PopUp_hideBlock");
    };
    this.hide = function () {
      this.ident++;
      this.hideBack();
      this.popUp.classList.add("PopUp_hideBlock");
    };
    this.createSelect = q3 => {
      const q4 = document.createElement("select");
      q4.classList.add("PopUp_select");
      for (let q5 = 0; q5 < q3.options.length; q5++) {
        const q6 = document.createElement("option");
        if (q5 == q3.selected) {
          q6.selected = true;
        }
        q6.value = q5;
        q6.text = q3.options[q5];
        q4.add(q6);
      }
      return q4;
    };
    this.addAnyButton = q3 => {
      const q4 = document.createElement("div");
      q4.classList.add("PopUp_buttons");
      this.downer.append(q4);
      const q5 = {
        value: q3.result || q3.default
      };
      let q6 = q5;
      if (q3.isInput) {
        q6 = document.createElement("input");
        q6.type = "text";
        if (q3.placeholder) {
          q6.placeholder = q3.placeholder;
        }
        if (typeof q3.default !== "undefined") {
          q6.value = q3.default;
        }
        q6.classList.add("PopUp_input");
        q4.append(q6);
      }
      const q7 = [];
      if (q3.selects) {
        if (q3.inRow) {
          q4.classList.add("PopUp_buttonSelects");
        }
        for (let qp of q3.selects) {
          let qz = this.createSelect(qp);
          qz.id = "PopUpSelect" + q7.length;
          q7.push(qz);
          q4.append(qz);
        }
      }
      const q8 = document.createElement("div");
      q8.classList.add("PopUp_button");
      q8.title = q3.title || "";
      q4.append(q8);
      const q9 = document.createElement("div");
      q9.classList.add("PopUp_text", "PopUp_buttonText");
      q9.innerText = q3.msg;
      q8.append(q9);
      const qd = {
        button: q8,
        contButton: q4,
        inputField: q6,
        listSelects: q7
      };
      return qd;
    };
    this.addCloseButton = () => {
      let q3 = document.createElement("div");
      q3.classList.add("PopUp_close");
      this.popUp.append(q3);
      let q4 = document.createElement("div");
      q4.classList.add("PopUp_crossClose");
      q3.append(q4);
      const q5 = {
        button: q3,
        contButton: q3
      };
      return q5;
    };
    this.addButton = (q3, q4) => {
      const {
        button: q5,
        contButton: q6,
        inputField: q7,
        listSelects: q8
      } = q3.isClose ? this.addCloseButton() : this.addAnyButton(q3);
      if (q3.isClose) {
        const q9 = {
          func: q4,
          result: q3.result
        };
        this.dialogPromice = q9;
      }
      q5.addEventListener("click", () => {
        let qd = "";
        if (q3.isInput) {
          qd = q7.value;
        }
        if (q3.isClose) {
          this.dialogPromice = null;
        }
        if (q3.selects) {
          let qp = [];
          for (let ql of q8) {
            qp.push(ql.value);
          }
          const qz = {
            id: q3.result,
            results: qp
          };
          qd = qz;
          if (q3.isInput) {
            qd.input = q7.value;
          }
        }
        if (q3.multiResult) {
          let qv = {};
          for (let qY in vI.buttons) {
            qv[qY] = {};
            let qy = vI.buttons[qY].children;
            for (let qq in qy) {
              let qc = qy[qq].value;
              if (qc) {
                qv[qY][qq] = qc;
              }
            }
            if (Object.keys(qv[qY]).length == 0) {
              delete qv[qY];
            }
          }
          const qb = {
            id: q3.result,
            results: qv
          };
          qd = qb;
        }
        q4(qd);
      });
      this.buttons.push(q6);
    };
    this.clearButtons = () => {
      while (this.buttons.length) {
        this.buttons.pop().remove();
      }
    };
    function q0() {
      return async function () {
        const q3 = this.action;
        const q4 = this.checked;
        this.checked = q3 ? await q3.call(this, q4) : q4;
      };
    }
    this.addCheckBox = (q3, q4 = "") => {
      const q5 = document.createElement("div");
      q5.classList.add("PopUp_ContCheckbox");
      this.middle.append(q5);
      const q6 = document.createElement("input");
      q6.type = "checkbox";
      q6.id = "PopUpCheckbox" + this.checkboxes.length;
      q6.dataset.name = q3.name;
      q6.checked = q3.checked;
      q6.label = q3.label;
      q6.title = q3.title || "";
      q6.action = q3.action;
      q6.classList.add("PopUp_checkbox");
      q5.appendChild(q6);
      const q7 = document.createElement("label");
      q7.innerText = q3.label;
      q7.title = q3.title ?? "";
      q7.setAttribute("for", q6.id);
      q7.style = "width: " + q4 + "px;";
      q7.style.color = q3.color;
      q5.appendChild(q7);
      this.checkboxes.push(q6);
      q6.addEventListener("change", q0());
    };
    this.clearCheckBox = () => {
      this.middle.classList.add("PopUp_hideBlock");
      while (this.checkboxes.length) {
        this.checkboxes.pop().parentNode.remove();
      }
    };
    this.addInput = q3 => {
      const q4 = document.createElement("div");
      q4.classList.add("PopUp_ContInput");
      this.middle2.append(q4);
      const q5 = document.createElement("input");
      q5.type = "text";
      q5.id = "PopUpInput" + this.inputs.length;
      q5.dataset.name = q3.name;
      q5.title = q3.title || "";
      if (q3.placeholder) {
        q5.placeholder = q3.placeholder;
      }
      if (q3.default) {
        q5.value = q3.default;
      }
      q5.classList.add("PopUp_inputText");
      q4.append(q5);
      this.inputs.push(q5);
    };
    this.clearInputs = () => {
      this.middle2.classList.add("PopUp_hideBlock");
      while (this.inputs.length) {
        this.inputs.pop().parentNode.remove();
      }
    };
    this.setMsgText = q3 => {
      this.msgText.innerHTML = q3;
    };
    this.getCheckBoxes = () => {
      const q3 = [];
      for (const q4 of this.checkboxes) {
        const q5 = {
          name: q4.dataset.name,
          label: q4.label,
          checked: q4.checked
        };
        q3.push(q5);
      }
      return q3;
    };
    this.getInputs = () => {
      const q3 = [];
      for (const q4 of this.inputs) {
        const q5 = {
          name: q4.dataset.name,
          value: q4.value
        };
        q3.push(q5);
      }
      return q3;
    };
    this.confirm = async (q3, q4 = {}, q5 = {
      buttons: [{
        msg: p3(dR.BTN_OK),
        result: true,
        isInput: false
      }]
    }, q6 = {
      checkBoxes: []
    }, q7 = {
      inputs: []
    }) => {
      this.clearButtons();
      this.clearCheckBox();
      this.clearInputs();
      return new Promise((q8, q9) => {
        this.setMsgText(q3);
        if (q5?.options?.inColumn) {
          this.downer.classList.add("PopUp_buttonsColumn");
        } else {
          this.downer.classList.remove("PopUp_buttonsColumn");
        }
        if (q6?.options?.inRow) {
          this.middle.classList.add("PopUp_checkboxesRow");
        } else {
          this.middle.classList.remove("PopUp_checkboxesRow");
        }
        if (q7?.options?.inRow) {
          this.middle2.classList.add("PopUp_inputsRow");
        } else {
          this.middle2.classList.remove("PopUp_inputsRow");
        }
        for (const qd of q6.checkBoxes) {
          this.addCheckBox(qd, q6?.options?.width);
        }
        for (const qp of q7.inputs) {
          this.addInput(qp);
        }
        for (let qz of q5.buttons) {
          this.addButton(qz, ql => {
            ql = ql || qz.result;
            q8(ql);
            vI.hide();
          });
          if (qz.isClose) {
            const ql = {
              func: q8,
              result: qz.result
            };
            this.dialogPromice = ql;
          }
        }
        this.show();
        if (q4?.timeout) {
          const qv = this.ident;
          setTimeout(() => {
            if (qv == this.ident) {
              q8(q4.default ?? false);
              vI.hide();
            }
          }, Math.max(0, q4.timeout));
        }
      });
    };
  }();
  const vK = new function () {
    this.mainMenu;
    this.buttons = [];
    this.checkboxes = [];
    this.style;
    this.option = {
      showMenu: true,
      showDetails: {},
      scale: 100
    };
    this.init = function () {
      this.option.showDetails = vE("scriptMenu_showDetails", {});
      this.option.showMenu = vE("scriptMenu_show", true);
      ym();
      yU();
    };
    const ym = () => {
      this.style = document.createElement("style");
      this.setStyle(this.option.scale);
      document.head.appendChild(this.style);
    };
    this.setStyle = function (yQ) {
      this.option.scale = yQ;
      this.style.innerText = "\n\t.scriptMenu_status {\n\t\tposition: absolute;\n\t\tz-index: 10001;\n\t\twhite-space: pre-wrap;\n\t\ttop: -" + yQ * 0.01 + "px;\n\t\ttransform: translate(" + (yQ - 100) / 2 + "%, " + (yQ - 100) / 2 + "%) scale(" + yQ + "%);\n\t\tleft: " + yQ * 1.9 + "px;\n\t\tcursor: pointer;\n\t\tborder-radius: 0px 0px 15px 15px;\n\t\tbackground: #190e08e6;\n\t\tborder: 1px #ce9767 solid;\n\t\tfont-size: 15px;\n\t\tfont-family: sans-serif;\n\t\tfont-weight: 600;\n\t\tfont-stretch: condensed;\n\t\tletter-spacing: 1px;\n\t\tcolor: #fce1ac;\n\t\ttext-shadow: 0px 0px 1px;\n\t\ttransition: 0.3s;\n\t\tpadding: 2px 10px 3px;\n\t}\n\t.scriptMenu_statusHide {\n\t\ttop: -" + yQ * 0.2 + "px;\n\t\theight: 10px;\n\t\twidth: 10px;\n\t\toverflow: hidden;\n\t}\n\t.scriptMenu_label {\n\t\tposition: absolute;\n\t\ttop: 30%;\n\t\ttransform: translate(" + (yQ - 100) / 2 + "%, -50%) scale(" + yQ + "%);\n\t\tleft: -" + yQ * 0.03 + "px;\n\t\tz-index: 9999;\n\t\tcursor: pointer;\n\t\twidth: 30px;\n\t\theight: 30px;\n\t\tbackground: radial-gradient(circle, #47a41b 0%, #1a2f04 100%);\n\t\tborder: 1px solid #1a2f04;\n\t\tborder-radius: 5px;\n\t\tbox-shadow:\n\t\tinset 0px 2px 4px #83ce26,\n\t\tinset 0px -4px 6px #1a2f04,\n\t\t0px 0px 2px black,\n\t\t0px 0px 0px 2px\t#ce9767;\n\t}\n\t.scriptMenu_label:hover {\n\tfilter: brightness(1.2);\n\t}\n\t.scriptMenu_arrowLabel {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tbackground-size: 75%;\n\t\tbackground-position: center;\n\t\tbackground-repeat: no-repeat;\n\t\tbackground-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='%2388cb13' d='M7.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C.713 12.69 0 12.345 0 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z'/%3e%3cpath fill='%2388cb13' d='M15.596 7.304a.802.802 0 0 1 0 1.392l-6.363 3.692C8.713 12.69 8 12.345 8 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692Z'/%3e%3c/svg%3e\");\n\t\tbox-shadow: 0px 1px 2px #000;\n\t\tborder-radius: 5px;\n\t\tfilter: drop-shadow(0px 1px 2px #000D);\n\t}\n\t.scriptMenu_main {\n\t\tposition: absolute;\n\t\tmax-width: 285px;\n\t\tz-index: 9999;\n\t\ttop: 50%;\n\t\ttransform: translate(" + (yQ - 100) / 2 + "%, -50%) scale(" + yQ + "%);\n\t\tbackground: #190e08e6;\n\t\tborder: 1px #ce9767 solid;\n\t\tborder-radius: 0px 20px 20px 0px;\n\t\tborder-left: none;\n\t\tpadding: 5px 10px 5px 5px;\n\t\tbox-sizing: border-box;\n\t\tfont-size: 15px;\n\t\tfont-family: sans-serif;\n\t\tfont-weight: 600;\n\t\tfont-stretch: condensed;\n\t\tletter-spacing: 1px;\n\t\tcolor: #fce1ac;\n\t\ttext-shadow: 0px 0px 1px;\n\t\ttransition: 1s;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tflex-wrap: nowrap;\n\t}\n\t.scriptMenu_showMenu {\n\t\tdisplay: none;\n\t}\n\t.scriptMenu_showMenu:checked~.scriptMenu_main {\n\t\tleft: 0px;\n\t}\n\t.scriptMenu_showMenu:not(:checked)~.scriptMenu_main {\n\t\tleft: -" + yQ * 3 + "px;\n\t}\n\t.scriptMenu_divInput {\n\t\tmargin: 2px 1px 2px 1px;\n\t}\n\t.scriptMenu_divInputText {\n\t\tmargin: 2px;\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t}\n\t.scriptMenu_checkbox {\n\t\tposition: absolute;\n\t\tz-index: -1;\n\t\topacity: 0;\n\t}\n\t.scriptMenu_checkbox+label {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tuser-select: none;\n\t}\n\t.scriptMenu_checkbox+label::before {\n\t\tcontent: '';\n\t\tdisplay: inline-block;\n\t\twidth: 20px;\n\t\theight: 20px;\n\t\tborder: 1px solid #cf9250;\n\t\tborder-radius: 7px;\n\t\tmargin-right: 4px;\n\t}\n\t.scriptMenu_checkbox:checked+label::before {\n\t\tbackground-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2388cb13' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e\");\n\t}\n\t.scriptMenu_close {\n\t\twidth: 40px;\n\t\theight: 40px;\n\t\tposition: absolute;\n\t\tright: -18px;\n\t\ttop: -18px;\n\t\tborder: 3px solid #c18550;\n\t\tborder-radius: 20px;\n\t\tbackground: radial-gradient(circle, rgba(190,30,35,1) 0%, rgba(0,0,0,1) 100%);\n\t\tbackground-position-y: 3px;\n\t\tbox-shadow: -1px 1px 3px black;\n\t\tcursor: pointer;\n\t\tbox-sizing: border-box;\n\t}\n\t.scriptMenu_close:hover {\n\t\tfilter: brightness(1.2);\n\t}\n\t.scriptMenu_crossClose {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tbackground-size: 65%;\n\t\tbackground-position: center;\n\t\tbackground-repeat: no-repeat;\n\t\tbackground-image: url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='%23f4cd73' d='M 0.826 12.559 C 0.431 12.963 3.346 15.374 3.74 14.97 C 4.215 15.173 8.167 10.457 7.804 10.302 C 7.893 10.376 11.454 14.64 11.525 14.372 C 12.134 15.042 15.118 12.086 14.638 11.689 C 14.416 11.21 10.263 7.477 10.402 7.832 C 10.358 7.815 11.731 7.101 14.872 3.114 C 14.698 2.145 13.024 1.074 12.093 1.019 C 11.438 0.861 8.014 5.259 8.035 5.531 C 7.86 5.082 3.61 1.186 3.522 1.59 C 2.973 1.027 0.916 4.611 1.17 4.873 C 0.728 4.914 5.088 7.961 5.61 7.995 C 5.225 7.532 0.622 12.315 0.826 12.559 Z'/%3e%3c/svg%3e\")\n\t}\n\t.scriptMenu_button {\n\t\tuser-select: none;\n\t\tborder-radius: 10px;\n\t\tcursor: pointer;\n\t\tpadding: 5px 10px 8px;\n\t\tmargin: 4px;\n\t\tbackground: radial-gradient(circle, rgba(165,120,56,1) 80%, rgba(0,0,0,1) 110%);\n\t\tbox-shadow: inset 0px -4px 6px #442901, inset 0px 1px 6px #442901, inset 0px 0px 6px, 0px 0px 4px, 0px 0px 0px 2px #ce9767;\n\t}\n\t.scriptMenu_button:hover {\n\t\tfilter: brightness(1.2);\n\t}\n\t.scriptMenu_button:active {\n\t\tbox-shadow: inset 0px 4px 6px #442901, inset 0px 4px 6px #442901, inset 0px 0px 6px, 0px 0px 4px, 0px 0px 0px 2px #ce9767;\n\t}\n\t.scriptMenu_buttonText {\n\t\tcolor: #fce5b7;\n\t\ttext-shadow: 0px 1px 2px black;\n\t\ttext-align: center;\n\t}\n\t.scriptMenu_header {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tfont-size: 15px;\n\t\twhite-space: pre-wrap;\n\t}\n\t.scriptMenu_header a {\n\t\tcolor: #fce5b7;\n\t\ttext-decoration: none;\n\t}\n\t.scriptMenu_InputText {\n\t\ttext-align: center;\n\t\twidth: 130px;\n\t\theight: 23px;\n\t\tborder: 1px solid #cf9250;\n\t\tborder-radius: 9px;\n\t\tbackground: transparent;\n\t\tcolor: #fce1ac;\n\t\tpadding: 0px 10px;\n\t\tbox-sizing: border-box;\n\t}\n\t.scriptMenu_InputText:focus {\n\t\tfilter: brightness(1.2);\n\t\toutline: 0;\n\t}\n\t.scriptMenu_InputText::placeholder {\n\t\tcolor: #fce1ac75;\n\t}\n\t.scriptMenu_Summary {\n\t\tcursor: pointer;\n\t\tmargin-left: 7px;\n\t}\n\t.scriptMenu_Details {\n\t\talign-self: auto;\n\t}\n";
    };
    const yU = () => {
      const yQ = document.createElement("div");
      document.body.appendChild(yQ);
      this.statusFirst = document.createElement("div");
      this.statusFirst.classList.add("scriptMenu_status");
      yQ.appendChild(this.statusFirst);
      this.statusSecond = document.createElement("div");
      this.statusSecond.classList.add("scriptMenu_status");
      yQ.appendChild(this.statusSecond);
      this.setStatusSecond("");
      this.setStatusFirst("");
      const q0 = document.createElement("label");
      q0.classList.add("scriptMenu_label");
      q0.setAttribute("for", "checkbox_showMenu");
      yQ.appendChild(q0);
      const q1 = document.createElement("div");
      q1.classList.add("scriptMenu_arrowLabel");
      q0.appendChild(q1);
      const q2 = document.createElement("input");
      const q3 = this;
      q2.type = "checkbox";
      q2.id = "checkbox_showMenu";
      q2.checked = this.option.showMenu;
      q2.classList.add("scriptMenu_showMenu");
      yQ.appendChild(q2);
      q2.addEventListener("change", () => {
        q3.option.showMenu = q2.checked;
        va("scriptMenu_show", q3.option.showMenu);
      });
      this.mainMenu = document.createElement("div");
      this.mainMenu.classList.add("scriptMenu_main");
      yQ.appendChild(this.mainMenu);
      const q4 = document.createElement("label");
      q4.classList.add("scriptMenu_close");
      q4.setAttribute("for", "checkbox_showMenu");
      this.mainMenu.appendChild(q4);
      const q5 = document.createElement("div");
      q5.classList.add("scriptMenu_crossClose");
      q4.appendChild(q5);
    };
    this.setStatus = (yQ, q0, q1) => {
      if (!q0) {
        this[yQ].classList.add("scriptMenu_statusHide");
        this[yQ].innerHTML = "";
      } else {
        this[yQ].classList.remove("scriptMenu_statusHide");
        this[yQ].innerHTML = q0;
      }
      if (typeof q1 == "function") {
        this[yQ].addEventListener("click", q1, {
          once: true
        });
      }
      this.statusSecond.style.left = this.option.scale * (2 + this.statusFirst.clientWidth / 100) + "px";
    };
    this.setStatusFirst = (yQ, q0) => {
      this.setStatus("statusFirst", yQ, q0);
    };
    this.setStatusSecond = (yQ, q0) => {
      this.setStatus("statusSecond", yQ, q0);
    };
    this.addStatus = (yQ, q0) => {
      if (!this[yQ].innerHTML) {
        this[yQ].classList.remove("scriptMenu_statusHide");
      }
      this[yQ].innerHTML += q0;
    };
    this.addStatusFirst = yQ => {
      this.addStatus("statusFirst", yQ);
    };
    this.addStatusSecond = yQ => {
      this.addStatus("statusSecond", yQ);
    };
    this.addHeader = (yQ, q0, q1) => {
      q1 = q1 ?? this.mainMenu;
      const q2 = document.createElement("div");
      q2.classList.add("scriptMenu_header");
      q2.innerHTML = yQ;
      if (typeof q0 == "function") {
        q2.addEventListener("click", q0);
      }
      q1.appendChild(q2);
      return q2;
    };
    this.addButton = (yQ, q0, q1, q2, q3, q4) => {
      q4 = q4 ?? this.mainMenu;
      const q5 = document.createElement("div");
      q5.classList.add("scriptMenu_button");
      q5.title = q1;
      q5.hidden = q2 ?? false;
      q5.style.color = q3;
      q5.addEventListener("click", q0);
      q4.appendChild(q5);
      const q6 = document.createElement("div");
      q6.classList.add("scriptMenu_buttonText");
      q6.innerText = yQ;
      q5.appendChild(q6);
      this.buttons.push(q5);
      return q5;
    };
    this.addCheckbox = (yQ, q0, q1, q2, q3) => {
      q1 = q1 ?? this.mainMenu;
      const q4 = document.createElement("div");
      q4.classList.add("scriptMenu_divInput");
      q4.title = q0;
      q4.hidden = q2 ?? false;
      q1.appendChild(q4);
      const q5 = document.createElement("input");
      q5.type = "checkbox";
      q5.id = "scriptMenuCheckbox" + this.checkboxes.length;
      q5.classList.add("scriptMenu_checkbox");
      q4.appendChild(q5);
      const q6 = document.createElement("label");
      q6.innerText = yQ;
      q6.style.color = q3;
      q6.setAttribute("for", q5.id);
      q4.appendChild(q6);
      this.checkboxes.push(q5);
      const q7 = {
        checkbox: q5,
        divCheckbox: q4
      };
      return q7;
    };
    this.addInputText = (yQ, q0, q1) => {
      q1 = q1 ?? this.mainMenu;
      const q2 = document.createElement("div");
      q2.classList.add("scriptMenu_divInputText");
      q2.title = yQ;
      q1.appendChild(q2);
      const q3 = document.createElement("input");
      q3.type = "text";
      if (q0) {
        q3.placeholder = q0;
      }
      q3.classList.add("scriptMenu_InputText");
      q2.appendChild(q3);
      return q3;
    };
    this.addDetails = (yQ, q0, q1, q2) => {
      const q3 = document.createElement("details");
      q3.classList.add("scriptMenu_Details");
      q3.hidden = q0 ?? false;
      this.mainMenu.appendChild(q3);
      const q4 = document.createElement("summary");
      q4.classList.add("scriptMenu_Summary");
      q4.innerText = yQ;
      q4.style.color = q2;
      if (q1) {
        const q5 = this;
        q3.open = this.option.showDetails[q1];
        q3.dataset.name = q1;
        q4.addEventListener("click", () => {
          q5.option.showDetails[q3.dataset.name] = !q3.open;
          va("scriptMenu_showDetails", q5.option.showDetails);
        });
      }
      q3.appendChild(q4);
      return q3;
    };
  }();
  class vJ {
    constructor(yr, ym) {
      this.dbName = yr;
      this.storeName = ym;
      this.db = null;
    }
    async open() {
      return new Promise((yr, ym) => {
        const yU = indexedDB.open(this.dbName);
        yU.onerror = () => {
          ym(new Error("Failed to open database " + this.dbName));
        };
        yU.onsuccess = () => {
          this.db = yU.result;
          yr();
        };
        yU.onupgradeneeded = yQ => {
          const q0 = yQ.target.result;
          if (!q0.objectStoreNames.contains(this.storeName)) {
            q0.createObjectStore(this.storeName);
          }
        };
      });
    }
    async set(yr, ym) {
      return new Promise((yU, yQ) => {
        const q0 = this.db.transaction([this.storeName], "readwrite");
        const q1 = q0.objectStore(this.storeName);
        const q2 = q1.put(ym, yr);
        q2.onerror = () => {
          yQ(new Error("Failed to save value with key " + yr));
        };
        q2.onsuccess = () => {
          yU();
        };
      });
    }
    async get(yr, ym) {
      return new Promise((yU, yQ) => {
        const q0 = this.db.transaction([this.storeName], "readonly");
        const q1 = q0.objectStore(this.storeName);
        const q2 = q1.get(yr);
        q2.onerror = () => {
          yU(ym);
        };
        q2.onsuccess = () => {
          yU(q2.result);
        };
      });
    }
    async delete(yr) {
      return new Promise((ym, yU) => {
        const yQ = this.db.transaction([this.storeName], "readwrite");
        const q0 = yQ.objectStore(this.storeName);
        const q1 = q0.delete(yr);
        q1.onerror = () => {
          yU(new Error("Failed to delete value with key " + yr));
        };
        q1.onsuccess = () => {
          ym();
        };
      });
    }
  }
  function vE(yr, ym = null) {
    try {
      if (localStorage[yr]) {
        return JSON.parse(localStorage[yr]);
      } else {
        return ym;
      }
    } catch (yQ) {
      return ym;
    }
  }
  async function va(yr, ym) {
    try {
      localStorage[yr] = JSON.stringify(ym);
    } catch (yU) {
      if (await vI.confirm(p3(dR.THROW_ERROR) + ": " + yU.name + "\n(" + yU.message + ")\n" + p3(dR.CLEAR_STORAGE), {}, {
        buttons: [{
          isClose: true,
          result: false
        }, {
          msg: p3(dR.BTN_YES),
          result: true
        }]
      })) {
        try {
          localStorage.clear();
          localStorage[yr] = JSON.stringify(ym);
        } catch (q0) {
          localStorage.clear();
        }
      }
    }
  }
  function vo(yr, ym) {
    return vm.get(yr, ym);
  }
  function vu(yr, ym) {
    vm.set(yr, ym);
  }
  async function vP(yr, ym = 0) {
    let yU = [];
    let yQ = {};
    for (let q0 of yr) {
      let q1 = z8[q0];
      if (!q1) {
        yU.push(q0);
      }
      yQ[q0] = q1;
    }
    if (yU.length > 0) {
      let q2 = await lf(yU);
      if (q2) {
        for (let q3 of yU) {
          yQ[q3] = q2[q3];
          z8[q3] = q2[q3] ?? {};
        }
      }
    }
    return yQ;
  }
  async function vT(yr, ym) {
    return (await vP([yr], ym))[yr];
  }
  async function ve(yr, ym, yU) {
    let yQ = ym * 3600000;
    let q0 = [];
    let q1 = {};
    for (let q2 of yr) {
      let q3 = vE(q2, {});
      let q4 = q3?.data;
      if (!q3?.data || Date.now() - q3.time > yQ) {
        q0.push(q2);
      }
      q1[q2] = q4;
    }
    if (q0.length > 0) {
      let q5 = await lf(q0);
      if (q5) {
        for (let q6 of q0) {
          q1[q6] = q5[q6];
          await va(q6, {
            data: q5[q6],
            time: Date.now()
          });
        }
      }
    }
    return q1;
  }
  async function vx(yr, ym, yU) {
    return (await ve([yr], ym, yU))[yr];
  }
  const vr = new vJ(GM_info.script.name, "settings");
  const vm = {
    userId: 0,
    values: [...Object.entries(p7).map(yr => ({
      [yr[0]]: yr[1].default
    })), ...Object.entries(pp).map(yr => ({
      [yr[0]]: yr[1].default
    }))].reduce((yr, ym) => ({
      ...yr,
      ...ym
    }), {}),
    name: GM_info.script.name,
    get: function (yr, ym) {
      if (yr in this.values) {
        return this.values[yr];
      }
      return ym;
    },
    set: function (yr, ym) {
      this.values[yr] = ym;
      vr.set(this.userId, this.values).catch(yU => null);
      localStorage[this.name + ":" + yr] = JSON.stringify(ym);
    },
    delete: function (yr) {
      delete this.values[yr];
      vr.set(this.userId, this.values);
      delete localStorage[this.name + ":" + yr];
    }
  };
  function vU(yr) {
    const ym = [];
    for (let yU = 0; yU < localStorage.length; yU++) {
      const yQ = localStorage.key(yU);
      if (yQ.startsWith(yr)) {
        const q0 = localStorage.getItem(yQ);
        const q1 = yQ.split(":")[1];
        const q2 = {
          key: q1,
          val: q0
        };
        ym.push(q2);
      }
    }
    return ym;
  }
  async function vQ(yr) {
    vm.userId = yr;
    try {
      await vr.open();
    } catch (yQ) {
      return;
    }
    let ym = await vr.get(yr, false);
    if (ym) {
      vm.values = ym;
      return;
    }
    const yU = vU(GM_info.script.name);
    for (const q0 of yU) {
      let q1 = null;
      try {
        q1 = JSON.parse(q0.val);
      } catch {
        break;
      }
      vm.values[q0.key] = q1;
    }
    await vr.set(yr, vm.values);
  }
  function b0(yr, ym, yU) {
    if (typeof yr == "string") {
      yr = JSON.parse(yr);
    }
    for (const q1 of yr.calls) {
      v6(q1.name);
      if (!q1?.context?.actionTs) {
        q1.context = {
          actionTs: Math.floor(performance.now())
        };
      }
    }
    yr = JSON.stringify(yr);
    let yQ = dk;
    yQ["X-Request-Id"]++;
    yQ["X-Auth-Signature"] = dd.getSignature(yQ, yr);
    let q0 = new XMLHttpRequest();
    q0.open("POST", de, true);
    q0.onreadystatechange = function () {
      if (q0.readyState == 4) {
        let q2 = q0.response;
        let q3 = q2?.error;
        let q4 = Date.now();
        let q5 = pz("delay") * 1000;
        let q6 = q5 / 3;
        let q7 = p1(q6, q6 * 5);
        let q8 = Math.max(q7 - q4 + pv, 0);
        pv = q4 + q8;
        if (q2) {
          if (!q2.results) {
            q2.results = [];
          }
          if (q3) {
            v7(q2.error.name);
            console.error(q3);
          }
          q2.results.forEach(q9 => {
            const qd = q9?.result?.response;
            const qp = dT[this.uniqid].calls;
            if (qd?.error) {
              v7((Object.entries(qp).find(qz => qz[1] == q9.ident)?.[0] ?? "") + "_" + (qd.reason ?? ""));
              console.error(qd);
            }
          });
        }
        if (q8 > 0) {
          console.log("Delay: " + q8 / 1000 + " sec");
        }
        setTimeout(ym, q8, q2, yU);
      }
    };
    q0.responseType = "json";
    for (let q2 in yQ) {
      let q3 = yQ[q2];
      q0.setRequestHeader(q2, q3);
    }
    q0.send(yr);
  }
  let b1 = [0, 0];
  function b2(yr, ym = 0) {
    clearTimeout(b1[0]);
    b1[0] = setTimeout(function () {
      if (!yr || yr.type || vK.statusFirst.innerHTML == yr) {
        vK.setStatusFirst("");
      }
    }, ym);
  }
  function b3(yr, ym = 0, yU = b2) {
    vK.setStatusFirst(yr, yU);
    if (ym > 0) {
      b2(yr, ym);
    }
  }
  function b4(yr, ym = 0) {
    clearTimeout(b1[1]);
    b1[1] = setTimeout(function () {
      if (!yr || yr.type || vK.statusSecond.innerHTML == yr) {
        vK.setStatusSecond("");
      }
    }, ym);
  }
  function b5(yr, ym = 0, yU = b4) {
    vK.setStatusSecond(yr, yU);
    if (ym > 0) {
      b4(yr, ym);
    }
  }
  function b6(yr) {
    vK.addStatusFirst(yr);
  }
  function b7(yr) {
    vK.addStatusSecond(yr);
  }
  function b8(yr) {
    if (pP < Date.now()) {
      return yr / 1.45 + 3;
    }
    return yr / 5 + 2;
  }
  function b9(yr, ym, yU = true) {
    ym = ym ?? p3(dR.TIMER);
    const yQ = Date.now() + yr * 1000;
    pN = false;
    return new Promise(q0 => {
      const q1 = setInterval(async () => {
        const q2 = Date.now();
        b5(ym + " " + ((yQ - q2) / 1000).toFixed(1), 0);
        if (q2 > yQ || pK || pN) {
          clearInterval(q1);
          b5(yU ? "" : ym);
          q0();
        }
      }, 100);
    });
  }
  async function bd(yr = 0) {
    return await new Promise(ym => setTimeout(ym, yr));
  }
  async function bp(yr, ym, yU) {
    let yQ = {};
    while (ym) {
      b3(p3(dR.TOTAL_OPEN) + " " + yU);
      const q1 = {
        libId: yr,
        amount: ym
      };
      const q2 = {
        name: "consumableUseLootBox",
        args: q1,
        ident: "consumableUseLootBox"
      };
      const q3 = [q2];
      const q4 = await dd.Send({
        calls: q3
      }).then(q5 => q5.results[0].result.response);
      lU(q4, yQ);
      yU += ym;
      ym = Object.values(q4).pop()?.consumable?.[yr] ?? 0;
    }
    b3(p3(dR.TOTAL_OPEN) + " " + yU, 5000);
    const q0 = {
      count: yU,
      rewards: yQ
    };
    return q0;
  }
  async function bz() {
    const yr = pl.sanctuary.button;
    if (yr) {
      yr.style.color = "";
      yr.title = pl.sanctuary.title;
      if (px.amount) {
        const ym = Math.min(px.amount, 3);
        const yU = ((1 - ym / 3) * 125).floor(0);
        yr.style.color = "rgb(255," + yU + "," + yU + ")";
        yr.title += "\n" + px.amount + " " + p3(dR.PORTALS);
      }
    }
  }
  async function bl() {
    const yr = pl.clanWar.button;
    if (yr) {
      const ym = pm?.myTries ?? 0;
      const yU = pU?.war ?? 0;
      yr.style.color = "";
      yr.title = pl.clanWar.title;
      let yQ = 0;
      if (ym && !pm?.arePointsMax) {
        yQ += ym * 2;
        const q0 = ((5 - yQ) * 125 / 10).floor(0);
        yr.style.color = "rgb(255," + q0 + "," + q0 + ")";
        yr.title += "\n    " + p3(dR.GUILD_WAR) + ": \n        " + p3(dR.ATTEMPTS) + ": " + ym;
      }
      if (yU && yU.points != "7500") {
        const q1 = (yU.myTries?.heroes ?? 0) * 1;
        const q2 = (yU.myTries?.titans ?? 0) * 1;
        const q3 = q1 + q2;
        if (q3 > 0) {
          yQ += q3;
          const q4 = ((10 - yQ) * 125 / 10).floor(0);
          yr.style.color = "rgb(255," + q4 + "," + q4 + ")";
          yr.title += "\n    " + p3(dR.CLASH_WORLDS) + ": \n        " + p3(dR.ATTEMPTS) + " " + p3(dR.HEROES) + ": " + q1 + "\n        " + p3(dR.ATTEMPTS) + " " + p3(dR.TITANS) + ": " + q2;
        }
      }
    }
  }
  function bv(yr) {
    let ym = 0;
    for (let yU in yr) {
      if (yr[yU].attackScore == 250) {
        ym++;
      }
    }
    return ym;
  }
  async function bb() {
    const yr = pl.titanValley.button;
    if (yr) {
      yr.style.color = "";
      yr.title = pl.titanValley.title;
      if (pQ?.status == "battle") {
        const ym = +pQ.tier;
        const yU = pQ.rivals;
        const yQ = bv(yU);
        const q0 = Object.keys(yU).length - yQ;
        const q1 = ym + yQ / 9;
        if (q1 < 8) {
          const q2 = (q1 * 125 / 8).floor(0);
          yr.style.color = "rgb(255," + q2 + "," + q2 + ")";
          yr.title += "\n" + p3(dR.TOE_STAGE) + ": " + ym + "\n" + p3(dR.ALIVE_RIVAL) + ": " + q0;
        }
      }
    }
  }
  async function bY(yr) {
    const ym = pl.asgard.button;
    if (ym && z0?.boss?.timestamps) {
      ym.style.color = "";
      ym.title = pl.asgard.title;
      if (z0.boss.timestamps.start < yr && z0.bossAttempts > 0) {
        const yU = ((1 - z0.bossAttempts / 6) * 125).floor(0);
        ym.style.color = "rgb(255," + yU + "," + yU + ")";
        ym.title += "\n" + p3(dR.ATTEMPTS) + " " + p3(dR.VS_BOSS) + ": " + z0.bossAttempts;
      } else if (z0.attempts > 0) {
        const yQ = ((1 - z0.attempts / 10) * 125).floor(0);
        ym.style.color = "rgb(255," + yQ + "," + yQ + ")";
        ym.title += "\n" + p3(dR.ATTEMPTS) + " " + p3(dR.VS_MINIONS) + ": " + z0.attempts;
      }
    }
  }
  async function by(yr) {
    const ym = pl.dungeon.button;
    if (ym) {
      ym.style.color = "";
      ym.title = pl.dungeon.title;
      if (yr < 300) {
        const yU = (yr * 125 / 300).floor(0);
        ym.style.color = "rgb(255," + yU + "," + yU + ")";
        ym.title += "\n" + p3(dR.TITANITE_COLLECT) + ": " + yr + "/300";
      }
    }
  }
  async function bq() {
    return new Promise(async (yr, ym) => {
      const yU = ["userGetInfo", "clanWarGetInfo", "crossClanWar_getInfo", "titanArenaGetStatus", "clanRaid_getInfo", "clanGetInfo"].map(q5 => ({
        name: q5,
        args: {},
        ident: q5
      }));
      const yQ = {
        calls: yU
      };
      const q0 = await dd.Send(yQ);
      const q1 = q0.results;
      if (!q1) {
        console.log(p3(dR.CHECK_STATE_FAIL));
        return;
      }
      px = q1[0].result.response.refillable.find(q5 => q5.id == 45);
      pm = q1[1].result.response;
      pU = q1[2].result.response;
      pQ = q1[3].result.response;
      z0 = q1[4].result.response;
      const q4 = q1[5].result.response ?? {
        stat: {
          todayDungeonActivity: 0
        }
      };
      bz();
      bl();
      bb();
      bY(q0.date);
      by(q4.stat.todayDungeonActivity);
      yr();
    });
  }
  function bc() {
    const yr = +(dG?.vipPoints ?? "150000");
    const ym = dv.lib.level.vip;
    let yU = 0;
    for (let yQ in ym) {
      let q0 = ym[yQ];
      if (yr >= q0.vipPoints) {
        yU = q0.level;
      }
    }
    return +yU;
  }
  function bN() {
    return bc() >= 5 || pe;
  }
  function bC() {
    return bc() > 0 || pe;
  }
  async function bW() {
    const yU = await dd.Send({
      calls: [{
        name: "dailyBonusGetInfo",
        args: {},
        ident: "body"
      }]
    }).then(qz => qz.results[0].result.response);
    const {
      availableToday: yQ,
      availableVip: q0,
      currentDay: q1
    } = yU;
    if (!yQ) {
      console.log(p3(dR.NOTHING_TO_COLLECT));
      return {};
    }
    const q2 = dv.lib.dailyBonusStatic;
    const q3 = bc();
    const q4 = q2[q1 + "_0_0"].vipLevelDouble;
    const q5 = [{
      name: "dailyBonusFarm",
      args: {
        vip: q0 && q3 >= q4 ? 1 : 0
      },
      ident: "body"
    }];
    const q6 = await dd.Send({
      calls: q5
    });
    if (q6.error) {
      return {};
    }
    const q7 = q6.results[0].result.response;
    const q8 = Object.keys(q7).pop();
    const q9 = Object.keys(q7[q8]).pop();
    const qd = {};
    console.log(p3(dR.DAILY_BONUS) + ": " + p3(dR.RECEIVED) + " " + q7[q8][q9] + " " + dv.translate("LIB_" + q8.toUpperCase() + "_NAME_" + q9), q7);
    lU([q7], qd);
    const qp = {
      rewards: qd
    };
    return qp;
  }
  async function bh() {
    let yr = ["shopGetAll", "inventoryGet"].map(q6 => ({
      name: q6,
      args: {},
      ident: q6
    }));
    let ym = await dd.Send({
      calls: yr
    }).then(q6 => q6.results.map(q7 => q7.result.response));
    let yU = ym[0];
    let yQ = ym[1];
    let q0 = dG.gold;
    yr = [];
    if (yU[17]) {
      const q6 = yU[17].slots;
      for (let q8 = 1; q8 <= 2; q8++) {
        if (!q6[q8].bought) {
          const q9 = q6[q8].cost.gold;
          if (q9 <= q0) {
            q0 -= q9;
            const qd = {
              shopId: 17,
              slot: q8,
              cost: q6[q8].cost,
              reward: q6[q8].reward
            };
            const qp = {
              name: "shopBuy",
              args: qd,
              ident: "shopBuy_" + q8
            };
            yr.push(qp);
          }
        }
      }
      const q7 = q6[4];
      if (!q7.bought) {
        const qz = q7.cost.coin[25];
        const ql = yQ.coin[25] ?? 0;
        if (qz <= ql) {
          yQ.coin[25] -= qz;
          const qv = {
            shopId: 17,
            slot: 4,
            cost: q7.cost,
            reward: q7.reward
          };
          const qb = {
            name: "shopBuy",
            args: qv,
            ident: "shopBuy_" + 3
          };
          yr.push(qb);
        }
      }
    }
    if (yU[1]) {
      const qY = yU[1].slots;
      for (let qy = 4; qy <= 6; qy++) {
        if (!qY[qy].bought && qY[qy]?.cost?.gold) {
          const qq = qY[qy].cost.gold;
          if (qq <= q0) {
            q0 -= qq;
            const qc = {
              shopId: 1,
              slot: qy,
              cost: qY[qy].cost,
              reward: qY[qy].reward
            };
            const qN = {
              name: "shopBuy",
              args: qc,
              ident: "shopBuy_" + qy
            };
            yr.push(qN);
          }
        }
      }
    }
    if (!yr.length) {
      b3(p3(dR.NOTHING_BUY), 5000);
      return {};
    }
    const q1 = {
      calls: yr
    };
    const q2 = await dd.Send(q1).then(qC => qC.results.map(qW => qW.result.response));
    const q3 = {};
    if (q2.length) {
      for (let qC of yr) {
        dv.updateShopSlot(qC.args.shopId, qC.args.slot);
      }
    }
    const q4 = {
      countBuy: q2.length
    };
    b3(p3(dR.LOTS_BOUGHT, q4), 5000);
    lU(q2, q3);
    const q5 = {
      rewards: q3
    };
    return q5;
  }
  async function bn(yr = false) {
    const ym = ["userGetInfo", "adventure_raidGetInfo"].map(q9 => ({
      name: q9,
      args: {},
      ident: q9
    }));
    const yU = await dd.Send({
      calls: ym
    }).then(q9 => q9.results.map(qd => qd.result.response));
    px = yU[0].refillable.find(q9 => q9.id == 45);
    const yQ = Object.entries(yU[1].raid).filter(q9 => q9[1]).pop();
    const q0 = yQ ? yQ[0] : 0;
    if (!px.amount || !q0) {
      b3(p3(dR.RAID_NOT_AVAILABLE), 5000);
      return {};
    }
    const q1 = {
      adventureId: q0
    };
    let q3 = yr ? px.amount : await vI.confirm(p3(dR.RAID_ADVENTURE, q1), {}, {
      buttons: [{
        result: 0,
        isClose: true
      }, {
        msg: p3(dR.RAID),
        isInput: true,
        default: px.amount
      }]
    });
    q3 = p0(q3, 0, 0, px.amount);
    if (!q3) {
      return {};
    }
    pC = true;
    const q4 = {
      adventureId: q0
    };
    const q5 = await dd.Send({
      calls: [...Array(q3)].map((q9, qd) => ({
        name: "adventure_raid",
        args: q4,
        ident: "body_" + qd
      }))
    }).then(q9 => q9.results.map(qd => qd.result.response.rewards));
    const q6 = {};
    pC = false;
    if (!q5.length) {
      console.log(q5);
      b3(p3(dR.SOMETHING_WENT_WRONG), 5000);
      return {};
    }
    for (let q9 of q5) {
      lU(q9, q6);
    }
    console.log(q0, px.amount);
    const q7 = {
      adventureId: q0,
      times: q5.length
    };
    b3(p3(dR.ADVENTURE_COMPLETED, q7), 5000);
    if (!yr) {
      dv.refreshGame();
      dv.showLootboxReward(q6);
    }
    const q8 = {
      rewards: q6
    };
    return q8;
  }
  function bg() {
    let ym = "gifts_" + dG.id;
    let yU = vE(ym, "");
    let yQ = z8[zc].split(";");
    let q0 = {
      calls: []
    };
    while (yQ.length) {
      let q1 = yQ.pop();
      if (!yU.includes(q1)) {
        const q3 = {
          user: {
            referrer: {}
          },
          giftId: q1
        };
        q0.calls.push({
          name: "registration",
          args: q3,
          context: {
            actionTs: performance.now().floor(0),
            cookie: window?.NXAppInfo?.session_id || null
          },
          ident: q1
        });
      }
    }
    if (q0.calls.length > 0) {
      dd.Send(q0).then(q4 => {
        let q5 = 0;
        let q6 = [];
        for (let q8 of q4.results) {
          q6.push(q8.ident);
          if (q8.result.response != null) {
            q5++;
          }
        }
        va(ym, [...yU.split(";"), ...q6].slice(-50).join(";"));
        const q7 = {
          count: q5
        };
        console.log(p3(dR.COLLECT_GIFTS, q7));
      });
    } else {
      console.log(p3(dR.NO_GIFTS));
    }
  }
  function bZ() {
    return new Promise((yr, ym) => {
      const yU = new bf(yr, ym);
      yU.start();
    });
  }
  class bf {
    constructor(yr, ym) {
      this.resolve = yr;
      this.reject = ym;
    }
    async start() {
      let yr = ["expeditionGet", "heroGetAll"].map(q8 => ({
        name: q8,
        args: {},
        ident: q8
      }));
      let ym = await dd.Send({
        calls: yr
      });
      let yU = {};
      if (ym.error) {
        console.error(p3(dR.RUN_EXPED_FAIL));
        return;
      }
      let q0 = ym.results[0].result.response;
      let q1 = ym.results[1].result.response;
      let q2 = {
        useHeroes: [],
        exped: []
      };
      yr = [];
      let q3 = 0;
      for (let q8 in q0) {
        const q9 = q0[q8];
        const qd = Date.now() / 1000;
        if (q9.status == 2 && q9.endTime != 0 && qd > q9.endTime) {
          q3++;
          const qp = {
            expeditionId: q9.id
          };
          const qz = {
            name: "expeditionFarm",
            args: qp,
            ident: "expeditionFarm_" + q9.id
          };
          yr.push(qz);
        }
      }
      if (yr.length) {
        const ql = {
          calls: yr
        };
        const qv = await dd.Send(ql).then(qb => qb.results.map(qY => qY.result.response.reward));
        lU(qv, yU);
      }
      yr = [{
        name: "expeditionGet",
        args: {},
        ident: "expeditionGet"
      }];
      const q5 = {
        calls: yr
      };
      ym = await dd.Send(q5);
      q0 = ym.results[0].result.response;
      yr = [];
      for (let qb in q0) {
        const qY = q0[qb];
        q2.useHeroes = q2.useHeroes.concat(qY.heroes);
        if (qY.status == 1) {
          const qy = {
            id: qY.id,
            power: qY.power
          };
          q2.exped.push(qy);
        }
      }
      q2.exped = q2.exped.sort((qq, qc) => qc.power - qq.power);
      const q6 = [];
      for (let qq in q1) {
        const qc = q1[qq];
        if (qc.level > 0 && !q2.useHeroes.includes(qc.id)) {
          let qN = qc.power;
          if (qc.id == 63 && qc.color >= 16) {
            qN *= 3;
          }
          const qC = {
            id: qc.id,
            power: qN
          };
          q6.push(qC);
        }
      }
      let q7 = 0;
      q6.sort((qW, qh) => qW.power - qh.power);
      for (const qW of q2.exped) {
        let qh = this.selectionHeroes(q6, qW.power);
        if (qh && qh.length > 4) {
          for (let qZ in q6) {
            if (qh.includes(q6[qZ].id)) {
              delete q6[qZ];
            }
          }
          q7++;
          const qn = {
            expeditionId: qW.id,
            heroes: qh
          };
          const qg = {
            name: "expeditionSendHeroes",
            args: qn,
            ident: "expeditionSendHeroes_" + qW.id
          };
          yr.push(qg);
        }
      }
      if (yr.length) {
        const qf = {
          calls: yr
        };
        await dd.Send(qf);
        const qj = {
          countGet: q3,
          countSend: q7
        };
        this.end(p3(dR.EXPEDITIONS_SENT, qj), yU);
        return;
      }
      this.end(p3(dR.EXPEDITIONS_NOTHING), yU);
    }
    selectionHeroes(yr, ym) {
      const yU = [];
      const yQ = [];
      for (let q1 = 0; q1 < 5; q1++) {
        for (let q2 in yr) {
          let q3 = yr[q2];
          if (yQ.includes(q3.id)) {
            continue;
          }
          const q4 = yU.reduce((q6, q7) => q6 + q7.power, 0);
          const q5 = ((ym - q4) / (5 - yU.length)).round(0);
          if (q3.power > q5) {
            yU.push(q3);
            yQ.push(q3.id);
            break;
          }
        }
      }
      const q0 = yU.reduce((q6, q7) => q6 + q7.power, 0);
      if (q0 < ym) {
        return false;
      }
      return yQ;
    }
    end(yr, ym) {
      b3(yr, 6000);
      const yU = {
        rewards: ym
      };
      this.resolve(yU);
    }
  }
  function bj() {
    return new Promise((yr, ym) => {
      let yU = new bV(yr, ym);
      yU.start();
    });
  }
  function bV(yr, ym) {
    let yU = {};
    let yQ = 0;
    let q0 = [];
    let q1 = {};
    let q3 = {
      heroes: [],
      favor: {}
    };
    let q4 = 0;
    let q5 = {};
    let qj = [{
      id: 0,
      cost: 0,
      isBuy: false
    }, {
      id: 1,
      cost: 1,
      isBuy: true
    }, {
      id: 2,
      cost: 6,
      isBuy: true
    }, {
      id: 3,
      cost: 16,
      isBuy: true
    }, {
      id: 4,
      cost: 40,
      isBuy: true
    }, {
      id: 5,
      cost: 1,
      isBuy: true
    }, {
      id: 6,
      cost: 6,
      isBuy: true
    }, {
      id: 7,
      cost: 16,
      isBuy: true
    }, {
      id: 8,
      cost: 40,
      isBuy: true
    }, {
      id: 9,
      cost: 1,
      isBuy: true
    }, {
      id: 10,
      cost: 6,
      isBuy: true
    }, {
      id: 11,
      cost: 16,
      isBuy: true
    }, {
      id: 12,
      cost: 40,
      isBuy: true
    }, {
      id: 13,
      cost: 1,
      isBuy: false
    }, {
      id: 14,
      cost: 6,
      isBuy: false
    }, {
      id: 15,
      cost: 16,
      isBuy: false
    }, {
      id: 16,
      cost: 40,
      isBuy: false
    }, {
      id: 17,
      cost: 1,
      isBuy: false
    }, {
      id: 18,
      cost: 3,
      isBuy: false
    }, {
      id: 19,
      cost: 8,
      isBuy: false
    }, {
      id: 20,
      cost: 20,
      isBuy: false
    }, {
      id: 21,
      cost: 40,
      isBuy: false
    }];
    this.start = function () {
      let qE = ["towerGetInfo", "teamGetAll", "teamGetFavor", "inventoryGet", "heroGetAll"].map(qo => ({
        name: qo,
        args: {},
        ident: qo
      }));
      const qa = {
        calls: qE
      };
      dd.Send(qa).then(qo => qV(qo));
    };
    function qV(qE) {
      let qa = qE.results;
      let qo = qa[0].result.response;
      if (!qo) {
        qJ("noTower", qa);
        return;
      }
      let qu = qa[1].result.response;
      let qP = qa[2].result.response;
      let qT = qa[3].result.response;
      q0 = Object.values(qa[4].result.response);
      yQ = qT.coin[7] ?? 0;
      q3.favor = qP.tower;
      q3.heroes = q0.sort((qx, qr) => qr.power - qx.power).slice(0, 5).map(qx => qx.id);
      let qe = qu.tower.filter(qx => qx >= 6000).pop();
      if (qe) {
        q3.pet = qe;
      }
      qw(qo);
    }
    function qB(qE) {
      let qa = qE.heroes.filter(qo => !q1[qo]?.isDead);
      if (qa.length < 5) {
        q0 = q0.filter(qo => !q1[qo.id]?.isDead);
        qa = q0.sort((qo, qu) => qu.power - qo.power).slice(0, 5).map(qo => qo.id);
        Object.keys(qE.favor).forEach(qo => {
          if (!qa.includes(+qo)) {
            delete qE.favor[qo];
          }
        });
      }
      qE.heroes = qa;
      return qE;
    }
    function qw(qE) {
      yU = qE;
      q1 = qE.states.heroes;
      q4 = +qE.floorNumber;
      let qa = false;
      if (qE.floorType == "chest") {
        qa = qE.floor.chests.reduce((qo, qu) => qo + qu.opened, 0);
      }
      b3(p3(dR.TOWER_FLOOR) + q4);
      if (q4 > 49 && qa) {
        qJ("openChest 50 floor", q4);
        return;
      }
      if (qE.mayFullSkip && +qE.teamLevel == 130) {
        if (qa || qE.floorType != "chest") {
          qK(q4);
        } else {
          qI(q4);
        }
        return;
      }
      switch (qE.floorType) {
        case "battle":
          if (q4 <= +qE.maySkipFloor) {
            qk();
            return;
          }
          if (qE.floor.state == 2) {
            qA();
            return;
          }
          qX().then(qH);
          return;
        case "buff":
          qG(qE);
          return;
        case "chest":
          qi(q4);
          return;
        default:
          console.log("!", qE.floorType, qE);
          break;
      }
    }
    function qX() {
      return new Promise(async function (qE, qa) {
        let qo = {
          calls: [{
            name: "towerStartBattle",
            args: qB(q3),
            ident: "body"
          }]
        };
        let qu = await dd.Send(qo).then(qe => qe.results.map(qx => qx.result.response));
        qE(qu.length ? await lK(qu[0]) : {
          result: {
            stars: 0
          }
        });
      });
    }
    function qH(qE) {
      if (qE.result.stars >= 3) {
        const qa = {
          result: qE.result,
          progress: qE.progress
        };
        const qo = {
          name: "towerEndBattle",
          args: qa,
          ident: "body"
        };
        const qu = {
          calls: [qo]
        };
        let qP = qu;
        dd.Send(qP).then(qT => qM(qT));
      } else {
        qJ("towerEndBattle win: false\n", qE);
      }
    }
    function qM(qE) {
      let qa = qE.results[0].result.response;
      if ("error" in qa) {
        qJ("errorBattleResult", qa);
        return;
      }
      if ("reward" in qa) {
        yQ += qa.reward?.coin[7] ?? 0;
      }
      qA();
    }
    function qS(qE) {
      lU(qE.results.filter(qa => qa.ident.includes("towerOpenChest")).map(qa => qa.result.response.reward), q5);
    }
    function qD(qE) {
      const qa = {
        name: "towerNextChest",
        args: {},
        ident: "towerNextChest" + qE
      };
      return qa;
    }
    function qt(qE) {
      const qo = {
        name: "towerOpenChest",
        args: {
          num: 2
        },
        ident: "towerOpenChest" + qE
      };
      return qo;
    }
    function qA() {
      dd.Send({
        calls: [{
          name: "towerNextFloor",
          args: {},
          ident: "body"
        }]
      }).then(qo => qL(qo));
    }
    function qi(qE) {
      qE = qE ?? 0;
      dd.Send({
        calls: [qt(0)]
      }).then(qa => {
        qS(qa);
        if (qE < 50) {
          qA(qa);
        } else {
          qs(qa);
        }
      });
    }
    function qs() {
      qJ("openChest 50 floor", q4);
    }
    function qk() {
      dd.Send({
        calls: [{
          name: "towerSkipFloor",
          args: {},
          ident: "body"
        }]
      }).then(qo => qL(qo));
    }
    function qG(qE) {
      let qa = qE.floor;
      let qo = [];
      for (let qu of qa) {
        let qP = qj[qu.id];
        if (qP.isBuy && qP.cost <= yQ) {
          yQ -= qP.cost;
          qo.push(qF(qu.id));
        }
      }
      Promise.all(qo).then(qA);
    }
    function qF(qE) {
      return new Promise(function (qa, qo) {
        const qu = {
          buffId: qE
        };
        const qP = {
          name: "towerBuyBuff",
          args: qu,
          ident: "body"
        };
        const qT = {
          calls: [qP]
        };
        dd.Send(qT).then(qe => qa(qe));
      });
    }
    function qL(qE) {
      let qa = qE.results[0].result.response;
      if ("reward" in qa && qa.reward?.coin) {
        yQ += qa.reward?.coin[7] ?? 0;
      }
      if ("tower" in qa) {
        qa = qa.tower;
      }
      if ("skullReward" in qa) {
        yQ += qa.skullReward?.coin[7] ?? 0;
      }
      qw(qa);
    }
    async function qO(qE) {
      let {
        pointRewards: qa,
        points: qo
      } = yU;
      let qu = Object.getOwnPropertyNames(qa);
      let qP = qu.filter(qU => +qU <= +qo && !qa[qU]);
      if (!qP.length) {
        return;
      }
      const qT = {
        points: qP
      };
      const qe = {
        name: "tower_farmPointRewards",
        args: qT,
        ident: "tower_farmPointRewards"
      };
      const qx = {
        calls: [qe]
      };
      let qr = qx;
      if (yQ > 0 && qE == "openChest 50 floor") {
        qr.calls.push({
          name: "tower_farmSkullReward",
          args: {},
          ident: "tower_farmSkullReward"
        });
      }
      const qm = await dd.Send(qr).then(qQ => qQ.results.map(c0 => c0.result.response));
      lU(qm, q5);
    }
    function qR() {
      const qa = {
        calls: []
      };
      let qo = 0;
      for (let qu = 0; qu < 15; qu++) {
        qa.calls.push(qD(++qo));
        qa.calls.push(qt(++qo));
      }
      dd.Send(qa).then(qP => {
        qP.results[28].result.response.floor.chests[2].opened = qP.results[29].result.response.opened;
        qP.results[0] = qP.results[28];
        qS(qP);
        qL(qP);
      });
    }
    function qI(qE) {
      dd.Send({
        calls: [qt(0)]
      }).then(qa => {
        qS(qa);
        qK(qE);
      });
    }
    function qK(qE) {
      if (qE > 49) {
        qJ("openChest 50 floor", qE);
        return;
      }
      if (qE == 1) {
        qR();
        return;
      }
      dd.Send({
        calls: [qD(0), qt(0)]
      }).then(qa => {
        qa.results[0].result.response.floor.chests[2].opened = qa.results[1].result.response.opened;
        qS(qa);
        qL(qa);
      });
    }
    async function qJ(qE, qa) {
      console.log(qE, qa);
      if (qE != "noTower") {
        await qO(qE);
      }
      b3(p3(dR.TOWER) + " " + p3(dR.COMPLETED) + "!", 5000);
      const qo = {
        rewards: q5
      };
      yr(qo);
    }
  }
  function bB() {
    return new Promise((yr, ym) => {
      let yU = new bw(yr, ym);
      yU.start();
    });
  }
  function bw(yr, ym) {
    let yU = [];
    let yQ = [];
    let q0 = 0;
    let q1 = 0;
    let q2 = false;
    let q3 = 0;
    let q4 = 0;
    let q5 = {};
    this.start = function () {
      let qZ = ["titanArenaGetStatus", "teamGetAll"].map(qj => ({
        name: qj,
        args: {},
        ident: qj
      }));
      const qf = {
        calls: qZ
      };
      dd.Send(qf).then(qj => q6(qj));
    };
    function q6(qZ) {
      let qf = qZ.results[0].result.response;
      if (qf.status == "disabled") {
        qg("disabled", qf);
        return;
      }
      if (Object.keys(qf.defenders ?? {}).length < 5) {
        qg("need set def team", qf);
        return;
      }
      let qj = qZ.results[1].result.response;
      yU = qj.titan_arena;
      pX = false;
      q7(qf);
    }
    function q7(qZ) {
      if (qZ.status == "peace_time") {
        qg("Peace_time", qZ);
        return;
      }
      q3 = qZ.tier;
      if (q3) {
        b3(p3(dR.TOE_LEVEL) + q3);
      }
      if (qZ.status == "completed_tier") {
        q9();
        return;
      }
      if (qZ.canRaid) {
        qN();
        return;
      }
      if (!q2) {
        qd(qZ.rivals);
        return;
      }
      qg("Done or not canRaid", qZ);
    }
    function q8(qZ) {
      let qf = qZ.results[0].result.response;
      lU([qf.tierReward], q5);
      q7(qf);
    }
    function q9() {
      q2 = false;
      let qf = [{
        name: "titanArenaCompleteTier",
        args: {},
        ident: "body"
      }];
      const qj = {
        calls: qf
      };
      dd.Send(qj).then(qV => q8(qV));
    }
    function qd(qZ) {
      yQ = [];
      for (let qf in qZ) {
        if (qZ[qf].attackScore < 250) {
          yQ.push(qf);
        }
      }
      console.log("checkRivals", yQ);
      q4 = yQ.length;
      qp();
    }
    function qp() {
      let qZ = yQ.length;
      if (!qZ) {
        q2 = true;
        qc();
        return;
      }
      q0 = yQ.pop();
      q1 = +q0;
      qz(q0);
    }
    function qz(qZ) {
      const qf = {
        rivalId: qZ,
        titans: yU
      };
      const qj = {
        name: "titanArenaStartBattle",
        args: qf,
        ident: "body"
      };
      let qV = [qj];
      const qB = {
        calls: qV
      };
      dd.Send(qB).then(qw => ql(qw));
    }
    async function ql(qZ) {
      let qf = qZ.results[0].result.response.battle;
      if (q1 == q0) {
        qb(qf);
        return;
      }
      if (q1 > 0) {
        q1--;
        qv(await lK(qf));
        return;
      }
      qp();
    }
    function qv(qZ) {
      if (qZ.result.win || !q1) {
        const qf = {
          progress: qZ.progress,
          result: qZ.result,
          rivalId: qZ.battleData.typeId
        };
        qy(qf);
        return;
      }
      qz(qZ.battleData.typeId);
    }
    async function qb(qZ) {
      const qf = await ze(qZ);
      const qj = await lh(qZ, 10);
      qj.push(qf);
      qY(qj);
    }
    function qY(qZ) {
      let qf = qZ.map(qw => qw.result.win);
      let qj = qZ.pop();
      let qV = qf.reduce((qw, qX) => qw + qX);
      let qB = q4 - yQ.length;
      console.log("resultPreCalcBattle", qV + "/11");
      q1 = qV > 0 ? pz("countBattle") : 0;
      qv(qj);
    }
    function qy(qZ) {
      const qf = {
        name: "titanArenaEndBattle",
        args: qZ,
        ident: "body"
      };
      let qj = [qf];
      const qV = {
        calls: qj
      };
      dd.Send(qV).then(qB => qq(qB));
    }
    function qq(qZ) {
      let qf = qZ.results[0].result.response;
      let qj = q4 - yQ.length;
      lU([qf.reward], q5);
      b3(p3(dR.TOE_LEVEL) + q3 + ("</br>" + p3(dR.BATTLES) + ": ") + qj + "/" + q4 + " - " + qf.attackScore);
      console.log("resultTitanArenaEndBattle", qj + "/" + q4, q1);
      qp();
    }
    function qc() {
      let qf = [{
        name: "titanArenaGetStatus",
        args: {},
        ident: "body"
      }];
      const qj = {
        calls: qf
      };
      dd.Send(qj).then(qV => q8(qV));
    }
    function qN() {
      const qZ = {
        titans: yU
      };
      const qf = {
        name: "titanArenaStartRaid",
        args: qZ,
        ident: "body"
      };
      let qj = [qf];
      const qV = {
        calls: qj
      };
      dd.Send(qV).then(qB => qC(qB));
    }
    async function qC(qZ) {
      let qf = qZ.results[0].result.response;
      let {
        attackers: qj,
        rivals: qV
      } = qf;
      let qB = [];
      for (let qH in qV) {
        let qM = qV[qH];
        const qS = {
          attackers: qj,
          defenders: [qM.team],
          seed: qM.seed,
          typeId: qH,
          type: "titan_arena"
        };
        qB.push(qS);
      }
      const qw = await lW(qB);
      const qX = {};
      for (let qD of qw) {
        let qt = qD.battleData.typeId;
        const qA = {
          progress: qD.progress,
          result: qD.result
        };
        qX[qt] = qA;
      }
      qW(qX);
    }
    function qW(qZ) {
      const qf = {
        results: qZ
      };
      const qj = {
        name: "titanArenaEndRaid",
        args: qf,
        ident: "body"
      };
      const qV = {
        calls: [qj]
      };
      let qB = qV;
      dd.Send(qB).then(qw => qh(qw));
    }
    function qh(qZ) {
      let qf = qZ.results[0].result.response.results;
      let qj = true;
      lU(Object.values(qf).map(qV => qV.reward), q5);
      for (let qV in qf) {
        qj &&= qf[qV].attackScore >= 250;
      }
      if (qj) {
        q9();
      } else {
        qc();
      }
    }
    async function qn() {
      let qj = {
        calls: [{
          name: "titanArenaFarmDailyReward",
          args: {},
          ident: "body"
        }]
      };
      return await dd.Send(qj).then(qV => {
        lU(qV?.results?.[0]?.result?.response ?? [], q5);
      });
    }
    async function qg(qZ, qf) {
      pX = true;
      if (!["Peace_time", "disabled"].includes(qZ)) {
        await qn();
      }
      console.log(qZ, qf);
      b3(p3(dR.TITAN_ARENA) + " " + p3(dR.COMPLETED) + "!", 5000);
      const qj = {
        rewards: q5
      };
      yr(qj);
    }
  }
  function bX(yr, ym) {
    let yU;
    switch (yr) {
      case "fragmentGear":
        yU = p3(dR.FRAGMENT);
      case "gear":
        yU = dv.translate("LIB_GEAR_NAME_" + ym);
        break;
      case "fragmentScroll":
        yU = p3(dR.FRAGMENT);
      case "scroll":
        yU = dv.translate("LIB_SCROLL_NAME_" + ym);
        break;
      case "fragmentTitanArtifact":
        yU = dv.translate("LIB_TITAN_ARTIFACT_NAME_" + ym);
        break;
      case "coin":
        yU = dv.translate("LIB_COIN_NAME_" + ym);
        break;
      case "consumable":
        yU = dv.translate("LIB_CONSUMABLE_NAME_" + ym);
        break;
      case "petGear":
        yU = dv.translate("LIB_PET_GEAR_NAME_" + ym);
        break;
      case "ascensionGear":
        yU = dv.translate("LIB_ASCENSION_GEAR_" + ym);
        break;
      case "bannerStone":
        yU = dv.translate("LIB_BANNER_STONE_NAME_" + ym);
        break;
      case "avatar":
        yU = p3(dR.AVATAR_NAME) + " " + dv.translate("LIB_AVATAR_NAME_" + ym);
        break;
      case "avatarFrame":
        yU = "" + dv.translate("LIB_AVATAR_FRAME_NAME_" + ym);
        break;
      case "gold":
        yU = dv.translate("LIB_PSEUDO_COIN");
        break;
      case "starmoney":
        yU = dv.translate("LIB_PSEUDO_STARMONEY");
        break;
      default:
        yU = yr + (ym ? " №" + ym : "");
    }
    return yU;
  }
  function bH(yr, ym, yU, yQ) {
    let q0 = "";
    let q1 = ym * yU;
    let q2 = dr(q1);
    let q3 = Math.max(0, 6 - q2.length) * 2 + +(Math.log10(q1) >= 3);
    if (ym > 0) {
      q0 += "<span style=\"color:white;\">" + ym.toString().fixed(2) + "</span> (<span style=\"color:yellow;\">" + q2 + "</span>)" + " ".repeat(q3);
      q0 += yQ ? "<span style=\"color:green;\">" + yr + "</span>" : yr;
    } else {
      q0 += yr + " x" + yU;
    }
    return q0;
  }
  function bM(yr, ym = 0, yU = false) {
    let yQ = ym > 0 ? "\n" : "";
    let q0 = yr.reward;
    for (let q1 in q0) {
      let q2 = q0[q1];
      let q3 = [];
      if (typeof q2 != "number") {
        for (let q4 in q2) {
          q3.push(bH(bX(q1, q4), ym, q0[q1][q4], yU));
        }
      } else {
        q3.push(bH(bX(q1), ym, q0[q1], yU));
      }
      yQ += q3.join(", ");
    }
    return yQ;
  }
  async function bS(yr, ym) {
    const q0 = {
      checkBoxes: yr,
      options: {
        inRow: true,
        width: 260
      }
    };
    if (await vI.confirm(p3(dR.CACHE_PRIZE_ANSWER), {}, {
      buttons: [{
        msg: p3(dR.SAVE),
        result: true
      }, {
        isClose: true,
        result: false
      }]
    }, q0)) {
      vI.getCheckBoxes().forEach(q1 => {
        ym[q1.name].checked = q1.checked;
      });
      vu("selectPrize", ym);
    }
    return bD(yr);
  }
  async function bD(yr) {
    const ym = vo("selectCache", {});
    const yU = vo("selectPrize", {});
    const yQ = true;
    const q0 = [{
      name: "refresh",
      checked: true,
      label: p3(dR.REFRESH),
      title: p3(dR.REFRESH_TITLE)
    }];
    lY(q0, ym);
    yr.forEach(q5 => {
      if (!yU[q5.name] || yQ) {
        yU[q5.name] = {
          checked: q5.checked
        };
      } else {
        q5.checked = yU[q5.name].checked;
      }
    });
    const q3 = {
      checkBoxes: q0,
      options: {
        inRow: true
      }
    };
    const q4 = await vI.confirm(p3(dR.CACHE_ANSWER), {}, {
      buttons: [{
        msg: p3(dR.BTN_RUN),
        result: 1
      }, {
        msg: p3(dR.CHANGE_CACHE_PRIZE),
        result: 2
      }, {
        isClose: true,
        result: 0
      }]
    }, q3);
    vI.getCheckBoxes().forEach(q5 => {
      ym[q5.name].checked = q5.checked;
    });
    vu("selectCache", ym);
    if (q4 == 2) {
      if (yQ) {
        b3(p3(dR.FOR_SUPER_PRIZE_CHECK) + dy, 6000);
        return bD(yr);
      } else {
        return bS(yr, yU);
      }
    } else if (q4 == 1) {
      return {
        prize: yU,
        cache: ym
      };
    } else {
      return null;
    }
  }
  function bt(yr, ym, yU) {
    let yQ = "\n\n" + p3(dR.RESOURCE_GET);
    for (let q0 = yr.length - 1; q0 >= 0; q0--) {
      const q1 = ym[q0] ?? 0;
      if (q1 > 0) {
        yQ += bM(yr[q0], q1, yU.includes(q0));
      }
    }
    return yQ;
  }
  async function bA() {
    let yr = await dd.Send({
      calls: ["scratch_getState", "inventoryGet"].map(q4 => ({
        name: q4,
        args: {},
        ident: q4
      }))
    }).then(q4 => q4.results.map(q5 => q5.result.response));
    let ym = [];
    let yU = yr[0];
    let yQ = yr[1].coin[pn] ?? 0;
    let q0 = yU.allRewards.length;
    let q1 = {};
    let q2 = [];
    for (let q4 = 0; q4 < q0; q4++) {
      const q5 = yU.allRewards[q4];
      const q6 = q5.isSuperPrize;
      ym.push({
        name: q4,
        checked: q6,
        label: (q6 ? "♻" : "") + bM(q5),
        title: p3(dR.SUPER_TITLE)
      });
    }
    const q3 = await bD(ym);
    if (q3) {
      for (let qy in q3.prize) {
        if (q3.prize[qy].checked) {
          q2.push(+qy);
        }
      }
      let q7 = 0;
      let q8 = 0;
      let q9 = 0;
      let qd = 0;
      let qp = 0;
      let qz = 0;
      let ql = {};
      let qv = q2.length;
      let qb = (qv > 0 ? q0 / qv : 1000000) + 0.01;
      let qY = q3.cache.refresh?.checked ?? false;
      if (Object.values(yU.slots).length == 0) {
        yU.slots = {};
      }
      for (let qq in yU.slots) {
        qz++;
        const qc = yU.slots[qq];
        qd += +q2.includes(qc);
        qp += +yU.allRewards[qc].isSuperPrize;
      }
      for (let qN = 0, qC = yQ; qC > 0; qC--, qz++, q7++) {
        const qW = {
          keys: qC,
          totalOpen: q7,
          totalSuper: q8,
          countRefresh: q9,
          countOpen: qz,
          countSuper: qd,
          realSuper: qp,
          maxPrize: q0,
          maxSuper: qv
        };
        b3(p3(dR.OPEN_CACHE_PROGRESS, qW) + "\n\n" + p3(dR.CLICK_TO_STOP) + bt(yU.allRewards, ql, q2), 0, function () {
          qC = 0;
        });
        if (qz < qb * qd && qp > 0 || qz == q0) {
          if (qY) {
            const qB = {
              name: "scratch_refresh",
              args: {},
              ident: "scratch_refresh"
            };
            const qw = {
              calls: [qB]
            };
            yU = await dd.Send(qw).then(qX => qX.results[0].result.response);
            yU.slots = {};
            qN = 0;
            qz = 0;
            qd = 0;
            qp = 0;
            q9++;
          } else {
            qC = 0;
            break;
          }
        }
        for (; yU.slots[qN] !== undefined; qN++);
        const qh = {
          slotId: qN,
          isGold: false
        };
        const qn = {
          name: "scratch_open",
          args: qh,
          ident: "scratch_open"
        };
        const qg = qn;
        const qZ = await dd.Send({
          calls: [qg]
        }).then(qX => qX.results[0].result.response);
        const qf = +qZ.rewardIndex;
        const qj = +q2.includes(qf);
        lU([qZ.reward], q1);
        qd += qj;
        q8 += qj;
        qp += +yU.allRewards[qf].isSuperPrize;
        yU.slots[qN] = qf;
        if (!ql[qf]) {
          ql[qf] = 0;
        }
        ql[qf]++;
      }
      if (q7 > 0) {
        const qX = {
          keys: yQ - q7,
          totalOpen: q7,
          totalSuper: q8,
          countRefresh: q9,
          countOpen: qz,
          countSuper: qd,
          realSuper: qp,
          maxPrize: q0,
          maxSuper: qv
        };
        b3(p3(dR.OPEN_CACHE_PROGRESS, qX) + bt(yU.allRewards, ql, q2));
        dv.refreshGame();
        dv.showLootboxReward(q1);
      } else {
        b3(yQ > 0 ? p3(dR.NEED_REFRESH) : p3(dR.OUT_KEYS));
      }
    }
  }
  async function bi() {
    if (await vI.confirm(p3(dR.EXCHANGE_HONEY), {}, {
      buttons: [{
        msg: p3(dR.BTN_YES),
        result: true
      }, {
        msg: p3(dR.BTN_NO),
        result: false
      }, {
        isClose: true,
        result: false
      }]
    })) {
      let yQ = {
        calls: [{
          name: "inventoryGet",
          args: {},
          ident: "inventoryGet"
        }]
      };
      let q0 = ph.offerId;
      let q1 = await dd.Send(yQ).then(q5 => q5.results[0].result.response.coin[ph.coinToOpen]);
      let q2 = [...Array((q1 / 250).floor(0))].map((q5, q6) => ({
        name: "lootBoxBuy",
        args: {
          box: "boxHalloween2018",
          offerId: q0,
          price: "openCoin"
        },
        ident: "lootBoxBuy_" + q6
      }));
      let q3 = await dd.Send({
        calls: q2
      }).then(q5 => q5.results.map(q6 => q6.result.response[0]));
      let q4 = p3(dR.RECEIVED) + ": " + q3.filter(q5 => q5?.coin && q5.coin[ph.superPrize]).length + (" " + p3(dR.COIN));
      b3(q4, 6000);
      console.log(q3);
      dv.refreshGame();
    }
  }
  function bs(yr) {
    if (yr) {
      return yr.replaceAll("_", "-").toLowerCase();
    } else {
      return "";
    }
  }
  const bk = ["zh-cn", "zh-tw", "it", "fr", "ja"];
  async function bG() {
    let yr = "stats_quiz";
    let ym = z8[yr];
    if (!ym) {
      ym = await lR();
      if (ym.error || !ym.data) {
        b3(p3(dR.INVALID_STATS));
        return;
      }
      z8[yr] = ym;
    }
    const yU = ym.data.language ?? {};
    const yQ = ym.data.userRating ?? {};
    const q0 = yQ.count ?? 0;
    const q1 = yQ.place ?? 0;
    const q2 = yU[bs(dd.NXFlashVars.interface_lang)];
    for (let q8 in yU) {
      yU[q8].sum = yU[q8].d1 + yU[q8].d2 + yU[q8].d3;
    }
    const q3 = {
      count: q0
    };
    let q4 = p3(dR.FOUND_QUESTIONS, q3);
    let q5 = Object.entries(yU);
    const q6 = {
      place: q1
    };
    if (q0 > 0) {
      q4 += "\n" + p3(dR.QUIZ_RATING_PLACE, q6);
    }
    if (q5.length > 0) {
      q4 += "\n\n" + p3(dR.LANG_QUIZ_RATING) + ("\n" + p3(dR.LANG) + "    D1      D2      D3      All");
      q5 = q5.sort((ql, qv) => qv[1].sum - ql[1].sum);
      const q9 = q5[0][1].d1 / 100;
      const qd = q5[0][1].d2 / 100;
      const qp = q5[0][1].d3 / 100;
      const qz = q5[0][1].sum / 100;
      for (let ql of q5) {
        let qv = (ql[0] + ":").fixed(6);
        if (bk.includes(ql[0])) {
          qv += " ";
        }
        q4 += "\n" + qv + "<span style=\"color:green;\">" + yd((ql[1].d1 / q9).round(1)) + "</span> <span style=\"color:yellow;\">" + yd((ql[1].d2 / qd).round(1)) + "</span> <span style=\"color:red;\">" + yd((ql[1].d3 / qp).round(1)) + "</span> <span style=\"color:white;\">" + yd((ql[1].sum / qz).round(1)) + "</span>";
      }
      q4 += "\n\n" + p3(dR.LANG_QUIZ_LEGEND);
    }
    b3(q4);
    return;
    if (await vI.confirm(p3(dR.AUTO_QUIZ_RUN), {}, {
      buttons: [{
        msg: p3(dR.BTN_RUN),
        result: true
      }, {
        isClose: true,
        result: false
      }]
    })) {
      let qb = ["inventoryGet"].map(qc => ({
        name: qc,
        args: {},
        ident: qc
      }));
      let qY = (await dd.Send({
        calls: qb
      }).then(qc => qc.results[0].result.response.consumable[75])) ?? 0;
      let qy = bs(dd.NXFlashVars.interface_lang);
      let qq = qY;
      while (qY > 0) {
        const qc = qY > 9 ? true : false;
        const qN = {
          name: "quizGetNewQuestion",
          args: {
            x10: qc,
            locale: qy
          },
          ident: "quizGetNewQuestion"
        };
        const qC = await dd.Send({
          calls: [qN]
        }).then(qh => qh.results[0].result.response);
        pS = await vV(qC);
        qY -= qc ? 10 : 1;
        const qW = {
          ticket: qY,
          maxTicket: qq
        };
        b3(p3(dR.AUTO_QUIZ_INFO, qW) + "\n\n" + p3(dR.CLICK_TO_STOP), 0, function () {
          qY = 0;
        });
        if (pS.id > 0) {
          const qh = {
            answerId: pS.id,
            time: 1
          };
          const qn = {
            name: "quizAnswer",
            args: qh,
            ident: "quizAnswer"
          };
          const qg = qn;
          const qZ = await dd.Send({
            calls: [qg]
          }).then(qf => qf.results[0].result.response);
          if (pS.id == qZ.rightAnswer) {
            continue;
          }
          b3(p3(dR.QUIZ_STOP) + "\n" + p3(dR.QUIZ_WRONG) + "\n" + p3(dR.QUIZ_REFRESH_INFO));
          return;
        }
        b3(p3(dR.QUIZ_STOP) + "\n" + p3(dR.QUIZ_UNKNOWN) + "\n" + p3(dR.QUIZ_REFRESH_INFO));
        return;
      }
      b3(p3(dR.QUIZ_COMPLETED) + "\n" + p3(dR.QUIZ_REFRESH_INFO), 6000);
    }
  }
  async function bF() {
    let yr = ["userGetInfo"].map(q0 => ({
      name: q0,
      args: {},
      ident: q0
    }));
    const ym = {
      calls: yr
    };
    const yU = await dd.Send(ym).then(q0 => q0.results[0].result.response.refillable);
    let yQ = yU.find(q0 => q0.id == 47)?.amount ?? 0;
    if (yQ > 0) {
      const q0 = {
        isClose: true,
        result: -111
      };
      let q1 = await vI.confirm(p3(dR.MSG_SPECIFY_QUANT), {}, {
        buttons: [{
          msg: p3(dR.BTN_OPEN),
          isInput: true,
          default: yQ
        }, q0]
      });
      if (q1 == -111) {
        return;
      }
      yQ = Math.min(q1, yQ);
      let q2 = [];
      while (yQ-- > 0) {
        const q5 = {
          name: "ascensionChest_open",
          args: {
            paid: false,
            amount: 1
          },
          ident: "ascensionChest_open_" + yQ
        };
        q2.push(q5);
      }
      const q3 = {
        calls: q2
      };
      await dd.Send(q3);
      b3(p3(dR.TOTAL_OPEN) + " " + q2.length, 6000);
    } else {
      b3(p3(dR.NOT_ENOUGH_AP), 5000);
    }
  }
  async function bL() {
    let yU = {
      calls: [{
        name: "offerGetAll",
        args: {},
        ident: "offerGetAll"
      }]
    };
    let yQ = {};
    let q0 = await dd.Send(yU).then(q5 => q5.results[0].result.response.filter(q6 => q6.type == "reward" && !q6?.freeRewardObtained && q6.reward));
    if (!q0.length) {
      b3(p3(dR.NOTHING_TO_COLLECT), 5000);
      return {};
    }
    const q1 = q0.map(q5 => ({
      name: "offerFarmReward",
      args: {
        offerId: q5.id
      },
      ident: "offerFarmReward_" + q5.id
    }));
    const q2 = await dd.Send({
      calls: q1
    }).then(q5 => q5.results.map(q6 => q6.result.response));
    lU(q2, yQ);
    const q3 = {
      count: q2?.length
    };
    b3(p3(dR.COLLECT_REWARDS, q3), 5000);
    const q4 = {
      rewards: yQ
    };
    return q4;
  }
  async function bO() {
    let yr = {};
    let ym = ["subscriptionFarm", "zeppelinGiftFarm", "grandFarmCoins", "gacha_refill"].map(q4 => ({
      name: q4,
      args: {},
      ident: q4
    }));
    let yU = await bW();
    let yQ = await bL();
    ym[3].args = {
      ident: "heroGacha"
    };
    const q1 = {
      calls: ym
    };
    const q2 = await dd.Send(q1).then(q4 => q4.results.map(q5 => {
      const q6 = q5?.result?.response ?? {};
      if ("reward" in q6) {
        return q6.reward ?? {};
      } else {
        return q6;
      }
    }));
    lU(q2.concat([yU?.rewards ?? {}, yQ?.rewards ?? {}]), yr);
    const q3 = {
      rewards: yr
    };
    return q3;
  }
  function bR(yr, ym = {}) {
    return yr && Object.keys(yr).length > 0 && (ym.hero || !yr.bundleHeroReward && !yr.fragmentHero) && (ym.stamina || +(yr.stamina ?? 0) <= 60) && (ym.portal || !yr.refillable?.[45]) && (ym.vip || !yr.vipPoints) && (ym.buff || !yr.buff);
  }
  function bI(yr) {
    yr = +(yr ?? 0);
    return yr && new Date(yr * 1000) - new Date() < 86400000;
  }
  function bK(yr, ym) {
    return yr.filter(yU => bR(yU?.reward, ym));
  }
  function bJ(yr, ym) {
    return yr.filter(yU => bR(yU?.reward, ym) || bI(yU?.availableUntil));
  }
  async function bE(yr, ym = true) {
    let yU = ["mailGetAll"].map(q5 => ({
      name: q5,
      args: {},
      ident: q5
    }));
    let yQ = await dd.Send({
      calls: yU
    });
    let q0 = {};
    let q1 = 0;
    let q2 = bJ(yQ?.results?.[0]?.result?.response?.letters ?? [], yr).map(q5 => +q5.id);
    if (q2.length) {
      const q5 = {
        letterIds: q2
      };
      const q6 = {
        name: "mailFarm",
        args: q5,
        ident: "body"
      };
      const q7 = {
        calls: [q6]
      };
      const q8 = await dd.Send(q7);
      const q9 = q8?.results?.[0]?.result?.response ?? {};
      q1 = Object.keys(q9).length;
      lU(q9, q0);
      if (q1) {
        dv.removeMails(q2);
      }
    }
    const q3 = p3(dR.RECEIVED) + " " + q1 + " " + p3(dR.LETTERS);
    if (ym) {
      b3(q3, 6000);
    }
    const q4 = {
      message: q3,
      rewards: q0
    };
    return q4;
  }
  function ba(yr) {
    let ym = yr?.exp ?? 0;
    let yU = 0;
    for (let yQ of yr.levels) {
      if (yQ.experience > ym) {
        return yU;
      } else {
        yU = yQ.level;
      }
    }
    for (let q0 = yr.levels.at(-1), q1 = q0.experienceByLevel, q2 = q0.experience + q1; q2 <= ym; q2 += q1) {
      yU++;
    }
    return yU;
  }
  function bo(yr, ym) {
    for (let yU of ym) {
      if (yU?.quests && yU.quests.includes(yr)) {
        const yQ = dv.lib.battlePass.questChain[dv.lib.quest.battlePass[yr]?.chain]?.requirement;
        const q0 = yQ?.battlePassTicket;
        const q1 = q0?.[yU.id] || q0 || 0;
        const q2 = yU?.ticket ?? 0;
        return q1 <= q2 && (yQ?.battlePassLevel?.value ?? 0) <= ba(yU);
      }
    }
    return false;
  }
  async function bu(yr, ym = true) {
    let yU = ["questGetAll", "clan_prestigeGetInfo", "battlePass_getInfo", "battlePass_getSpecial"].map(q9 => ({
      name: q9,
      args: {},
      ident: q9
    }));
    let yQ = await dd.Send({
      calls: yU
    });
    let q0 = 0;
    let q1 = 0;
    let q2 = {};
    const q3 = Date.now();
    const q4 = Object.values(yQ.results[3]?.result?.response ?? {});
    const q5 = dv.lib.quest.clan;
    const q6 = pP < q3 ? [] : Object.values(q5).filter(q9 => q9.shortcutFarmRequirement?.subscription).map(q9 => q9.id);
    const q7 = yQ.results[2]?.result?.response?.battlePass;
    const q8 = (yQ.results[1]?.result?.response?.endTime ?? 0) > q3 / 1000;
    if (q7) {
      q4.push(q7);
    }
    for (let q9 of q4) {
      q9.levels = Object.values(dv.lib.battlePass.level).filter(qd => qd.battlePass === q9.id).sort((qd, qp) => qd.experience - qp.experience);
    }
    while (yQ) {
      const qd = bK(yQ.results[0].result.response.filter(qy => qy.state == 2 || qy.state == 1 && qy.id > 20000000 && q6.includes(qy.id)), yr);
      const qp = [];
      yU = [];
      for (let qy of qd) {
        let qq = qy.id;
        if (qq >= 20000000) {
          if ((q5[qq]?.farmRequirement?.teamLevel ?? 0) <= +dG.level) {
            qp.push(qq);
          }
        } else if (qq < 1000000 || bo(qq, q4)) {
          const qc = {
            questId: qq
          };
          const qN = {
            name: "questFarm",
            args: qc,
            ident: "questFarm_" + qq
          };
          yU.push(qN);
        }
      }
      q0 += yU.length + qp.length;
      if (q8 && qp.length) {
        const qC = {
          questIds: qp
        };
        const qW = {
          name: "quest_questsFarm",
          args: qC,
          ident: "quest_questsFarm"
        };
        yU.push(qW);
      }
      if (!yU.length || ++q1 > 10) {
        const qh = {
          count: q0
        };
        const qn = p3(dR.COLLECT_REWARDS, qh) + " " + p3(dR.QUESTS);
        if (ym) {
          b3(qn, 6000);
        }
        const qg = {
          message: qn,
          rewards: q2
        };
        return qg;
      }
      const qz = {
        count: q0
      };
      b3(p3(dR.COLLECT_REWARDS, qz) + " " + p3(dR.QUESTS));
      const ql = {
        calls: yU
      };
      let qv = await dd.Send(ql);
      let qb = [];
      console.log(qv);
      if (qv?.results) {
        for (let qZ in qv.results) {
          const qf = qv.results[qZ].result.response;
          lx(qf);
          if (qf instanceof Array) {
            qb.push(...qf);
          } else {
            qb.push(qf);
          }
        }
      }
      lU(qb, q2);
      yU = ["questGetAll"].map(qj => ({
        name: qj,
        args: {},
        ident: qj
      }));
      const qY = {
        calls: yU
      };
      yQ = await dd.Send(qY);
    }
  }
  function bP(yr, ym, yU) {
    const yQ = {
      level: yr,
      free: ym
    };
    const q0 = yQ;
    const q1 = "battlePass_farmReward_" + (yU ? yU + "_" : "") + (ym ? "free_" : "paid_") + yr;
    if (yU) {
      q0.id = yU;
    }
    const q2 = {
      name: "battlePass_farmReward",
      args: q0,
      ident: q1
    };
    return q2;
  }
  async function bT(yr, ym = true) {
    let yU = ["battlePass_getInfo", "battlePass_getSpecial"].map(q6 => ({
      name: q6,
      args: {},
      ident: q6
    }));
    let yQ = await dd.Send({
      calls: yU
    }).then(q6 => q6.results.map(q7 => q7.result.response));
    let q0 = Object.values(yQ[1]);
    let q1 = yQ[0]?.battlePass;
    if (q1) {
      q1.main = true;
      q0.push(q1);
    }
    yU = [];
    for (const q6 of q0) {
      q6.levels = Object.values(dv.lib.battlePass.level).filter(q7 => q7.battlePass === q6.id).sort((q7, q8) => q7.experience - q8.experience);
      for (let q7 = 1, q8 = ba(q6); q7 <= q8; q7++) {
        const q9 = q6.levels[q7 - 1] ?? q6.levels.at(-1);
        const qd = q6.main ? false : q6.id;
        if (!q6.rewards[q7]?.free && bR(q9.freeReward, yr)) {
          yU.push(bP(q7, true, qd));
        }
        if (q6.ticket && !q6.rewards[q7]?.paid && bR(q9.paidReward, yr)) {
          yU.push(bP(q7, false, qd));
        }
      }
    }
    const q2 = yU.length ? await dd.Send(JSON.stringify({
      calls: yU
    })).then(qp => qp.results) : [];
    const q3 = p3(dR.COLLECT_REWARDS, {
      count: q2.length
    }) + " " + p3(dR.SEASONS);
    const q4 = {};
    if (ym) {
      b3(q3, 7000);
    }
    lU(q2.map(qp => qp.result.response), q4);
    const q5 = {
      message: q3,
      rewards: q4
    };
    return q5;
  }
  function be(yr) {
    let ym = yr?.prestigeCount ?? 0;
    let yU = yr?.userPrestigeCount ?? 0;
    let yQ = 0;
    for (let q0 of yr.levels) {
      if (q0.prestige > ym || q0.userPrestige > yU) {
        return yQ;
      } else {
        yQ = q0.level;
      }
    }
    for (let q1 = yr.levels.at(-1).prestige, q2 = q1 - yr.levels.at(-2).prestige, q3 = q1 + q2; q3 <= ym; q3 += q2) {
      yQ++;
    }
    return yQ;
  }
  async function bx(yr, ym = true) {
    let yU = await dd.Send({
      calls: ["clan_prestigeGetInfo"].map(q4 => ({
        name: q4,
        args: {},
        ident: q4
      }))
    }).then(q4 => q4.results[0].result.response);
    let yQ = [];
    if (yU) {
      yU.levels = Object.values(dv.lib.clanPrestige.level).filter(q4 => q4.prestigeId === yU.prestigeId).sort((q4, q5) => q4.prestige - q5.prestige);
      if (yU.levels.length > 0) {
        for (let q4 = 1, q5 = be(yU); q4 <= q5; q4++) {
          if (!yU.farmedPrestigeLevels.includes(q4) && bR((yU.levels[q4 - 1] ?? yU.levels.at(-1)).reward, yr)) {
            const q6 = {
              level: q4
            };
            const q7 = {
              name: "clan_prestigeFarmReward",
              args: q6,
              ident: "clan_prestigeFarmReward_" + q4
            };
            yQ.push(q7);
          }
        }
      }
    }
    const q0 = yQ.length ? await dd.Send(JSON.stringify({
      calls: yQ
    })).then(q8 => q8.results) : [];
    const q1 = p3(dR.COLLECT_REWARDS, {
      count: q0.length
    }) + " " + p3(dR.PRESTIGES);
    const q2 = {};
    if (ym) {
      b3(q1, 7000);
    }
    lU(q0.map(q8 => q8.result.response), q2);
    const q3 = {
      message: q1,
      rewards: q2
    };
    return q3;
  }
  const br = [{
    name: "questAllFarm",
    checked: true,
    label: p3(dR.QUEST_REWARDS),
    title: p3(dR.QUEST_REWARDS_TITLE)
  }, {
    name: "mailGetAll",
    checked: true,
    label: p3(dR.LETTER_MAIL),
    title: p3(dR.LETTER_MAIL_TITLE)
  }, {
    name: "farmBattlePass",
    checked: true,
    label: p3(dR.SEASON_REWARDS),
    title: p3(dR.SEASON_REWARDS_TITLE)
  }, {
    name: "farmPrestige",
    checked: true,
    label: p3(dR.PRESTIGE_REWARDS),
    title: p3(dR.PRESTIGE_REWARDS_TITLE)
  }, {
    name: "buff",
    checked: false,
    label: p3(dR.ENERGY_BOOST),
    title: p3(dR.ENERGY_BOOST_TITLE)
  }, {
    name: "stamina",
    checked: false,
    label: p3(dR.ENERGY_OVER),
    title: p3(dR.ENERGY_OVER_TITLE)
  }, {
    name: "portal",
    checked: false,
    label: p3(dR.PORTAL_CHARGE),
    title: p3(dR.PORTAL_CHARGE_TITLE)
  }, {
    name: "hero",
    checked: false,
    label: p3(dR.HERO_SOULS),
    title: p3(dR.HERO_SOULS_TITLE)
  }, {
    name: "vip",
    checked: false,
    label: p3(dR.VIP_POINTS),
    title: p3(dR.VIP_POINTS_TITLE)
  }];
  const bm = {
    questAllFarm: bu,
    mailGetAll: bE,
    farmBattlePass: bT,
    farmPrestige: bx
  };
  const bU = bm;
  async function bQ() {
    let yr = vo("selectRewards", {});
    let ym = [];
    let yU = {};
    lY(br, yr);
    const q0 = {
      checkBoxes: br
    };
    let q1 = await vI.confirm(p3(dR.SELECT_RECEIV), {}, {
      buttons: [{
        isClose: true,
        result: false
      }, {
        msg: p3(dR.BTN_RUN),
        result: true
      }]
    }, q0);
    if (q1) {
      const q2 = vI.getCheckBoxes();
      const q3 = {};
      q2.forEach(q4 => {
        q3[q4.name] = q4.checked;
        yr[q4.name].checked = q4.checked;
      });
      vu("selectRewards", yr);
      for (let q4 in bU) {
        if (q3[q4]) {
          const q5 = await bU[q4](q3, false);
          lU([q5.rewards], yU);
          ym.push(q5.message);
          b3(ym.join("\n"), 8000);
        }
      }
      if (ym.length > 0) {
        dv.refreshGame();
        dv.showLootboxReward(yU);
      } else {
        b3(p3(dR.ZERO_LOCATION_COLLECT), 6000);
      }
    }
  }
  let Y0 = 1;
  async function Y1(yr) {
    let ym = ["userGetInfo", "bossGetAll"].map(qd => ({
      name: qd,
      args: {},
      ident: qd
    }));
    let yU = await dd.Send({
      calls: ym
    }).then(qd => qd.results.map(qp => qp.result.response));
    let yQ = yU[1];
    let q0 = yU[0].starMoney;
    let q1 = 0;
    let q2 = 1;
    if (yr == 21) {
      q1 = 1740;
      q2 = 7;
    } else if (yr == 12) {
      q1 = 540;
      q2 = 4;
    }
    q1 *= Y0;
    if (q0 < q1) {
      const qd = {
        price: q1,
        currentStarMoney: q0
      };
      b3(p3(dR.NOT_ENOUGH_EMERALDS, qd), 7000);
      return {};
    }
    let q3 = Y0 * 90;
    let q4 = Y0 * 200;
    let q5 = [0, q3, q3, 0, q4, q4, 0].slice(0, q2);
    let q6 = 0;
    let q7 = 1;
    let q8 = {};
    for (let qp of yQ) {
      ym = [];
      let qz = 7;
      let ql = qp.id;
      if (qp.mayRaid) {
        const qv = {
          bossId: ql
        };
        const qb = {
          name: "bossRaid",
          args: qv,
          ident: "bossRaid_" + ql
        };
        ym.push(qb);
        qz = 0;
      }
      if (qz > 0) {
        qz = qp.chestNum - 1;
      }
      for (const qY of q5.slice(qz)) {
        const qy = {
          bossId: ql,
          amount: q7,
          starmoney: qY
        };
        const qq = {
          name: "bossOpenChest",
          args: qy,
          ident: "bossOpenChest_" + q6
        };
        ym.push(qq);
        q6++;
      }
      if (ym.length > 0) {
        const qc = {
          calls: ym
        };
        const qN = await dd.Send(qc).then(qC => qC.results.map(qW => qW.result.response));
        for (let qC of qN) {
          lU(qC.everyWinReward ? qC : (qC.rewards?.free ?? []).concat(qC.rewards?.payed ?? []), q8);
        }
      }
    }
    if (q6 == 0) {
      b3(p3(dR.CHESTS_NOT_AVAILABLE));
    } else {
      b3(p3(dR.OUTLAND_CHESTS_RECEIVED) + ": " + q6, 5000);
    }
    const q9 = {
      rewards: q8
    };
    return q9;
  }
  function Y2(yr, ym, yU) {
    let yQ = {};
    let q0 = [];
    for (let q1 in yr) {
      let q2 = yr[q1];
      let q3 = yr[+q1 + 1]?.count ?? 0;
      let q4 = q2.count - q3;
      q0.push(q2);
      for (let q5 of q0) {
        let q6 = Math.min(q4, Math.min(q5.count - yU[q5.color], Math.ceil(ym / q5.v)));
        if (q6 > 0) {
          let q7 = q5.type;
          let q8 = q5.id;
          if (!yQ[q7]) {
            yQ[q7] = {};
          }
          if (!yQ[q7][q8]) {
            yQ[q7][q8] = 0;
          }
          yQ[q7][q8] += q6;
          q5.count -= q6;
          ym -= q6 * q5.v;
          if (ym <= 0) {
            return yQ;
          }
        }
      }
    }
    return yQ;
  }
  const Y3 = [{
    name: 1,
    label: p3(dR.GRAY),
    checked: true
  }, {
    name: 2,
    label: p3(dR.GREEN),
    checked: true
  }, {
    name: 3,
    label: p3(dR.BLUE),
    checked: false
  }, {
    name: 4,
    label: p3(dR.PURPLE),
    checked: false
  }, {
    name: 5,
    label: p3(dR.ORANGE),
    checked: false
  }, {
    name: 6,
    label: p3(dR.RED),
    checked: false
  }];
  async function Y4() {
    let yr = ["questGetAll", "inventoryGet", "clanGetInfo"].map(qc => ({
      name: qc,
      args: {},
      ident: qc
    }));
    let ym = await dd.Send({
      calls: yr
    }).then(qc => qc.results.map(qN => qN.result.response));
    let yU = ym[0];
    let yQ = ym[1];
    let q0 = ym[2].stat;
    let q1 = 2000 - q0.todayItemsActivity;
    if (q1 <= 0) {
      b3(p3(dR.NO_MORE_ACTIVITY), 6000);
      return;
    }
    let q2 = 0;
    let q3 = yU.find(qc => qc.id > 10046 && qc.id < 10051);
    if (q3) {
      q2 = 1750 - q3.progress;
    }
    if (q2 <= 0) {
      q2 = q1;
    }
    let q4 = vo("selectColors", {});
    lY(Y3, q4);
    const q5 = {
      maxActive: q1
    };
    const q7 = {
      checkBoxes: Y3
    };
    q2 = p0(await vI.confirm(p3(dR.EXCHANGE_ITEMS, q5), {}, {
      buttons: [{
        result: 0,
        isClose: true
      }, {
        msg: p3(dR.GET_ACTIVITY),
        isInput: true,
        default: q2.toString()
      }]
    }, q7), 0, 0, q1);
    if (!q2) {
      return;
    }
    let q8 = vI.getCheckBoxes();
    let q9 = [];
    q8.forEach(qc => {
      q4[qc.name].checked = qc.checked;
    });
    vu("selectColors", q4);
    const qp = Object.keys(q4).filter(qc => q4[qc].checked).map(qc => +qc);
    const qz = {
      "1": 50,
      "2": 100,
      "3": 100,
      "4": 200,
      "5": 400,
      "6": 1000
    };
    const ql = dv.lib.inventoryItem;
    for (let qc of ["gear", "scroll"]) {
      for (let qC in yQ[qc]) {
        const qW = ql[qc][qC]?.enchantValue ?? 0;
        const qh = ql[qc][qC]?.color ?? 6;
        const qn = {
          id: qC,
          count: yQ[qc][qC],
          v: qW,
          type: qc,
          color: qh
        };
        q9.push(qn);
      }
      const qN = "fragment" + qc.toLowerCase().charAt(0).toUpperCase() + qc.slice(1);
      for (let qg in yQ[qN]) {
        const qZ = ql[qc][qg]?.fragmentEnchantValue ?? 0;
        const qf = ql[qc][qg]?.color ?? 6;
        const qj = {
          id: qg,
          count: yQ[qN][qg],
          v: qZ,
          type: qN,
          color: qf
        };
        q9.push(qj);
      }
    }
    q9 = q9.filter(qV => qp.includes(qV.color) && qV.count > qz[qV.color]);
    q9 = q9.sort((qV, qB) => qB.count - qV.count);
    let qv = Y2(q9, q2, qz);
    let qb = "\n\n" + p3(dR.ITEM_SPENT) + ":";
    if (Object.keys(qv).length == 0) {
      b3(p3(dR.NOT_ENOUGH_ITEMS), 6000);
      return;
    }
    for (let qV in qv) {
      for (let qB in qv[qV]) {
        let qw = "";
        switch (qV) {
          case "fragmentGear":
            qw += p3(dR.FRAGMENT);
          case "gear":
            qw += dv.translate("LIB_GEAR_NAME_" + qB);
            break;
          case "fragmentScroll":
            qw += p3(dR.FRAGMENT);
          case "scroll":
            qw += dv.translate("LIB_SCROLL_NAME_" + qB);
            break;
        }
        qb += "\n" + qv[qV][qB] + " " + qw;
      }
    }
    const qY = {
      items: qv
    };
    const qy = {
      name: "clanItemsForActivity",
      args: qY,
      ident: "body"
    };
    yr = [qy];
    const qq = {
      calls: yr
    };
    await dd.Send(qq).then(qX => {
      b3(p3(dR.ACTIVITY_RECEIVED) + ": " + qX.results[0].result.response + qb, 12000);
    });
    dv.refreshGame();
    dv.showLootboxReward(qv, false);
  }
  const Y5 = [{
    name: 4,
    label: p3(dR.ARENAS),
    checked: true
  }, {
    name: 5,
    label: p3(dR.GRAND_ARENAS),
    checked: true
  }, {
    name: 6,
    label: p3(dR.TOWERS),
    checked: true
  }, {
    name: 9,
    label: p3(dR.FRIENDS),
    checked: true
  }, {
    name: 10,
    label: p3(dR.OUTLANDS),
    checked: false
  }, {
    name: 8,
    label: p3(dR.SOUL_STONES),
    checked: false
  }, {
    name: 17,
    label: p3(dR.PETS),
    checked: false
  }];
  async function Y6() {
    let yr = vo("selectShops", {});
    lY(Y5, yr);
    const yU = {
      checkBoxes: Y5
    };
    let yQ = await vI.confirm(p3(dR.SELECT_SHOPS), {}, {
      buttons: [{
        isClose: true,
        result: 0
      }, {
        msg: p3(dR.BTN_RUN),
        result: 1
      }]
    }, yU);
    if (yQ == 0) {
      return;
    }
    let q0 = vI.getCheckBoxes();
    q0.forEach(qp => {
      yr[qp.name].checked = qp.checked;
    });
    vu("selectShops", yr);
    let q1 = ["inventoryGet", "shopGetAll"].map(qp => ({
      name: qp,
      args: {},
      ident: qp
    }));
    let q2 = await dd.Send({
      calls: q1
    }).then(qp => qp.results.map(qz => qz.result.response));
    let q3 = q2[0];
    let q4 = Object.keys(yr).filter(qp => yr[qp].checked).map(qp => +qp);
    let q5 = Object.values(q2[1]).filter(qp => q4.includes(qp.id));
    q1 = [];
    for (let qp of q5) {
      const qz = Object.values(qp.slots);
      for (const ql of qz) {
        if (ql.bought || !("fragmentHero" in ql.reward)) {
          continue;
        }
        const qv = Object.keys(ql.cost).pop();
        const qb = Object.keys(ql.cost[qv]).pop();
        const qY = q3[qv][qb] ?? 0;
        if (ql.cost[qv][qb] > qY) {
          continue;
        }
        q3[qv][qb] -= ql.cost[qv][qb];
        const qy = {
          shopId: qp.id,
          slot: ql.id,
          cost: ql.cost,
          reward: ql.reward
        };
        const qq = {
          name: "shopBuy",
          args: qy,
          ident: "shopBuy_" + qp.id + "_" + ql.id
        };
        q1.push(qq);
      }
    }
    if (!q1.length) {
      b3(p3(dR.NO_PURCHASABLE_HERO_SOULS), 5000);
      return;
    }
    const q6 = {
      calls: q1
    };
    let q7 = await dd.Send(q6).then(qc => qc.results.map(qN => qN.result.response));
    let q8 = 0;
    let q9 = {};
    if (!q7) {
      return;
    }
    for (const qc of q7) {
      q8 += +Object.values(Object.values(qc).pop()).pop();
    }
    lU(q7, q9);
    dv.showLootboxReward(q9);
    const qd = {
      countHeroSouls: q8
    };
    b3(p3(dR.PURCHASED_HERO_SOULS, qd), 5000);
  }
  async function Y7(yr, ym) {
    pi = false;
    let yU = yr.error.name + " " + yr.error.description + ("<br>" + p3(dR.REPETITIONS) + ": " + ym);
    await vI.confirm(yU, {}, {
      buttons: [{
        msg: p3(dR.BTN_OK),
        result: true
      }]
    });
  }
  async function Y8(yr) {
    if (pA || yr.count >= yr.countRepeatMission) {
      pi = false;
      console.log(p3(dR.STOPPED));
      b3("");
      b5("");
      await vI.confirm(p3(dR.STOPPED) + "<br>" + p3(dR.REPETITIONS) + ": " + yr.count, {}, {
        buttons: [{
          msg: p3(dR.BTN_OK),
          result: true
        }]
      });
      if (Object.keys(yr.rewards).length > 0) {
        dv.showLootboxReward(yr.rewards);
      }
      return;
    }
    pt = Date.now();
    const ym = {
      name: "missionStart",
      args: pf,
      ident: "body"
    };
    let yU = [ym];
    let yQ = await dd.Send({
      calls: yU
    });
    if (yQ.error) {
      Y7(yQ, yr.count);
      return;
    }
    let q0 = await lK(yQ.results[0].result.response);
    if (!q0.result.win) {
      pi = false;
      await vI.confirm(p3(dR.STOPPED) + "<br>" + p3(dR.REPETITIONS) + ": " + yr.count + "<br><br>" + p3(dR.FAILED_TO_WIN) + "!", {}, {
        buttons: [{
          msg: p3(dR.BTN_OK),
          result: true
        }]
      });
      if (Object.keys(yr.rewards).length > 0) {
        dv.showLootboxReward(yr.rewards);
      }
      return;
    }
    let q1 = (Date.now() - pt) / 1000;
    let q2 = b8(q0.battleTime[0]) + 2 - q1;
    if (q2 > 0) {
      await b9(q2);
    }
    const q3 = {
      id: yr.id,
      result: q0.result,
      progress: q0.progress
    };
    const q4 = {
      name: "missionEnd",
      args: q3,
      ident: "body"
    };
    yU = [q4];
    const q5 = {
      calls: yU
    };
    let q6 = await dd.Send(q5);
    if (q6.error) {
      Y7(q6, yr.count);
      return;
    }
    let q7 = q6.results[0].result.response;
    let q8 = q7?.reward ?? {};
    if (q7.error) {
      Y7(q7, yr.count);
      return;
    }
    yr.count++;
    delete q8.heroXp;
    lU([q8], yr.rewards);
    b3(p3(dR.MISSIONS_PASSED) + ": " + yr.count + " (" + p3(dR.STOP) + ")", 0, () => {
      pA = true;
    });
    setTimeout(Y8, 1, yr);
  }
  function Y9(yr = true) {
    return new Promise(ym => {
      const yU = new Yd(ym, yr);
      yU.start();
    });
  }
  function Yd(yr, ym) {
    let yQ = {
      teams: [],
      favor: {},
      nodes: [],
      attempts: 0,
      countExecuteBattles: 0,
      cancelBattle: 0
    };
    let q0 = {};
    this.start = function () {
      let qd = ["clanRaid_getInfo", "teamGetAll", "teamGetFavor"].map(qz => ({
        name: qz,
        args: {},
        ident: qz
      }));
      const qp = {
        calls: qd
      };
      dd.Send(qp).then(qz => q1(qz));
    };
    async function q1(qd) {
      let qp = 0;
      let qz = qd.results;
      let ql = qz[0].result.response;
      let qv = qz[1].result.response;
      let qb = qz[2].result.response;
      if (!ql || !qv.clanRaid_nodes) {
        q9("notAvailable");
        return;
      }
      for (let qY of qv.clanRaid_nodes) {
        yQ.teams.push({
          data: {},
          heroes: qY.filter(qy => qy < 6000),
          pet: qY.filter(qy => qy >= 6000).pop(),
          battleIndex: qp++
        });
      }
      yQ.favor = qb.clanRaid_nodes;
      yQ.nodes = ql.nodes;
      yQ.attempts = ql.attempts;
      pX = false;
      q3();
    }
    function q2() {
      for (let qd in yQ.nodes) {
        let qp = yQ.nodes[qd];
        let qz = 0;
        let ql = Date.now() / 1000;
        for (let qv of qp.teams) {
          qz += qv.points;
        }
        if (!qz && ql > qp.timestamps.start && ql < qp.timestamps.end) {
          let qb = qp.teams.length;
          delete yQ.nodes[qd];
          const qY = {
            nodeId: qd,
            countTeam: qb
          };
          return qY;
        }
      }
      return null;
    }
    function q3() {
      b3(p3(dR.REMAINING_ATTEMPTS) + ": " + yQ.attempts);
      let qd = q2();
      if (qd && yQ.attempts) {
        q4(qd);
        return;
      }
      q9("EndRaidNodes");
    }
    function q4(qd) {
      let {
        nodeId: qp,
        countTeam: qz
      } = qd;
      let ql = yQ.teams.slice(0, qz);
      let qv = yQ.teams.map(qN => qN.heroes).flat();
      let qb = {
        ...yQ.favor
      };
      for (let qN in qb) {
        if (!qv.includes(+qN)) {
          delete qb[qN];
        }
      }
      const qY = {
        nodeId: qp,
        teams: ql,
        favor: qb
      };
      const qy = {
        name: "clanRaid_startNodeBattles",
        args: qY,
        ident: "body"
      };
      let qq = [qy];
      const qc = {
        calls: qq
      };
      dd.Send(qc).then(qC => q5(qC));
    }
    async function q5(qd) {
      if (qd.error) {
        q9("nodeBattlesError", qd.error);
        return;
      }
      console.log(qd);
      let qp = qd.results[0].result.response.battles;
      let qz = [];
      let ql = 0;
      for (let qq of qp) {
        qq.battleIndex = ql++;
        qz.push(qq);
      }
      let qv = await lW(qz);
      let qb = {};
      let qY = true;
      let qy = 500;
      for (let qc of qv) {
        qY &&= qc.result.win;
      }
      if (!qY && ym) {
        q6(qv[0]);
        return;
      }
      yQ.countExecuteBattles = qv.length;
      for (let qN of qv) {
        setTimeout(q7, qy, qN);
        qy += 500;
      }
    }
    function q6(qd) {
      la(qd);
      q7(qd);
    }
    function q7(qd) {
      let qp = qd.battleData.result.nodeId;
      let qz = qd.battleData.battleIndex;
      let ql = [{
        name: "clanRaid_endNodeBattle",
        args: {
          nodeId: qp,
          battleIndex: qz,
          result: qd.result,
          progress: qd.progress
        },
        ident: "body"
      }];
      const qv = {
        calls: ql
      };
      dd.Send(qv).then(qb => q8(qb));
    }
    function q8(qd) {
      if (qd.error) {
        q9("missionEndError", qd.error);
        return;
      }
      let qp = qd.results[0].result.response;
      lU([qp.reward], q0);
      if (qp.error) {
        if (qp.reason == "invalidBattle") {
          yQ.cancelBattle++;
          q3();
        } else {
          q9("missionEndError", qd.error);
        }
        return;
      }
      if (! --yQ.countExecuteBattles) {
        yQ.attempts--;
        q3();
      }
    }
    function q9(qd, qp) {
      pX = true;
      let qz = yQ.cancelBattle ? " " + p3(dR.BATTLES_CANCELED) + ": " + yQ.cancelBattle : "";
      b3(p3(dR.MINION_RAID) + " " + p3(dR.COMPLETED) + "! " + qz, 6000);
      console.log(qd, qp);
      const ql = {
        rewards: q0
      };
      yr(ql);
    }
  }
  function Yp() {
    return new Promise((yr, ym) => {
      const yU = new Yz(yr, ym);
      yU.start();
    });
  }
  function Yz(yr, ym, yU = false) {
    let yQ = pf;
    let q0 = 0;
    let q1;
    let q2 = 100;
    let q3 = true;
    let q4 = {};
    this.start = async function () {
      pX = false;
      let ql = true;
      let qv = false;
      if (!z5?.best) {
        ql = false;
        z5 = {
          count: 0,
          winRate: 0,
          best: {
            hp: 0
          }
        };
      }
      if (z5.winRate > 0 || pj == "bossAttack" || yU) {
        qv = true;
      } else {
        const qy = {
          isClose: true,
          result: -111
        };
        const qc = await vI.confirm((ql ? p3(dR.VICTORY_IMPOSSIBLE) + (await vY()) : p3(dR.NO_PRECALC_DATA)) + ("\n\n" + p3(dR.SET_NEED_HP) + ": "), {}, {
          buttons: [{
            msg: p3(dR.BTN_RUN),
            isInput: true,
            default: z5.best.hp
          }, qy],
          options: {
            inColumn: true
          }
        });
        if (qc == -111) {
          qz(p3(dR.NOT_THIS_TIME));
        } else {
          q1 = p0(qc, 0, 0, 100);
          qv = true;
        }
      }
      if (qv) {
        if (yU) {
          q4 = await lO();
        }
        q6();
      }
    };
    function q5() {
      q3 = false;
      pR = true;
    }
    async function q6() {
      q0++;
      const ql = {
        name: pj,
        args: yQ,
        ident: "body"
      };
      let qv = [ql];
      let qb = await dd.Send({
        calls: qv
      });
      q7(qb);
    }
    async function q7(ql) {
      if ("error" in ql) {
        console.log(ql);
        const qv = await vI.confirm(p3(dR.ERROR_DURING_THE_BATTLE), {}, {
          buttons: [{
            msg: p3(dR.BTN_OK),
            result: false
          }, {
            msg: p3(dR.RELOAD_GAME),
            result: true
          }]
        });
        qz("Error", ql.error);
        if (qv) {
          location.reload();
        }
      } else {
        let qb = ql.results[0].result.response.battle || ql.results[0].result.response;
        pD = qb;
        pt = Date.now();
        let qY = await lK(qb);
        await q8(qY);
      }
    }
    async function q8(ql) {
      if (!ql.result.win && q4.valid) {
        const qv = await vZ(pD, (q4.x ?? 0) - 273235429, (q4.y ?? 0) - 904648297, ql, !pd("manualPrecalc"), 30000);
        ql[q4.p] = qv.result;
        ql[q4.f][0][q4.s] = qv.progress[0].attackers;
        ql[q4.f][0][q4.t] = qv.progress[0].defenders;
        b5(qv.message);
      }
      if (ql.result.win) {
        qp(ql);
        const qb = {
          countBattle: q0
        };
        b3(p3(dR.WIN_ATTEMPT, qb));
      } else {
        const qY = vb(ql).hp;
        if (qY < q2) {
          q2 = qY.ceil(2);
        }
        if (q1 && qY <= q1) {
          qp(ql);
          const qq = {
            countBattle: q0
          };
          b3(p3(dR.RESULT_ATTEMPT, qq));
          return;
        }
        const qy = {
          countBattle: q0,
          bestCoeff: q2
        };
        b3(p3(dR.BATTLE_PROGRESS, qy) + "\n" + p3(dR.CLICK_TO_STOP), 0, q5);
        if (pj == "adventureSolo_turnStartBattle" || pj == "adventure_turnStartBattle") {
          await qd(ql);
        }
        if (q3) {
          q6();
        } else {
          const qc = {
            countBattle: q0,
            bestCoeff: q2
          };
          b3(p3(dR.BATTLE_PROGRESS, qc) + "\n" + p3(dR.STOPPED), 10000);
          qz("stop");
        }
      }
    }
    async function q9(ql) {
      const qv = {
        result: ql.result,
        progress: ql.progress
      };
      let qb = qv;
      if (pj == "titanArenaStartBattle") {
        qb.rivalId = pf.rivalId;
      }
      const qY = {
        name: pV,
        args: qb,
        ident: "body"
      };
      let qy = [qY];
      const qq = {
        calls: qy
      };
      return dd.Send(qq);
    }
    async function qd(ql) {
      la(ql);
      return await q9(ql);
    }
    async function qp(ql) {
      pc = true;
      let qv = await q9(ql);
      console.log(qv);
      qz(p3(dR.SUCCESS) + "!");
    }
    function qz(ql, qv) {
      pX = true;
      console.log(ql, qv);
      yr();
    }
  }
  class Yq {
    callsList = ["userGetInfo", "heroGetAll", "titanGetAll", "inventoryGet", "questGetAll", "bossGetAll", "missionGetAll"];
    questInfo = {};
    dataQuests = {
      10001: {
        ident: "skills",
        description: p3(dR.QUEST_10001),
        doItCall: () => {
          return this.getUpgradeSkills().map(({
            heroId: heroId,
            skill: skill
          }, index) => ({
            name: "heroUpgradeSkill",
            args: {
              heroId: heroId,
              skill: skill
            },
            ident: "heroUpgradeSkill_" + index
          }));
        },
        isWeCanDo: () => {
          let sumGold = 0;
          for (const skill of this.getUpgradeSkills()) {
            sumGold += this.skillCost(skill.value);
            if (!skill.heroId) {
              return false;
            }
          }
          return this.questInfo.userGetInfo.gold > sumGold;
        }
      },
      10003: {
        ident: "heroicMission",
        description: p3(dR.QUEST_10003),
        doItCall: () => {
          if (bN()) {
            return [{
              name: "missionRaid",
              args: {
                id: 116,
                times: 3
              },
              ident: "missionRaid"
            }];
          } else {
            return [0, 1, 2].map(num => ({
              name: "missionRaid",
              args: {
                id: 116,
                times: 1
              },
              ident: "missionRaid" + num
            }));
          }
        },
        isWeCanDo: () => {
          const user = this.questInfo.userGetInfo;
          const energy = user.refillable[0].amount;
          return bC() && energy >= 48 && this.questInfo.missionGetAll[115]?.stars >= 3;
        }
      },
      10006: {
        ident: "alchemyUse",
        description: p3(dR.QUEST_10006),
        doItCall: () => [{
          name: "refillableAlchemyUse",
          args: {
            multi: false
          },
          ident: "refillableAlchemyUse"
        }],
        isWeCanDo: () => {
          return this.questInfo.userGetInfo.starMoney >= 20;
        }
      },
      10007: {
        ident: "gachaOpen",
        description: p3(dR.QUEST_10007),
        doItCall: () => [{
          name: "gacha_open",
          args: {
            ident: "heroGacha",
            free: true,
            pack: false
          },
          ident: "gacha_open"
        }],
        isWeCanDo: () => {
          return this.questInfo.inventoryGet.coin[38] > 0;
        }
      },
      10016: {
        ident: "sendGifts",
        description: p3(dR.QUEST_10016),
        doItCall: () => [{
          name: "clanSendDailyGifts",
          args: {},
          ident: "clanSendDailyGifts"
        }],
        isWeCanDo: () => true
      },
      10018: {
        ident: "useHeroXp",
        description: p3(dR.QUEST_10018),
        doItCall: () => {
          const expHero = this.getExpHero();
          const t = {
            heroId: expHero.heroId,
            libId: expHero.libId,
            amount: 1
          };
          const A = {
            name: "consumableUseHeroXp",
            args: t,
            ident: "consumableUseHeroXp"
          };
          return [A];
        },
        isWeCanDo: () => {
          const expHero = this.getExpHero();
          return expHero.heroId && expHero.libId;
        }
      },
      10023: {
        ident: "heroTitanGiftLevelUp",
        description: p3(dR.QUEST_10023),
        doItCall: () => {
          const up = this.getHeroIdTitanGift();
          const args = {
            heroId: up.heroId
          };
          const HTG = "heroTitanGift";
          return [...Array(up.count).keys()].flatMap(num => ["LevelUp", "Drop"].map(type => ({
            name: HTG + type,
            args: args,
            ident: HTG + type + num
          })));
        },
        isWeCanDo: () => {
          return this.getHeroIdTitanGift().count;
        }
      },
      10024: {
        ident: "heroArtifactLevelUp",
        description: p3(dR.QUEST_10024),
        doItCall: () => {
          const upArtifact = this.getUpgradeArtifact();
          const t = {
            heroId: upArtifact.heroId,
            slotId: upArtifact.slotId
          };
          const A = {
            name: "heroArtifactLevelUp",
            args: t,
            ident: "heroArtifactLevelUp"
          };
          return [A];
        },
        isWeCanDo: () => {
          return this.getUpgradeArtifact().heroId;
        }
      },
      10028: {
        ident: "titanArtifactLevelUp",
        description: p3(dR.QUEST_10028),
        doItCall: () => {
          const upTitanArtifact = this.getUpgradeTitanArtifact();
          const t = {
            titanId: upTitanArtifact.titanId,
            slotId: upTitanArtifact.slotId
          };
          const A = {
            name: "titanArtifactLevelUp",
            args: t,
            ident: "titanArtifactLevelUp"
          };
          return [A];
        },
        isWeCanDo: () => {
          return this.getUpgradeTitanArtifact().titanId;
        }
      },
      10029: {
        ident: "titanArtifactChestOpen",
        description: p3(dR.QUEST_10029),
        doItCall: () => [{
          name: "titanArtifactChestOpen",
          args: {
            amount: 1,
            free: true
          },
          ident: "titanArtifactChestOpen"
        }],
        isWeCanDo: () => {
          return this.questInfo.inventoryGet?.consumable[55] > 0;
        }
      },
      10030: {
        ident: "heroSkinUpgrade",
        description: p3(dR.QUEST_10030),
        doItCall: () => {
          const upSkin = this.getUpgradeSkin();
          const A = {
            heroId: upSkin.heroId,
            skinId: upSkin.skinId
          };
          const i = {
            name: "heroSkinUpgrade",
            args: A,
            ident: "heroSkinUpgrade"
          };
          return [i];
        },
        isWeCanDo: () => {
          return this.getUpgradeSkin().heroId;
        }
      },
      10044: {
        ident: "petChestOpen",
        description: p3(dR.QUEST_10044),
        doItCall: () => [{
          name: "pet_chestOpen",
          args: {
            amount: 1,
            paid: false
          },
          ident: "pet_chestOpen"
        }],
        isWeCanDo: () => {
          return this.questInfo.inventoryGet?.consumable[90] > 0;
        }
      },
      10047: {
        ident: "heroEnchantRune",
        description: p3(dR.QUEST_10047),
        doItCall: () => {
          const enchantRune = this.getEnchantRune();
          const i = {
            heroId: enchantRune.heroId,
            tier: enchantRune.tier,
            items: {}
          };
          i.items.consumable = {
            [enchantRune.itemId]: 1
          };
          const s = {
            name: "heroEnchantRune",
            args: i,
            ident: "heroEnchantRune"
          };
          return [s];
        },
        isWeCanDo: () => {
          return this.getEnchantRune().heroId && this.questInfo.userGetInfo.gold > 1000;
        }
      }
    };
    constructor(yr, ym, yU) {
      this.resolve = yr;
      this.reject = ym;
    }
    async autoInit(yr) {
      this.isAuto = yr || false;
      const ym = {};
      const yU = this.callsList.map(q0 => ({
        name: q0,
        args: {},
        ident: q0
      }));
      const yQ = await dd.Send({
        calls: yU
      }).then(q0 => q0.results);
      for (const q0 of yQ) {
        ym[q0.ident] = q0.result.response;
      }
      this.questInfo = ym;
    }
    async start() {
      const yr = [];
      const ym = vo("selectedActions", {});
      for (let q3 in this.dataQuests) {
        let q4 = this.questInfo.questGetAll.find(q8 => q8.id == q3);
        let q5 = this.dataQuests[q3];
        let q6 = q5.ident;
        if (!ym[q6]) {
          ym[q6] = {
            checked: false
          };
        }
        this.questInfo[q6] = q4;
        if (!this.isAuto || q4 && q4.state == 1 && q5.isWeCanDo.call(this)) {
          const q8 = {
            name: q6,
            id: q4?.id,
            label: q5.description,
            checked: ym[q6].checked
          };
          yr.push(q8);
        }
      }
      if (!yr.length) {
        this.end(p3(dR.NOTHING_TO_DO));
        return;
      }
      console.log(yr);
      let yU = [];
      if (this.isAuto) {
        yU = yr;
      } else {
        const qd = {
          checkBoxes: yr
        };
        const qp = await vI.confirm(p3(dR.SELECT_QUEST), {}, {
          buttons: [{
            msg: p3(dR.SAVE),
            result: true
          }, {
            isClose: true,
            result: false
          }]
        }, qd);
        yU = vI.getCheckBoxes();
        yU.forEach(qz => {
          ym[qz.name].checked = qz.checked;
        });
        vu("selectedActions", ym);
        return;
      }
      pC = true;
      let yQ = [];
      let q0 = 0;
      let q1 = {};
      try {
        for (const qv of yU) {
          if (qv.checked) {
            q0++;
            const qb = this.dataQuests[qv.id];
            console.log(qb.description);
            if (qb.doItCall) {
              yQ.push(...qb.doItCall.call(this));
            }
          }
        }
        if (!q0) {
          this.end(p3(dR.NOT_QUEST_COMPLETED));
          return;
        }
        const qz = {
          calls: yQ
        };
        const ql = await dd.Send(qz);
        for (let qY of ql.results) {
          const qy = qY.result.response;
          if (qY.ident.includes("missionRaid")) {
            lU(qy, q1);
          } else if (qY.ident.includes("refillableAlchemyUse")) {
            lU([qy[0].reward], q1);
          } else if (qY.ident.includes("titanArtifactChestOpen")) {
            lU(qy.reward, q1);
          } else if (qY.ident.includes("pet_chestOpen")) {
            lU(qy.rewards, q1);
          } else if (qY.ident.includes("gacha_open")) {
            lU(Object.values(qy.rewards).flat(), q1);
          }
        }
      } catch (qq) {
        if (await vI.confirm(p3(dR.ERRORS_OCCURRES) + ":<br> " + name + " <br>" + p3(dR.COPY_ERROR) + "?", {}, {
          buttons: [{
            msg: p3(dR.BTN_NO),
            result: false
          }, {
            msg: p3(dR.BTN_YES),
            result: true
          }]
        })) {
          this.errorHandling(qq);
        }
      }
      this.end(p3(dR.COMPLETED_QUESTS) + ": " + q0, q1);
      const q2 = {
        rewards: q1
      };
      return q2;
    }
    errorHandling(yr) {
      let ym = yr.toString() + "\n";
      try {
        const yU = yr.stack.split("\n");
        const yQ = yU.map(q0 => q0.split("@")[0]).indexOf("dailyQuests");
        ym += yU.slice(0, yQ).join("\n");
      } catch (q0) {
        ym += yr.stack;
      }
      dQ(ym);
    }
    skillCost(yr) {
      return yr ** 0.9 * 573 + yr ** 2.379;
    }
    getUpgradeSkills() {
      const yQ = Object.values(this.questInfo.heroGetAll);
      const q0 = dv.lib.skill;
      const q1 = [1, 2, 4, 7];
      const q2 = [{
        heroId: 0,
        slotId: 0,
        value: 130
      }, {
        heroId: 0,
        slotId: 0,
        value: 130
      }, {
        heroId: 0,
        slotId: 0,
        value: 130
      }];
      for (const q3 of yQ) {
        const q4 = q3.level;
        const q5 = q3.color;
        for (let q6 in q3.skills) {
          const q7 = q0[q6].tier;
          const q8 = q3.skills[q6];
          if (q5 < q1[q7] || q7 < 1 || q7 > 4) {
            continue;
          }
          for (let q9 of q2) {
            if (q8 < q9.value && q8 < q4) {
              q9.value = q8;
              q9.heroId = q3.id;
              q9.skill = q7;
              break;
            }
          }
        }
      }
      return q2;
    }
    getUpgradeArtifact() {
      const ym = Object.values(this.questInfo.heroGetAll);
      const yU = this.questInfo.inventoryGet;
      const yQ = {
        heroId: 0,
        slotId: 0,
        level: 100
      };
      const q0 = dv.lib.hero;
      const q1 = dv.lib.artifact;
      for (const q2 of ym) {
        const q3 = q0[q2.id];
        const q4 = q2.level;
        if (q4 < 20) {
          continue;
        }
        for (let q5 in q2.artifacts) {
          const q6 = q2.artifacts[q5];
          const q7 = q6.star;
          const q8 = q6.level;
          if (!q7 || q8 >= 100) {
            continue;
          }
          const q9 = q3.artifacts[q5];
          const qd = q1.id[q9];
          const qp = q1.type[qd.type].levels[q8 + 1].cost;
          const qz = Object.keys(qp).pop();
          const ql = Object.entries(qp[qz]).pop();
          const qv = ql[0];
          const qb = +ql[1];
          if (q8 < yQ.level && yU[qz][qv] >= qb) {
            yQ.level = q8;
            yQ.heroId = q2.id;
            yQ.slotId = q5;
            yQ.costCurrency = qz;
            yQ.costId = qv;
            yQ.costValue = qb;
          }
        }
      }
      return yQ;
    }
    getUpgradeSkin() {
      const ym = Object.values(this.questInfo.heroGetAll);
      const yU = this.questInfo.inventoryGet;
      const yQ = {
        heroId: 0,
        skinId: 0,
        level: 60,
        cost: 1500
      };
      const q0 = dv.lib.skin;
      const q1 = {};
      const q2 = Object.values(q0).filter(q3 => q3.isDefault && q3.enabled);
      for (const q3 of q2) {
        q1[q3.heroId] = q3.id;
      }
      for (const q4 of ym) {
        const q5 = q4.level;
        const q6 = q1[q4.id];
        if (q5 < 20) {
          continue;
        }
        if (!q4.skins || Object.keys(q4.skins).length == 0) {
          q4.skins = {};
        }
        if (!q4.skins[q6]) {
          q4.skins[q6] = 0;
        }
        for (let q7 in q4.skins) {
          const q8 = q4.skins[q7];
          const q9 = q0[q7];
          if (q8 >= 60 || !q9?.statData?.levels?.[q8 + 1]) {
            continue;
          }
          const qd = q9.statData.levels[q8 + 1]?.cost;
          const qp = Object.keys(qd).pop();
          const qz = Object.keys(qd[qp]).pop();
          const ql = +qd[qp][qz];
          if (q8 < yQ.level && ql < yQ.cost && yU[qp][qz] >= ql) {
            yQ.cost = ql;
            yQ.level = q8;
            yQ.heroId = q4.id;
            yQ.skinId = q7;
            yQ.costCurrency = qp;
            yQ.costCurrencyId = qz;
          }
        }
      }
      return yQ;
    }
    getUpgradeTitanArtifact() {
      const ym = Object.values(this.questInfo.titanGetAll);
      const yU = this.questInfo.inventoryGet;
      const yQ = this.questInfo.userGetInfo;
      const q0 = {
        titanId: 0,
        slotId: 0,
        level: 120
      };
      const q1 = dv.lib.titan;
      const q2 = dv.lib.titanArtifact;
      for (const q3 of ym) {
        const q4 = q1[q3.id];
        for (let q5 in q3.artifacts) {
          const q6 = q3.artifacts[q5];
          const q7 = q6.star;
          const q8 = q6.level;
          if (!q7 || q8 >= 120) {
            continue;
          }
          let q9 = q4.artifacts[q5];
          let qd = q2.id[q9];
          let qp = q2.type[qd.type].levels[q8 + 1].cost;
          let qz = Object.keys(qp).pop();
          let ql = 0;
          let qv = 0;
          if (qz == "gold") {
            ql = qp[qz];
            qv = yQ.gold;
          } else {
            const qb = Object.entries(qp[qz]).pop();
            const qY = qb[0];
            ql = +qb[1];
            qv = yU[qz][qY];
          }
          if (q8 < q0.level && qv >= ql) {
            q0.level = q8;
            q0.titanId = q3.id;
            q0.slotId = q5;
            break;
          }
        }
      }
      return q0;
    }
    getEnchantRune() {
      const ym = Object.values(this.questInfo.heroGetAll);
      const yU = this.questInfo.inventoryGet;
      const yQ = {
        heroId: 0,
        tier: 0,
        exp: 0,
        itemId: 0
      };
      for (let q3 = 1; q3 <= 4; q3++) {
        if (yU.consumable[q3] > 0) {
          yQ.itemId = q3;
          break;
        }
      }
      if (yQ.itemId == 0) {
        return yQ;
      }
      const q0 = dv.lib.rune;
      const q1 = Object.values(q0.level);
      const q2 = [4, 4, 7, 8, 9];
      for (const q4 of ym) {
        const q5 = q4.color;
        for (let q6 in q4.runes) {
          let q7 = q4.runes[q6];
          let q8 = 0;
          if (q5 < q2[q6] || q7 >= 43750) {
            continue;
          }
          if (q7++) {
            for (let qd of q1) {
              if (q7 > qd.enchantValue) {
                q8 = qd.level + 1;
              } else {
                break;
              }
            }
          }
          const q9 = q0.level[q8].heroLevel;
          if (q4.level < q9) {
            continue;
          }
          if (q7 > yQ.exp) {
            yQ.exp = q7;
            yQ.heroId = q4.id;
            yQ.tier = q6;
            break;
          }
        }
      }
      return yQ;
    }
    getExpHero() {
      const ym = Object.values(this.questInfo.heroGetAll);
      const yU = this.questInfo.inventoryGet;
      const yQ = {
        heroId: 0,
        exp: 3625195,
        libId: 0
      };
      for (let q0 = 9; q0 <= 12; q0++) {
        if (yU.consumable[q0]) {
          yQ.libId = q0;
          break;
        }
      }
      for (const q1 of ym) {
        const q2 = q1.xp;
        if (q2 < yQ.exp) {
          yQ.heroId = q1.id;
        }
      }
      return yQ;
    }
    getHeroIdTitanGift() {
      let ym = Object.values(this.questInfo.heroGetAll);
      let yU = this.questInfo.inventoryGet;
      let yQ = this.questInfo.userGetInfo;
      let q0 = dv.lib.titanGift;
      let q1 = dv.lib.quest.clan[20000034].farmCondition.amount;
      let q2 = yU.consumable[24];
      let q3 = 30;
      let q4 = {
        heroId: 0,
        count: 0
      };
      for (const q5 of ym) {
        const q6 = q5.titanGiftLevel ?? 0;
        if (q3 > q6) {
          q3 = q6;
          const q7 = q0[q6 + 1].cost;
          const q8 = q7.consumable[24];
          if (q2 >= q8 && yQ.gold >= q7.gold) {
            const q9 = {
              heroId: q5.id,
              count: q8 < q1 && yQ.gold >= q7.gold + 7000 ? 2 : 1
            };
            q4 = q9;
          }
          if (q3 <= 0) {
            break;
          }
        }
      }
      return q4;
    }
    end(yr, ym = {}) {
      pC = false;
      b3(yr, 5000);
      this.resolve();
    }
  }
  async function Yc() {
    let yr = ["userGetInfo", "questGetAll"].map(q4 => ({
      name: q4,
      args: {},
      ident: q4
    }));
    let ym = await dd.Send({
      calls: yr
    }).then(q4 => q4.results);
    let yU = ym[0].result.response;
    let yQ = 86400;
    let q0 = yQ * 7;
    let q1 = yU.nextServerDayTs - yQ * 4;
    let q2 = yU.refillable ? yU.refillable.find(q4 => q4.id == 47)?.amount ?? 0 : 0;
    let q3 = 0;
    if (q1 % q0 < yQ) {
      let q4 = ym[1].result.response.filter(q6 => q6.id >= 11007 && q6.id <= 11009);
      let q5 = q4[0]?.progress ?? 5;
      q3 = 5 - q5;
      while (q2 < q3) {
        q3 -= 2;
      }
    }
    if (q2 > 6 && q3 == 0) {
      q3 = 1;
    }
    return q3;
  }
  async function YN() {
    pC = true;
    let yr = await Yc();
    let ym = [];
    let yU = {};
    while (yr-- > 0) {
      const q1 = {
        name: "ascensionChest_open",
        args: {
          paid: false,
          amount: 1
        },
        ident: "ascensionChest_open_" + yr
      };
      ym.push(q1);
    }
    if (ym.length > 0) {
      const q2 = {
        calls: ym
      };
      const q3 = await dd.Send(q2).then(q4 => q4.results.map(q5 => q5.result.response.rewards).flat());
      lU(q3, yU);
    }
    pC = false;
    const yQ = {
      rewards: yU
    };
    return yQ;
  }
  function YC(yr) {
    return function (ym) {
      if (ym) {
        for (let yU of yr) {
          document.getElementById("PopUpCheckbox" + yU).checked = false;
        }
      }
      return ym;
    };
  }
  function YW() {
    return new Promise((yr, ym) => {
      const yU = new YZ(yr, ym);
      yU.start();
    });
  }
  class YZ {
    allRewards = {};
    funcList = [{
      name: "getTower",
      checked: true,
      label: p3(dR.PASS_THE_TOWER),
      title: p3(dR.PASS_THE_TOWER_TITLE)
    }, {
      name: "getOutland3",
      checked: true,
      label: p3(dR.ASSEMBLE_OUTLAND, {
        count: 3
      }),
      title: p3(dR.ASSEMBLE_OUTLAND_3_TITLE),
      action: YC([2, 3])
    }, {
      name: "getOutland12",
      checked: false,
      label: p3(dR.ASSEMBLE_OUTLAND, {
        count: 12
      }) + " (" + Y0 * 540 + " " + p3(dR.EMERALDS) + ")",
      title: p3(dR.ASSEMBLE_OUTLAND_12_TITLE, {
        price: Y0 * 90
      }),
      action: YC([1, 3])
    }, {
      name: "getOutland21",
      checked: false,
      label: p3(dR.ASSEMBLE_OUTLAND, {
        count: 21
      }) + " (" + Y0 * 1740 + " " + p3(dR.EMERALDS) + ")",
      title: p3(dR.ASSEMBLE_OUTLAND_21_TITLE, {
        firstPrice: Y0 * 90,
        secondPrice: Y0 * 200
      }),
      action: YC([1, 2])
    }, {
      name: "checkExpedition",
      checked: true,
      label: p3(dR.CHECK_EXPEDITIONS),
      title: p3(dR.CHECK_EXPEDITIONS_TITLE)
    }, {
      name: "checkRollAscension",
      checked: true,
      label: p3(dR.CHECK_SEER),
      title: p3(dR.CHECK_SEER_TITLE)
    }, {
      name: "autoRaidAdventure",
      checked: false,
      label: p3(dR.AUTO_RAID_ADVENTURE),
      title: p3(dR.All_RAID_ADVENTURE_TITLE)
    }, {
      name: "mailGetAll",
      checked: true,
      label: p3(dR.COLLECT_MAIL),
      title: p3(dR.COLLECT_MAIL_TITLE)
    }, {
      name: "dailyQuests",
      checked: true,
      label: p3(dR.COMPLETE_DAILY_QUESTS),
      title: p3(dR.COMPLETE_DAILY_QUESTS_TITLE)
    }, {
      name: "collectAllStuff",
      checked: true,
      label: p3(dR.COLLECT_DAILY_REWARDS),
      title: p3(dR.COLLECT_DAILY_REWARDS_TITLE)
    }, {
      name: "questAllFarm",
      checked: true,
      label: p3(dR.COLLECT_QUEST_REWARDS),
      title: p3(dR.COLLECT_QUEST_REWARDS_TITLE)
    }, {
      name: "titanArena",
      checked: false,
      label: p3(dR.COMPLETE_TOE),
      title: p3(dR.COMPLETE_TOE_TITLE)
    }, {
      name: "dungeon",
      checked: false,
      label: p3(dR.COMPLETE_DUNGEON),
      title: p3(dR.COMPLETE_DUNGEON_TITLE)
    }, {
      name: "synchronization",
      checked: true,
      label: p3(dR.MAKE_A_SYNC),
      title: p3(dR.MAKE_A_SYNC_TITLE)
    }, {
      name: "reloadGame",
      checked: false,
      label: p3(dR.RELOAD_GAME),
      title: p3(dR.RELOAD_GAME_TITLE)
    }];
    functions = {
      getTower: bj,
      getOutland3: async () => {
        return await Y1(3);
      },
      getOutland12: async () => {
        return await Y1(12);
      },
      getOutland21: async () => {
        return await Y1(21);
      },
      checkExpedition: bZ,
      checkRollAscension: YN,
      autoRaidAdventure: async () => {
        return await bn(true);
      },
      titanArena: bB,
      mailGetAll: bE,
      dailyQuests: async function () {
        const quests = new Yq(() => {}, () => {});
        await quests.autoInit(true);
        return await quests.start();
      },
      collectAllStuff: bO,
      questAllFarm: bu,
      dungeon: async () => {
        return await ya("fast");
      },
      synchronization: async () => {
        dv.refreshGame();
      },
      reloadGame: async () => {
        location.reload();
      }
    };
    constructor(yr, ym, yU) {
      this.resolve = yr;
      this.reject = ym;
      this.questInfo = yU;
    }
    async doYouBestConfirm() {
      const yU = {
        checkBoxes: this.funcList
      };
      return await vI.confirm(p3(dR.RUN_ACTIONS), {}, {
        buttons: [{
          msg: p3(dR.SETTING_QUEST),
          title: p3(dR.SETTING_QUEST_TITLE),
          result: 2
        }, {
          msg: p3(dR.BTN_RUN),
          result: 1
        }, {
          isClose: true,
          result: 0
        }],
        options: {
          inColumn: true
        }
      }, yU);
    }
    async start() {
      const yr = vo("selectedTask", {});
      lY(this.funcList, yr);
      let ym = await this.doYouBestConfirm();
      vI.getCheckBoxes().forEach(yU => {
        yr[yU.name].checked = yU.checked;
      });
      vu("selectedTask", yr);
      if (ym == 2) {
        const yU = new Yq(() => {}, () => {});
        await yU.autoInit();
        await yU.start();
        this.start();
        return;
      } else if (ym == 0) {
        this.end("");
        return;
      }
      for (const yQ in this.functions) {
        if (yr[yQ]?.checked) {
          try {
            const q0 = await this.functions[yQ]();
            if (q0?.rewards) {
              lU([q0.rewards], this.allRewards);
            }
          } catch (q1) {
            if (await vI.confirm(p3(dR.ERRORS_OCCURRES) + ":<br> " + yQ + " <br>" + p3(dR.COPY_ERROR) + "?", {}, {
              buttons: [{
                msg: p3(dR.BTN_NO),
                result: false
              }, {
                msg: p3(dR.BTN_YES),
                result: true
              }]
            })) {
              this.errorHandling(q1);
            }
          }
        }
      }
      setTimeout(q2 => {
        this.end(q2);
      }, 2000, p3(dR.ALL_TASK_COMPLETED));
      return;
    }
    errorHandling(yr) {
      let ym = yr.toString() + "\n";
      try {
        const yU = yr.stack.split("\n");
        const yQ = yU.map(q0 => q0.split("@")[0]).indexOf("doYourBest");
        ym += yU.slice(0, yQ).join("\n");
      } catch (q0) {
        ym += yr.stack;
      }
      dQ(ym);
    }
    end(yr) {
      b3(yr, 5000);
      this.resolve();
    }
  }
  function Yf() {
    return new Promise((yr, ym) => {
      const yU = new Yx(yr, ym);
      yU.start();
    });
  }
  function Yj() {
    return new Promise((yr, ym) => {
      const yU = new Yx(yr, ym);
      yU.start("solo");
    });
  }
  class Yx {
    type = "default";
    actions = {
      default: {
        getInfo: "adventure_getInfo",
        startBattle: "adventure_turnStartBattle",
        endBattle: "adventure_endBattle",
        collectBuff: "adventure_turnCollectBuff"
      },
      solo: {
        getInfo: "adventureSolo_getInfo",
        startBattle: "adventureSolo_turnStartBattle",
        endBattle: "adventureSolo_endBattle",
        collectBuff: "adventureSolo_turnCollectBuff"
      }
    };
    terminateReason = p3(dR.UNKNOWN);
    callAdventureInfo = {
      name: "adventure_getInfo",
      args: {},
      ident: "adventure_getInfo"
    };
    callTeamGetAll = {
      name: "teamGetAll",
      args: {},
      ident: "teamGetAll"
    };
    callTeamGetFavor = {
      name: "teamGetFavor",
      args: {},
      ident: "teamGetFavor"
    };
    callStartBattle = {
      name: "adventure_turnStartBattle",
      args: {},
      ident: "body"
    };
    callEndBattle = {
      name: "adventure_endBattle",
      args: {
        result: {},
        progress: {}
      },
      ident: "body"
    };
    callCollectBuff = {
      name: "adventure_turnCollectBuff",
      args: {},
      ident: "body"
    };
    defaultWays = {
      tempest_3_3: {
        first: "1,2,3,4,5,56,55,53,50,49,48,45,46,43,41,39,38,40,36,35,33,31,29,28,27,25,26,22,21,20,17,18,15,13,10,9,11,7,8",
        second: "1,2,5,4,3,7,9,10,13,11,15,17,20,21,18,22,25,27,28,26,29,31,33,35,36,38,39,41,40,43,45,48,49,46,50,53,55,56,54,52,6,8",
        third: "1,2,5,4,3,7,9,10,13,11,15,17,20,21,18,22,25,27,28,26,29,31,33,35,36,38,39,41,40,43,45,48,49,46,50,53,55,56,54,51,47,44,42,37,32,30,24,23,19,16,14,12,8,6,52,57"
      },
      adv_strongford_2pl_easy: {
        first: "1,2,3,5,6",
        second: "1,2,4,7,6",
        third: "1,2,3,5,6"
      },
      adv_valley_3pl_easy: {
        first: "1,2,5,8,9,11",
        second: "1,3,6,9,11",
        third: "1,4,7,10,9,11"
      },
      adv_ghirwil_3pl_easy: {
        first: "1,5,6,9,11",
        second: "1,4,12,13,11",
        third: "1,2,3,7,10,11"
      },
      adv_angels_3pl_easy_fire: {
        first: "1,2,4,7,18,8,12,19,22,23",
        second: "1,3,6,11,17,10,16,21,22,23",
        third: "1,5,24,25,9,14,15,20,22,23"
      },
      adv_strongford_3pl_normal_2: {
        first: "1,2,7,8,12,16,23,26,25,21,24",
        second: "1,4,6,10,11,15,22,15,19,18,24",
        third: "1,5,9,10,14,17,20,27,25,21,24"
      },
      adv_valley_3pl_normal: {
        first: "1,2,4,7,10,13,16,19,24,22,25",
        second: "1,3,6,9,12,15,18,21,26,23,25",
        third: "1,5,7,8,11,14,17,20,22,25"
      },
      adv_ghirwil_3pl_normal_2: {
        first: "1,11,10,11,12,15,12,11,21,25,27",
        second: "1,7,3,4,3,6,13,19,20,24,27",
        third: "1,8,5,9,16,23,22,26,27"
      },
      adv_angels_3pl_normal: {
        first: "1,3,2,6,7,9,10,13,17,16,20,22,21,28,32",
        second: "1,3,5,7,9,11,14,18,20,22,24,27,30,26,29,25",
        third: "1,3,4,8,7,9,11,15,19,20,22,23,31,32"
      },
      adv_strongford_3pl_hard_2: {
        first: "1,2,5,9,14,20,26,21,30,36,39,42,44,45",
        second: "1,2,6,10,15,7,16,17,23,22,27,32,35,37,40,45",
        third: "1,3,8,12,11,18,19,28,34,33,38,41,43,46,45"
      },
      adv_valley_3pl_hard: {
        first: "1,3,2,6,11,17,25,30,35,34,29,24,21,17,12,7",
        second: "1,4,8,13,18,22,26,31,36,40,45,44,43,38,33,28",
        third: "1,5,9,14,19,23,27,32,37,42,48,51,50,49,46,52"
      },
      adv_ghirwil_3pl_hard: {
        first: "1,2,3,6,8,12,11,15,21,27,36,34,33,35,37",
        second: "1,2,4,6,9,13,18,17,16,22,28,29,30,31,25,19",
        third: "1,2,5,6,10,13,14,20,26,32,38,41,40,39,37"
      },
      adv_angels_3pl_hard: {
        first: "1,2,8,11,7,4,7,16,23,32,33,25,34,29,35,36",
        second: "1,3,9,13,10,6,10,22,31,30,21,30,15,28,20,27",
        third: "1,5,12,14,24,17,24,25,26,18,19,20,27"
      },
      adv_angels_3pl_hell: {
        first: "1,2,4,6,16,23,33,34,25,32,29,28,20,27",
        second: "1,7,11,17,24,14,26,18,19,20,27,20,12,8",
        third: "1,9,3,5,10,22,31,36,31,30,15,28,29,30,21,13"
      },
      adv_strongford_3pl_hell: {
        first: "1,2,5,11,14,20,26,21,30,35,38,41,43,44",
        second: "1,2,6,12,15,7,16,17,23,22,27,42,34,36,39,44",
        third: "1,3,8,9,13,18,19,28,0,33,37,40,32,45,44"
      },
      adv_ghirwil_3pl_hell: {
        first: "1,2,3,6,8,12,11,15,21,27,36,34,33,35,37",
        second: "1,2,4,6,9,13,18,17,16,22,28,29,30,31,25,19",
        third: "1,2,5,6,10,13,14,20,26,32,38,41,40,39,37"
      },
      adv_valley_3pl_hell: {
        first: "1,3,2,6,11,17,25,30,35,34,29,24,21,17,12,7",
        second: "1,4,8,13,18,22,26,31,36,40,45,44,43,38,33,28",
        third: "1,5,9,14,19,23,27,32,37,42,48,51,50,49,46,52"
      }
    };
    constructor(yr, ym) {
      this.resolve = yr;
      this.reject = ym;
    }
    async start(yr) {
      this.type = yr ?? this.type;
      this.callAdventureInfo.name = this.actions[this.type].getInfo;
      const ym = {
        calls: [this.callAdventureInfo, this.callTeamGetAll, this.callTeamGetFavor]
      };
      const yU = await dd.Send(ym);
      return this.checkAdventureInfo(yU.results);
    }
    async getPath() {
      let yr = {};
      yr[0] = vo("adventurePath" + this.mapIdent + 0, "");
      let ym = vo("adventurePath" + this.mapIdent + 1, "");
      yr[1] = ym?.length > 0 ? ym : this.defaultWays[this.mapIdent]?.first;
      ym = vo("adventurePath" + this.mapIdent + 2, "");
      yr[2] = ym?.length > 0 ? ym : this.defaultWays[this.mapIdent]?.second;
      ym = vo("adventurePath" + this.mapIdent + 3, "");
      yr[3] = ym?.length > 0 ? ym : this.defaultWays[this.mapIdent]?.third;
      let yU = vo("adventureInputs", {});
      const yQ = {
        isClose: true,
        result: -111
      };
      const q2 = await vI.confirm(p3(dR.ENTER_THE_PATH), {}, {
        buttons: [{
          msg: "        " + p3(dR.OTHER_WAY) + "!        ",
          placeholder: "1,2,3,4,5,6,7",
          isInput: true,
          default: yr[0]
        }, {
          msg: "            " + p3(dR.WAY_NUMBER) + "1!            ",
          placeholder: "1,2,3",
          isInput: true,
          default: yr[1]
        }, {
          msg: "            " + p3(dR.WAY_NUMBER) + "2!            ",
          placeholder: "1,2,3",
          isInput: true,
          default: yr[2]
        }, {
          msg: "            " + p3(dR.WAY_NUMBER) + "3!            ",
          placeholder: "1,2,3",
          isInput: true,
          default: yr[3]
        }, {
          msg: "      " + p3(dR.SAVE) + "      ",
          multiResult: true,
          result: -222
        }, yQ],
        options: {
          inColumn: true
        }
      }, {
        checkBoxes: []
      }, {
        inputs: [{
          name: "countPrecalc",
          title: p3(dR.COUNT_PRECALC_TITLE),
          placeholder: p3(dR.COUNT_BATTLE),
          default: (yU.countPrecalc ?? 1).toString()
        }, {
          name: "countAuto",
          title: p3(dR.COUNT_ATTACK_TITLE),
          placeholder: p3(dR.COUNT_BATTLE),
          default: (yU.countAuto ?? 0).toString()
        }]
      });
      let q3 = vI.getInputs();
      q3.forEach(q5 => {
        yU[q5.name] = q5.value;
      });
      yU.countPrecalc = p0(yU.countPrecalc, 1, 0, 1000);
      yU.countAuto = p0(yU.countAuto, 0, 0, 1000);
      vu("adventureInputs", yU);
      this.countPrecalc = yU.countPrecalc;
      this.countAuto = yU.countAuto;
      if (q2 == -111) {
        this.terminateReason = p3(dR.BTN_CANCELED);
        return false;
      }
      if (q2?.id == -222) {
        for (let q5 = 0; q5 < 4; q5++) {
          let q6 = q2.results[q5];
          vu("adventurePath" + this.mapIdent + q5, q6 ? q6[0] : "");
        }
        this.terminateReason = p3(dR.ALL_WAY_SAVED);
        return false;
      }
      let q4 = q2.split(",");
      if (q4.length < 2) {
        q4 = q2.split("-");
      }
      if (q4.length < 2) {
        this.terminateReason = p3(dR.MUST_TWO_POINTS);
        return false;
      }
      for (let q7 in q4) {
        q4[q7] = +q4[q7].trim();
        if (Number.isNaN(q4[q7])) {
          this.terminateReason = p3(dR.MUST_ONLY_NUMBERS);
          return false;
        }
      }
      if (this.checkPath(q4)) {
        vu("adventurePath" + this.mapIdent + 0, q2);
        return q4;
      }
      return false;
    }
    checkPath(yr) {
      for (let ym = 0; ym < yr.length - 1; ym++) {
        const yU = yr[ym];
        const yQ = yr[ym + 1];
        const q0 = this.paths.some(q1 => q1.from_id === yU && q1.to_id === yQ || q1.from_id === yQ && q1.to_id === yU);
        if (!q0) {
          const q1 = {
            from: yU,
            to: yQ
          };
          this.terminateReason = p3(dR.INCORRECT_WAY, q1);
          return false;
        }
      }
      return true;
    }
    async checkAdventureInfo(yr) {
      this.advInfo = yr[0].result.response;
      if (!this.advInfo) {
        this.terminateReason = p3(dR.NOT_ON_AN_ADVENTURE);
        return this.end();
      }
      const ym = yr[1].result.response.adventure_hero;
      const yU = yr[2]?.result.response.adventure_hero;
      const yQ = ym.find(q3 => q3 >= 6000 && q3 < 6100);
      const q0 = ym.filter(q3 => q3 != yQ);
      const q1 = this.advInfo.users[dG.id];
      const q2 = {
        pet: yQ,
        heroes: q0,
        favor: yU,
        path: [],
        broadcast: false
      };
      this.args = q2;
      this.turnsLeft = q1.turnsLeft;
      this.currentNode = q1.currentNode;
      this.nodes = this.advInfo.nodes;
      this.paths = this.advInfo.paths;
      this.mapIdent = this.advInfo.mapIdent;
      this.path = await this.getPath();
      if (!this.path) {
        return this.end();
      }
      if (this.currentNode == 1 && this.path[0] != 1) {
        this.path.unshift(1);
      }
      return this.loop();
    }
    async loop() {
      let yr = this.path.indexOf(+this.currentNode);
      let ym = 0;
      let yU = 0;
      let yQ = 0;
      let q0 = this.turnsLeft;
      if (!~yr) {
        this.terminateReason = p3(dR.YOU_IN_NOT_ON_THE_WAY);
        return this.end();
      }
      this.path = this.path.slice(yr);
      if (this.path.length - 1 > this.turnsLeft && (await vI.confirm(p3(dR.ATTEMPTS_NOT_ENOUGH), {}, {
        buttons: [{
          msg: p3(dR.YES_CONTINUE),
          result: false
        }, {
          msg: p3(dR.BTN_NO),
          result: true
        }, {
          isClose: true,
          result: true
        }]
      }))) {
        this.terminateReason = p3(dR.NOT_ENOUGH_AP);
        return this.end();
      }
      for (const q4 of this.path) {
        if (q0 && q4 != this.currentNode) {
          q0--;
          const q5 = this.getNodeInfo(q4);
          if (q5.type == "TYPE_COMBAT" && q5.state != "empty") {
            ym += yU;
            yU = 0;
            yQ++;
          } else if (q5.type == "TYPE_PLAYERBUFF" && this.checkBuff(q5) != null) {
            ym += yU;
            yU = 0;
          } else {
            yU++;
          }
        }
      }
      if (yU >= this.turnsLeft || yQ == 0) {
        this.terminateReason = p3(dR.WAY_COMPLETED);
        return this.end();
      }
      if (ym > 2 && (await vI.confirm(p3(dR.MANY_EMPTY_WAY, {
        countEmpty: ym
      }), {}, {
        buttons: [{
          msg: p3(dR.YES_CONTINUE),
          result: false
        }, {
          msg: p3(dR.BTN_NO),
          result: true
        }, {
          isClose: true,
          result: true
        }]
      }))) {
        this.terminateReason = p3(dR.BTN_CANCELED);
        return this.end();
      }
      const q3 = [];
      for (const q6 of this.path) {
        if (!this.turnsLeft) {
          this.terminateReason = p3(dR.ATTEMPTS_ARE_OVER);
          return this.end();
        }
        q3.push(q6);
        console.log(q3);
        if (q3.length > 1) {
          b3(q3.join(" > ") + (" " + p3(dR.MOVES) + ": ") + this.turnsLeft);
        }
        if (q6 == this.currentNode) {
          continue;
        }
        const q7 = this.getNodeInfo(q6);
        if (q7.type == "TYPE_COMBAT") {
          if (q7.state == "empty") {
            this.turnsLeft--;
            continue;
          }
          pX = false;
          if (await this.battle(q3)) {
            this.turnsLeft--;
            q3.splice(0, q3.indexOf(q6));
            q7.state = "empty";
            pX = true;
            continue;
          }
          pX = true;
          return this.end();
        }
        if (q7.type == "TYPE_PLAYERBUFF") {
          const q8 = this.checkBuff(q7);
          q7.buffs[q8].owner = dG.id;
          if (q8 == null) {
            this.turnsLeft--;
            continue;
          }
          if (await this.collectBuff(q8, q3)) {
            this.turnsLeft--;
            q3.splice(0, q3.indexOf(q6));
            continue;
          }
          this.terminateReason = p3(dR.BUFF_GET_ERROR);
          return this.end();
        }
      }
      this.terminateReason = p3(dR.SUCCESS) + "!";
      return this.end();
    }
    async battle(yr, ym = true) {
      const yU = await this.startBattle(yr);
      try {
        const yQ = yU.results[0].result.response.battle;
        const q0 = await lK(yQ);
        this.coeff = vb(q0).hp;
        ;
        if (q0.result.win) {
          const q1 = await this.endBattle(q0);
          if (q1.results[0].result.response?.error) {
            this.terminateReason = p3(dR.BATTLE_END_ERROR);
            return false;
          }
        } else {
          await this.cancelBattle(q0);
          if (ym && (await this.preCalcBattle(yQ))) {
            z2 = true;
            let q2 = 100;
            let q3;
            yr = yr.slice(-2);
            for (let q4 = 1; q4 <= this.countAuto; q4++) {
              if (this.coeff < q2) {
                q2 = this.coeff.ceil(2);
              }
              const q5 = {
                countBattle: q4 + "/" + this.countAuto,
                bestCoeff: q2
              };
              q3 = p3(dR.BTN_AUTO) + " " + p3(dR.IN_ADVENTURE) + "\n" + p3(dR.BATTLE_PROGRESS, q5) + "\n";
              b5(q3 + p3(dR.CLICK_TO_STOP), 0, function () {
                z2 = false;
              });
              if (z2) {
                const q6 = await this.battle(yr, false);
                if (q6) {
                  z2 = false;
                  const q7 = {
                    countBattle: q4
                  };
                  b5(p3(dR.WIN_ATTEMPT, q7), 5000);
                  return true;
                }
              } else {
                break;
              }
            }
            b5(q3 + p3(dR.STOPPED), 8000);
            this.terminateReason = p3(dR.FAILED_TO_WIN);
            return false;
          }
          return false;
        }
      } catch (q8) {
        console.error(q8);
        if (await vI.confirm(p3(dR.ERROR_OF_THE_BATTLE_COPY), {}, {
          buttons: [{
            msg: p3(dR.BTN_NO),
            result: false
          }, {
            msg: p3(dR.BTN_YES),
            result: true
          }]
        })) {
          this.errorHandling(q8, yU);
        }
        this.terminateReason = p3(dR.ERROR_DURING_THE_BATTLE);
        return false;
      }
      return true;
    }
    async preCalcBattle(yr) {
      if (this.countAuto == 0) {
        this.terminateReason = p3(dR.NO_CHANCE_WIN) + this.countPrecalc;
        return false;
      }
      if (this.countPrecalc == 0) {
        return true;
      }
      for (let ym = 0; ym < this.countPrecalc; ym++) {
        yr.seed = (Date.now() / 1000).floor(0) + p1(0, 1000000000);
        const yU = await lK(yr);
        if (yU.result.win) {
          console.log(ym, this.countPrecalc);
          return true;
        }
      }
      this.terminateReason = p3(dR.NO_CHANCE_WIN) + this.countPrecalc;
      return false;
    }
    startBattle(yr) {
      this.args.path = yr;
      this.callStartBattle.name = this.actions[this.type].startBattle;
      this.callStartBattle.args = this.args;
      const ym = [this.callStartBattle];
      const yU = {
        calls: ym
      };
      return dd.Send(yU);
    }
    cancelBattle(yr) {
      la(yr);
      return this.endBattle(yr);
    }
    endBattle(yr) {
      this.callEndBattle.name = this.actions[this.type].endBattle;
      this.callEndBattle.args.result = yr.result;
      this.callEndBattle.args.progress = yr.progress;
      const ym = [this.callEndBattle];
      const yU = {
        calls: ym
      };
      return dd.Send(yU);
    }
    checkBuff(yr) {
      let ym = null;
      let yU = 0;
      for (const yQ in yr.buffs) {
        const q0 = yr.buffs[yQ];
        if (q0.owner == dG.id) {
          return null;
        }
        if (q0.owner == null && q0.value > yU) {
          ym = yQ;
          yU = q0.value;
        }
      }
      return ym;
    }
    async collectBuff(yr, ym) {
      this.callCollectBuff.name = this.actions[this.type].collectBuff;
      const yU = {
        buff: yr,
        path: ym
      };
      this.callCollectBuff.args = yU;
      const yQ = [this.callCollectBuff];
      const q0 = {
        calls: yQ
      };
      return dd.Send(q0);
    }
    getNodeInfo(yr) {
      return this.nodes.find(ym => ym.id == yr);
    }
    errorHandling(yr, ym) {
      let yU = yr.toString() + "\n";
      try {
        const yQ = yr.stack.split("\n");
        const q0 = yQ.map(q1 => q1.split("@")[0]).indexOf("adventure");
        yU += yQ.slice(0, q0).join("\n");
      } catch (q1) {
        yU += yr.stack;
      }
      if (ym) {
        yU += "\nData: " + JSON.stringify(ym);
      }
      dQ(yU);
    }
    end() {
      pX = true;
      b3(this.terminateReason, 5000);
      console.log(this.terminateReason);
      this.resolve();
    }
  }
  async function Yr() {
    const ym = +(await vI.confirm(p3(dR.SET_NUMBER_LEVELS), {}, {
      buttons: [{
        msg: p3(dR.BTN_RUN),
        isInput: true,
        default: 10
      }, {
        result: false,
        isClose: true
      }]
    }));
    if (!ym) {
      return;
    }
    const yU = new Yq();
    await yU.autoInit();
    const yQ = Object.values(yU.questInfo.heroGetAll);
    const q0 = yU.questInfo.inventoryGet;
    const q1 = [];
    for (let q3 = ym; q3 > 0; q3--) {
      const q4 = yU.getUpgradeArtifact();
      if (!q4.heroId) {
        const q8 = {
          count: q1.length
        };
        if (await vI.confirm(p3(dR.POSSIBLE_IMPROVE_LEVELS, q8), {}, {
          buttons: [{
            msg: p3(dR.BTN_YES),
            result: true
          }, {
            result: false,
            isClose: true
          }]
        })) {
          break;
        } else {
          return;
        }
      }
      const q5 = yQ.find(qd => qd.id == q4.heroId);
      q5.artifacts[q4.slotId].level++;
      q0[q4.costCurrency][q4.costId] -= q4.costValue;
      const q6 = {
        heroId: q4.heroId,
        slotId: q4.slotId
      };
      const q7 = {
        name: "heroArtifactLevelUp",
        args: q6,
        ident: "heroArtifactLevelUp_" + q3
      };
      q1.push(q7);
    }
    if (!q1.length) {
      console.log(p3(dR.NOT_ENOUGH_RESOURECES));
      b3(p3(dR.NOT_ENOUGH_RESOURECES), false);
      return;
    }
    const q2 = {
      calls: q1
    };
    await dd.Send(q2).then(qd => {
      if ("error" in qd) {
        console.log(p3(dR.NOT_ENOUGH_RESOURECES));
        b3(p3(dR.NOT_ENOUGH_RESOURECES), false);
      } else {
        const qp = {
          count: qd.results.length
        };
        console.log(p3(dR.IMPROVED_LEVELS, qp));
        const qz = {
          count: qd.results.length
        };
        b3(p3(dR.IMPROVED_LEVELS, qz), false);
      }
    });
  }
  async function Ym() {
    const ym = +(await vI.confirm(p3(dR.SET_NUMBER_LEVELS), {}, {
      buttons: [{
        msg: p3(dR.BTN_RUN),
        isInput: true,
        default: 10
      }, {
        result: false,
        isClose: true
      }]
    }));
    if (!ym) {
      return;
    }
    const yU = new Yq();
    await yU.autoInit();
    const yQ = Object.values(yU.questInfo.heroGetAll);
    const q0 = yU.questInfo.inventoryGet;
    const q1 = [];
    for (let q3 = ym; q3 > 0; q3--) {
      const q4 = yU.getUpgradeSkin();
      if (!q4.heroId) {
        const q8 = {
          count: q1.length
        };
        if (await vI.confirm(p3(dR.POSSIBLE_IMPROVE_LEVELS, q8), {}, {
          buttons: [{
            msg: p3(dR.BTN_YES),
            result: true
          }, {
            result: false,
            isClose: true
          }]
        })) {
          break;
        } else {
          return;
        }
      }
      const q5 = yQ.find(qd => qd.id == q4.heroId);
      q5.skins[q4.skinId]++;
      q0[q4.costCurrency][q4.costCurrencyId] -= q4.cost;
      const q6 = {
        heroId: q4.heroId,
        skinId: q4.skinId
      };
      const q7 = {
        name: "heroSkinUpgrade",
        args: q6,
        ident: "heroSkinUpgrade_" + q3
      };
      q1.push(q7);
    }
    if (!q1.length) {
      console.log(p3(dR.NOT_ENOUGH_RESOURECES));
      b3(p3(dR.NOT_ENOUGH_RESOURECES), false);
      return;
    }
    const q2 = {
      calls: q1
    };
    await dd.Send(q2).then(qd => {
      if ("error" in qd) {
        console.log(p3(dR.NOT_ENOUGH_RESOURECES));
        b3(p3(dR.NOT_ENOUGH_RESOURECES), false);
      } else {
        const qp = {
          count: qd.results.length
        };
        console.log(p3(dR.IMPROVED_LEVELS, qp));
        const qz = {
          count: qd.results.length
        };
        b3(p3(dR.IMPROVED_LEVELS, qz), false);
      }
    });
  }
  function YU(yr, ym, yU) {
    let yQ = dv.lib.pet;
    let q0 = dv.lib.hero;
    for (let q4 in yQ) {
      yQ[q4].favorSkill = q0[q4].skill[4];
    }
    let q1 = [];
    let q2 = Object.keys(ym).map(q5 => +q5);
    let q3 = yr.filter(q5 => !q2.includes(q5));
    for (let q5 of q3) {
      let q6 = z3.hero[q5];
      if (!q6) {
        return null;
      }
      q1.push(q6);
    }
    for (let q7 in ym) {
      let q8 = ym[q7];
      let q9 = z3.pet[q8];
      let qd = z3.hero[q7];
      if (!qd || !q9) {
        return null;
      }
      let qp = structuredClone(qd);
      let qz = yQ[q8];
      let ql = q9.intelligence;
      for (let qv of qz.favorStats) {
        let qb = qp[qv.stat] ?? 0;
        qp[qv.stat] = qb + qv.multiplier * ql;
      }
      qp.skills[qz.favorSkill] = q9.level;
      qp.favorPetId = q8;
      qp.petId = q8;
      qp.favorPower = ql;
      q1.push(qp);
    }
    if (yU) {
      let qY = z3.pet[yU];
      if (!qY) {
        return null;
      }
      q1.push(qY);
    }
    return q1;
  }
  function YQ(yr, ym) {
    if (yr.length == 0) {
      return [{}];
    }
    let yU = yr.slice();
    let yQ = yU.pop();
    let q0 = [];
    for (let q1 of dv.lib.hero[yQ].availableFavor) {
      if (q1 == 0 || ym.includes(q1)) {
        let q2 = YQ(yU, ym.filter(q3 => q3 != q1));
        for (let q3 of q2) {
          if (q1 > 0) {
            q3[yQ] = q1;
          }
          q0.push(q3);
        }
      }
    }
    return q0;
  }
  function y0(yr, ym) {
    let yU = [];
    let yQ = Array(ym).fill(0);
    for (let q0 = 0; q0 >= 0; yQ[q0]++) {
      if (yQ[q0] < yr.length) {
        if (q0 < ym - 1) {
          q0++;
          yQ[q0] = yQ[q0 - 1];
        } else {
          let q1 = [];
          for (let q2 of yQ) {
            q1.push(yr[q2]);
          }
          yU.push(q1);
        }
      } else {
        q0--;
      }
    }
    return yU;
  }
  function y1(yr) {
    return Math.pow(yr, 0.3) * 255;
  }
  function y2(yr, ym) {
    if (ym == 0) {
      return 0;
    } else {
      return Math.min(yr / ym, 1);
    }
  }
  function y3(yr, ym) {
    let yU = y2(yr, ym);
    let yQ = y1(1 - yU).round(0);
    let q0 = y1(yU).round(0);
    return "rgb(" + yQ + "," + q0 + ",0)";
  }
  function y4(yr, ym) {
    let yU = y2(yr, ym);
    let yQ = y1(yU).round(0);
    let q0 = y1(1 - yU).round(0);
    return "rgb(" + yQ + "," + q0 + ",0)";
  }
  function y5(yr) {
    let ym = "";
    for (let yU of yr) {
      ym += dv.translate("LIB_HERO_NAME_" + yU.value[0]) + (yU.value[1] == 0 ? "" : " (" + dv.translate("LIB_HERO_NAME_" + yU.value[1]) + ")") + ", ";
    }
    return ym;
  }
  function y6(yr) {
    let ym = "";
    for (let yU of yr) {
      ym += dv.translate("LIB_HERO_NAME_" + yU.hero) + ", ";
    }
    return ym;
  }
  function y7(yr) {
    if (yr >= 10000) {
      return ((yr / 1000).floor(0) + "K").fixed(6);
    } else if (yr >= 1000) {
      return ((yr / 1000).floor(0) + "," + ("00" + yr % 1000).slice(-3)).fixed(6) + " ";
    } else {
      return (yr + "").fixed(6);
    }
  }
  function y8(yr) {
    if (yr > 0) {
      return Math.max(0, 1 - Math.log10(yr).floor(0));
    } else {
      return 0;
    }
  }
  function y9(yr, ym = 1) {
    let yU = y8(yr);
    return (yr.toFixed(yU) + (yU ? "" : " ")).fixed(4 + ym);
  }
  function yd(yr, ym = 1) {
    let yU = y8(yr);
    return (yr.toFixed(yU) + (yU ? "%" : "% ")).fixed(4 + ym);
  }
  function yp(yr, ym, yU, yQ, q0 = 50, q1 = 300, q2 = 100, q3 = 10000) {
    return "\n<span style=\"color:" + y4(ym, q1) + ";\">" + ym.toString().fixed(3) + "</span>   <span style=\"color:" + y3(yr, q0) + ";\">" + yd(yr, 5) + "</span>   <span style=\"color:" + y4(yU, q2) + ";\">" + yd(yU, 2) + "</span>   <span style=\"color:" + y3(yQ, q3) + ";\">" + y7(yQ) + "</span>     ";
  }
  function yz(yr, ym, yU, yQ = 300, q0 = 55385, q1 = 100) {
    return " <span style=\"color:" + y4(yr, yQ) + ";\">" + yr.toString().fixed(3) + ("</span>      <span style=\"color:" + y4(ym, q0) + ";\">" + y7(ym)) + ("</span><span style=\"color:" + y3(yU, q1) + ";\">" + yU.toFixed(2) + "%</span>");
  }
  const yl = ["<span style=\"color:white;\">Database from</span>", "<span style=\"color:Gold;\">HW Goodwin script     </span>", "<span style=\"color:white;\">Join: </span><span style=\"color:Aqua;\">t.me/HW_Goodwin</span>"];
  const yv = "\n\nBF     WR               HP          CB";
  const yb = "\n\nBUFF   TEAM     PP%";
  const yY = "\n\n" + p3(dR.INVASION_LEGEND_BF) + "                                                " + yl[0] + ("\n" + p3(dR.INVASION_LEGEND_WR) + "            ") + yl[1] + ("\n" + p3(dR.INVASION_LEGEND_HP) + "                                                                                          ") + yl[2] + ("\n" + p3(dR.INVASION_LEGEND_CB));
  const yy = "\n\n" + p3(dR.KAWABANGA_LEGEND_BUFF) + "\n" + p3(dR.KAWABANGA_LEGEND_TEAM) + "\n" + p3(dR.KAWABANGA_LEGEND_PP);
  function yq(yr) {
    let ym = yr.split("_");
    for (let yU in ym) {
      let yQ = ym[yU].split(".");
      let q0 = dv.lib.hero[yQ[0]].battleOrder;
      const q1 = {
        order: q0,
        value: yQ
      };
      ym[yU] = q1;
    }
    ym.sort((q2, q3) => q3.order - q2.order);
    return ym;
  }
  function yc(yr) {
    let ym = yr.split("_");
    for (let yU in ym) {
      let yQ = ym[yU];
      let q0 = dv.lib.hero[yQ].battleOrder;
      const q1 = {
        order: q0,
        hero: yQ
      };
      ym[yU] = q1;
    }
    ym.sort((q2, q3) => q3.order - q2.order);
    return ym;
  }
  function yN(yr) {
    let ym = yr.match(/..?/g);
    for (let yU in ym) {
      let yQ = +ym[yU];
      let q0 = yQ > 80 ? 6099 - yQ : yQ;
      let q1 = dv.lib.hero[q0].battleOrder;
      const q2 = {
        order: q1,
        hero: q0
      };
      ym[yU] = q2;
    }
    ym.sort((q3, q4) => q4.order - q3.order);
    return ym;
  }
  function yC(yr, ym) {
    let yU = [];
    let yQ = yr.match(/..?/g);
    let q0 = ym.match(/..?/g);
    for (let q1 in yQ) {
      let q2 = +yQ[q1];
      let q3 = +q0[q1];
      yU.push(q2 > 80 ? 6099 - q2 + ".0" : q2 + (q3 > 0 ? "." + (5999 + q3) : ".0"));
    }
    return yU.join("_");
  }
  function yW(yr, ym) {
    let yU = [];
    let yQ = yr.split("_");
    let q0 = ym.split("_");
    for (let q1 in yQ) {
      yU.push(yQ[q1] + "." + q0[q1]);
    }
    return yU.join("_");
  }
  function yh(yr) {
    let ym = [];
    let yU = [];
    let yQ = [];
    for (let q0 in yr) {
      let q1 = yr[q0];
      let q2 = q1.petId ?? 0;
      yU.push(q1.id);
      yQ.push(q2);
      ym.push(q1.id + "." + q2);
    }
    return {
      full: ym.join("_"),
      hero: yU.join("_"),
      pet: yQ.join("_")
    };
  }
  function yn(yr) {
    let ym = [];
    let yU = "";
    let yQ = "";
    for (let q0 in yr) {
      let q1 = yr[q0];
      let q2 = q1.type == "pet";
      let q3 = q1.id;
      let q4 = q1.petId ?? 0;
      yU += ("0" + (q2 ? 6099 - q3 : q3)).slice(-2);
      yQ += q2 ? "" : ("0" + Math.max(0, q4 - 5999)).slice(-2);
      ym.push(q3 + "." + q4);
    }
    return {
      full: ym.join("_"),
      hero: yU,
      pet: yQ
    };
  }
  async function yg(yr, ym) {
    let yU = yr.id + "_" + yr.level;
    let yQ = zz + yU;
    let q0 = vE(yQ);
    if (!q0) {
      q0 = await lj(yQ);
      if (!q0 && ym) {
        q0 = yr.battle;
        q0 = {
          defenders: q0.defenders,
          type: q0.type
        };
        lS(yU, q0);
      }
      if (q0) {
        await va(yQ, q0);
      }
    }
    return q0;
  }
  async function yZ(yr) {
    pF = true;
    let ym = ["invasion_getInfo"].map(q3 => ({
      name: q3,
      args: {},
      ident: q3
    }));
    const yU = {
      chapterId: yr.chapterId,
      id: yr.id,
      pet: yr.pet,
      heroes: yr.heroes,
      favor: yr.favor
    };
    const yQ = {
      name: "invasion_bossStart",
      args: yU,
      ident: "invasion_bossStart"
    };
    ym.push(yQ);
    const q0 = {
      calls: ym
    };
    let q1 = await dd.Send(q0).then(q3 => q3.results.map(q4 => q4.result.response));
    let q2 = q1[0];
    pF = false;
    yr.await = Date.now() + 2000;
    yr.battle = q1[1];
    yr.seed = yr.battle.seed;
    yr.mainId = 0;
    for (let q3 of q2.actions) {
      if (q3.type == "boss") {
        let q4 = q3.payload.id;
        if (q4 == yr.id) {
          yr.realLevel = q3.payload.level;
        }
        if (q4 > yr.mainId) {
          yr.mainId = q4;
        }
      }
    }
    yr.buff = yr.mainId == yr.id ? q2.buffAmount : 0;
    return yr;
  }
  async function yf(yr) {
    await lG();
    lF(yr);
    let ym = Object.entries(z8[zw][yr]).filter(q1 => !q1[1].possible && q1[1].team > 0).sort((q1, q2) => q2[1].percent - q1[1].percent);
    let yU = 300;
    let yQ = [];
    let q0 = [];
    for (let q1 in z8[zw][yr]) {
      if (z8[zw][yr][q1].possible && +q1 < yU) {
        yU = +q1;
      }
    }
    for (let q2 of ym) {
      if (+q2[0] < yU) {
        yQ.push(q2);
      } else {
        q0.push(q2);
      }
    }
    for (let q3 of yQ) {
      q0.push(q3);
    }
    if (q0.length > 0) {
      return +q0.pop()[0];
    } else {
      return 0;
    }
  }
  async function yj(yr, ym) {
    const yU = {
      isClose: true,
      result: -1
    };
    let yQ = await vI.confirm(p3(dR.SELECT_BUFF) + "\n" + ym + ":", {}, {
      buttons: [yU, {
        msg: p3(dR.AUTO_SELECT),
        title: p3(dR.AUTO_SELECT_TITLE),
        result: 1000
      }].concat(Object.entries(yr.emptyBuffs).map(q2 => ({
        msg: q2[0],
        result: +q2[0]
      })))
    });
    let q0;
    let q1 = {
      id: yr.id,
      lvl: yr.level,
      seed: yr.seed
    };
    if (yQ == 1000) {
      q1.search = true;
      yQ = await yf(yr.level);
    }
    if (yQ >= 0) {
      q1.buff = yQ;
      q1.new = z8[zw][yr.level][yQ].percent == 0;
      q0 = await ls(true, q1);
      if (!q0) {
        b5(p3(dR.NOTHING_TEST));
        if (!z8[zw][yr.level]) {
          z8[zw][yr.level] = {};
        }
        z8[zw][yr.level][yQ] = {
          possible: 0,
          percent: 100,
          team: 0
        };
        delete yr.emptyBuffs[yQ];
        return await yj(yr, ym);
      }
      yr.buff = yQ;
    }
    return q0;
  }
  async function yV(yr, ym, yU) {
      console.log(JSON.stringify(await lk(217, 8008, 130, 0)));
      console.log(JSON.stringify(await lk(217, 8008, 140, 0)));
      console.log(JSON.stringify(await lk(217, 8008, 150, 0)));
      console.log(JSON.stringify(await lk(217, 8008, 160, 0)));
      console.log(JSON.stringify(await lk(217, 8008, 170, 0)));
      console.log(JSON.stringify(await lk(217, 8008, 180, 20)));
      console.log(JSON.stringify(await lk(217, 8008, 190, 0)));
      console.log(JSON.stringify(await lk(217, 8008, 200, 0)));
      console.log(JSON.stringify(await lk(217, 8008, 210, 15)));
      console.log(JSON.stringify(await lk(217, 8008, 220, 5)));
      console.log(JSON.stringify(await lk(217, 8008, 230, 35)));
      console.log(JSON.stringify(await lk(217, 8008, 240, 0)));
      console.log(JSON.stringify(await lk(217, 8008, 250, 15)));
      console.log(JSON.stringify(await lk(217, 8008, 260, 15)));
      console.log(JSON.stringify(await lk(217, 8008, 270, 35)));
      console.log(JSON.stringify(await lk(217, 8008, 280, 80)));
      console.log(JSON.stringify(await lk(217, 8008, 290, 95)));
      console.log(JSON.stringify(await lk(217, 8008, 300, 25)));
      console.log(JSON.stringify(await lk(217, 8008, 310, 45)));
      console.log(JSON.stringify(await lk(217, 8008, 320, 70)));
      console.log(JSON.stringify(await lk(217, 8008, 330, 70)));
      console.log(JSON.stringify(await lk(217, 8008, 340, 55)));
      console.log(JSON.stringify(await lk(217, 8008, 350, 100)));
      console.log(JSON.stringify(await lk(217, 8008, 360, 85)));
      console.log(JSON.stringify(await lk(217, 8008, 370, 90)));
      console.log(JSON.stringify(await lk(217, 8008, 380, 165)));
      console.log(JSON.stringify(await lk(217, 8008, 390, 235)));
      console.log(JSON.stringify(await lk(217, 8008, 400, 125)));
    let yQ = Object.entries(z8[zw][ym.level]).map(q3 => "<span style=\"color:" + (q3[1].team > 0 ? "orange" : q3[1].possible == 1 ? "lime" : "red") + ";\">" + q3[0] + "</span>");
    let q0 = "\"" + dv.lib.invasion.boss.list[ym.id].label + " <span style=\"color:red;\">" + ym.level + "</span> " + p3(dR.LEVELS) + "\"";
    if (!yU) {
      yU = p3(dR.VS_BOSS) + " " + q0 + "\n\n" + (yQ.length > 0 ? p3(dR.KNOWN_FAST_KILL) + "\n" + yQ.join(", ") : p3(dR.NOW_MOMENT) + " " + p3(dR.UKNOWN_ANY_KILL));
    }
    const q1 = {
      buttons: yr
    };
    let q2 = await vI.confirm(yU, {}, q1);
    if (q2 == 0) {
      return;
    }
    if (q2 == -2) {
      return yB(ym, ym.level - 10);
    }
    if (q2 == -3) {
      return yB(ym, ym.level + 10);
    }
    switch (q2) {
      case 1:
        {
          let q3 = {};
              if (ym.level == 130) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"chapterId":8,"heroes":[58,48,16,65,59],"pet":6004,"favor":{"16":6004,"48":6001,"58":6002,"59":6005,"65":6000},"lvl":130,"buff":0,"seed":8008,"input":[]}};
              if (ym.level == 140) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"chapterId":8,"id":217,"pet":6006,"heroes":[1,4,13,58,65],"favor":{"1":6001,"4":6006,"13":6002,"58":6005,"65":6000},"lvl":140,"buff":0,"input":[]}};
              if (ym.level == 150) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"chapterId":8,"id":217,"pet":6006,"heroes":[1,12,17,21,65],"favor":{"1":6001,"12":6003,"17":6006,"21":6002,"65":6000},"lvl":150,"buff":0,"input":[]}};
              if (ym.level == 160) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"chapterId":8,"id":217,"pet":6008,"heroes":[12,21,34,58,65],"favor":{"12":6003,"21":6006,"34":6008,"58":6002,"65":6001},"lvl":160,"buff":0,"input":[]}};
              if (ym.level == 170) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"chapterId":8,"heroes":[33,12,65,21,4],"pet":6005,"favor":{"4":6001,"12":6003,"21":6006,"33":6008,"65":6000},"lvl":170,"buff":0,"input":[]}};
              if (ym.level == 180) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[58,13,5,17,65],"favor":{"5":6006,"13":6003,"58":6005},"pet":6009,"lvl":180,"buff":20,"seed":8008,"input":[]}};
              if (ym.level == 190) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"chapterId":8,"id":217,"pet":6006,"heroes":[1,12,21,36,65],"favor":{"1":6004,"12":6003,"21":6006,"36":6005,"65":6000},"lvl":190,"buff":0,"input":[]}};
              if (ym.level == 200) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,1,13,2,65],"favor":{"2":6001,"12":6003,"13":6006,"65":6000},"pet":6006,"lvl":200,"buff":0,"seed":8008,"input":[]}};
              if (ym.level == 210) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"chapterId":8,"id":217,"pet":6005,"heroes":[12,21,33,58,65],"favor":{"12":6003,"21":6006,"33":6008,"58":6005,"65":6001},"lvl":210,"buff":15,"input":[]}};
              if (ym.level == 220) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[58,13,7,34,65],"favor":{"7":6002,"13":6008,"34":6006,"58":6005,"65":6001},"pet":6006,"lvl":220,"buff":5,"seed":8008,"input":[]}};
              if (ym.level == 230) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"chapterId":8,"id":217,"pet":6005,"heroes":[5,7,13,58,65],"favor":{"5":6006,"7":6003,"13":6002,"58":6005,"65":6000},"lvl":230,"buff":35,"input":[]}};
              if (ym.level == 240) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,58,1,36,65],"favor":{"1":6006,"12":6003,"36":6005,"65":6001},"pet":6005,"lvl":240,"buff":0,"seed":8008,"input":[]}}
              if (ym.level == 250) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,36,4,16,65],"favor":{"12":6003,"16":6004,"36":6005,"65":6001},"pet":6005,"lvl":250,"buff":15,"seed":8008,"input":[]}}
              if (ym.level == 260) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"chapterId":8,"heroes":[48,12,36,65,4],"pet":6005,"favor":{"4":6006,"12":6003,"36":6005,"48":6000,"65":6007},"lvl":260,"buff":15,"seed":8008,"input":[]}}
              if (ym.level == 270) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,58,36,4,65],"favor":{"4":6006,"12":6003,"36":6005},"pet":6005,"lvl":270,"buff":35,"seed":8008,"input":[]}}
              if (ym.level == 280) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[21,36,48,7,65],"favor":{"7":6003,"21":6006,"36":6005,"48":6001,"65":6000},"pet":6005,"lvl":280,"buff":80,"seed":8008,"input":[]}}
              if (ym.level == 290) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,21,36,35,65],"favor":{"12":6003,"21":6006,"36":6005,"65":6007},"pet":6008,"lvl":290,"buff":95,"seed":8008,"input":[]}}
              if (ym.level == 300) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,13,4,34,65],"favor":{"4":6006,"12":6003,"13":6007,"34":6002},"pet":6005,"lvl":300,"buff":25,"seed":8008,"input":[]}}
              if (ym.level == 310) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,21,58,33,65],"favor":{"12":6003,"21":6006,"33":6002,"58":6005,"65":6007},"pet":6005,"lvl":310,"buff":45,"seed":8008,"input":[]}}
              if (ym.level == 320) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,48,2,6,65],"favor":{"6":6005,"12":6003},"pet":6005,"lvl":320,"buff":70,"seed":8008,"input":[]}}
              if (ym.level == 330) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,21,36,5,65],"favor":{"5":6002,"12":6003,"21":6006,"36":6005,"65":6000},"pet":6005,"lvl":330,"buff":70,"seed":8008,"input":[]}}
              if (ym.level == 340) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,36,13,6,65],"favor":{"6":6005,"12":6003,"13":6002,"36":6006,"65":6000},"pet":6009,"lvl":340,"buff":55,"seed":8008,"input":[]}}
              if (ym.level == 350) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,21,58,34,65],"favor":{"12":6003,"21":6006,"58":6005},"pet":6005,"lvl":350,"buff":100,"seed":8008,"input":[]}}
              if (ym.level == 360) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,21,36,4,65],"favor":{"4":6006,"12":6003,"21":6002,"36":6005},"pet":6007,"lvl":360,"buff":85,"seed":8008,"input":[]}}
              if (ym.level == 370) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,21,36,13,65],"favor":{"12":6003,"13":6007,"21":6006,"36":6005,"65":6001},"pet":6008,"lvl":370,"buff":90,"seed":8008,"input":[]}}
              if (ym.level == 380) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,33,36,4,65],"favor":{"4":6001,"12":6003,"33":6006},"pet":6005,"lvl":380,"buff":165,"seed":8008,"input":[]}}
              if (ym.level == 390) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[21,58,48,2,65],"favor":{"2":6005,"21":6002},"pet":6005,"lvl":390,"buff":235,"seed":8008,"input":[]}}
              if (ym.level == 400) q3 = {"access":true,"count":2263,"kawabanga":0,"kill":{"id":217,"heroes":[12,21,36,48,65],"favor":{"12":6003,"21":6006,"36":6005,"48":6001,"65":6007},"pet":6006,"lvl":400,"buff":125,"seed":8008,"input":[]}}
          if (q3?.access && q3?.kill) {
            ym.pet = q3.kill.pet;
            ym.heroes = q3.kill.heroes;
            ym.favor = q3.kill.favor;
            new yM(ym).startFastKill(q3.kill.input);
            break;
          } else {
            b3("" + (z8[zw][ym.level]?.[ym.buff]?.possible ? "" : p3(dR.NOT_INFO_BEST) + "\n\n") + p3(dR.KAWABANGA_BATTLE, {
              count: dr(q3.count)
            }) + "\n" + (q3?.access ? p3(dR.THANKS_FOR_YOU) : p3(dR.FOR_USE_KAWABANGA, {
              kawabanga: dr(q3.kawabanga)
            })));
            yV(yr, ym);
          }
          break;
        }
      case 2:
        {
          b5("");
          let q4 = await yj(ym, q0);
          if (q4) {
            new yM(ym).startFind(q4);
          } else {
            yV(yr, ym);
          }
          break;
        }
      case 3:
        {
          b3(Object.keys(ym.emptyBuffs).length == 0 ? "" + p3(dR.BEST_TEAM_FOUND) : p3(dR.KAWABANGA_BOSS_PROGRESS) + " " + q0 + yb + "\n" + Object.entries(ym.emptyBuffs).map(q5 => yz(+q5[0], q5[1].team, q5[1].percent)).join("\n") + yy);
          yV(yr, ym);
          break;
        }
    }
  }
  async function yB(yr, ym) {
    b3("");
    b5("");
    yr.level = ym ? ym : yr.realLevel;
    let yQ = yr.realLevel == yr.level;
    let q0 = [{
      result: 0,
      isClose: true
    }];
    yr.battle = await yg(yr, yQ);
    if (yr.level > 130) {
      q0.push({
        msg: p3(dR.PREV_LEVEL),
        title: p3(dR.PREV_LEVEL_TITLE),
        result: -2
      });
    }
    if (yr.battle && yr.level < 400) {
      q0.push({
        msg: p3(dR.NEXT_LEVEL),
        title: p3(dR.NEXT_LEVEL_TITLE),
        result: -3
      });
    }
    if (!yr.battle) {
      yV(q0, yr, p3(dR.NO_DATA_BOSS));
      return;
    }
    yr.emptyBuffs = {};
    await lG();
    lF(yr.level);
    for (let q1 = 0; q1 <= 300; q1 += 5) {
      let q2 = z8[zw][yr.level][q1];
      if (q2.possible == 0 && q2.team > 0) {
        yr.emptyBuffs[q1] = q2;
      }
    }
    q0.push({
      msg: p3(dR.KAWABANGA_STATS),
      title: p3(dR.KAWABANGA_STATS_TITLE),
      result: 3
    });
    q0.push({
      msg: p3(dR.FIND_TEAM),
      title: p3(dR.FIND_TEAM_TITLE),
      result: 2
    });
    if (yQ) {
      q0.push({
        msg: p3(dR.FAST_KILL),
        title: p3(dR.FAST_KILL_TITLE),
        result: 1
      });
    }
    yV(q0, yr);
  }
  async function yw(yr, ym, yU, yQ, q0) {
    const q1 = {
      buttons: ym
    };
    let q2 = await vI.confirm(yr, {}, q1);
    if (q2 == 0) {
      return;
    }
    if (q2 == -2) {
      return yX(yU, yU.level - 10);
    }
    if (q2 == -3) {
      return yX(yU, yU.level + 10);
    }
    if (q2 == 4) {
      b3(yQ);
      yw(yr, ym, yU, yQ, q0);
    } else if (q2 == 5 && !yU.best?.heroes) {
      b3(q0);
      yw(yr, ym, yU, yQ, q0);
    } else {
      let q3 = new yM(yU);
      switch (q2) {
        case 1:
          q3.start();
          break;
        case 2:
          q3.startPrecalc();
          break;
        case 5:
          yU.pet = yU.best.pet;
          yU.heroes = yU.best.heroes;
          yU.favor = yU.best.favor;
          yU.chance = yU.best.chance;
          q3.start();
          break;
      }
    }
  }
  async function yX(yr, ym) {
    yr.level = ym ? ym : yr.realLevel;
    let yQ = yr.realLevel == yr.level;
    let q0 = [{
      result: 0,
      isClose: true
    }];
    yr.battle = await yg(yr, yQ);
    yr.heroes.sort((ql, qv) => ql - qv);
    if (yr.level > 130) {
      q0.push({
        msg: p3(dR.PREV_LEVEL),
        title: p3(dR.PREV_LEVEL_TITLE),
        result: -2
      });
    }
    if (yr.battle && yr.level < 300) {
      q0.push({
        msg: p3(dR.NEXT_LEVEL),
        title: p3(dR.NEXT_LEVEL_TITLE),
        result: -3
      });
    }
    if (!yr.battle) {
      yw(p3(dR.NO_DATA_BOSS), q0, yr);
      return;
    }
    let q1 = dv.lib.invasion.boss.list;
    let q2 = "\"" + q1[yr.id].label + " <span style=\"color:red;\">" + yr.level + ("</span> " + p3(dR.LEVELS) + "\"");
    let q3 = p3(dR.VS_BOSS) + " " + q2;
    q0.push({
      msg: p3(dR.PRECALC),
      title: p3(dR.PRECALC_INVASION_TITLE),
      result: 2
    });
    if (yQ) {
      q0.push({
        msg: p3(dR.BTN_AUTO),
        title: p3(dR.ATTACK_INVASION_TITLE),
        result: 1
      });
    }
    let q4 = "";
    let q5 = true;
    if (!q5) {
      b3(p3(dR.ACCESS_FOR_BOSS), 8000);
    }
    let q6 = (await vT(zl + yr.id + "_" + yr.level, 2)) ?? {};
    let q7 = "";
    let q8 = "";
    for (let ql of yr.heroes) {
      q7 += ("0" + ql).slice(-2);
      q8 += ("0" + Math.max(0, (yr.favor[ql] ?? 0) - 5999)).slice(-2);
    }
    if (yr.pet) {
      q7 += ("0" + (6099 - yr.pet)).slice(-2);
    }
    let q9 = "<span style=\"color:" + y4(yr.buff, 300) + ";\">" + yr.buff + "</span>";
    let qd = q6[yr.buff]?.[q7]?.[q8];
    let qp = yC(q7, q8);
    if (!qd) {
      q3 += "\n" + p3(dR.NO_TEST_SELECT_TEAM) + (yr.mainId == yr.id ? "\n" + p3(dR.WITH_NOW_BUFF) + " " + q9 : "") + "!\n";
    } else {
      yr.chance = qd.w * 100 / qd.c;
      q3 += "\n" + p3(dR.SELECT_TEAM_BUFF) + " " + q9 + "\n" + p3(dR.COUNT_BATTLES, {
        count: "<span style=\"color:" + y3(qd.c, 2000) + ";\">" + qd.c + "</span>"
      }) + (",\n" + p3(dR.WIN_CHANCE) + " <span style=\"color:" + y3(yr.chance, 10) + ";\">" + yd(yr.chance, -3) + "</span>\n");
    }
    if (q5) {
      let qb = 0;
      let qY = [{
        percent: 0,
        hp: 100
      }];
      let qy = 0;
      let qq;
      for (let qC in q6) {
        let qh = {
          percent: 0,
          hp: 100
        };
        for (let qn in q6[qC]) {
          for (let qg in q6[qC][qn]) {
            let qZ = yC(qn, qg);
            let qf = q6[qC][qn][qg];
            let qj = qf.c;
            let qV = qf.w * 100 / qj;
            let qB = qf.b;
            if (qB < qh.hp || qV > qh.percent) {
              const qw = {
                pack: qZ,
                buff: qC,
                percent: qV,
                count: qj,
                hp: qB
              };
              qh = qw;
            }
            if (qZ == qp) {
              qb++;
              q4 += yp(qV, qC, qB, qj);
            }
          }
        }
        if (+qC == yr.buff) {
          qq = qh;
        }
        if (qh.hp < qY[qy].hp || qh.percent > qY[qy].percent) {
          qy++;
          qY.push(qh);
        }
      }
      let qc = p3(dR.VS_BOSS) + " " + q2 + ("\n\n" + p3(dR.NOW_MOMENT) + " " + p3(dR.WITH_NOW_BUFF) + " ") + q9;
      let qN = qq?.pack ? yq(qq.pack) : {};
      qc += qq ? " " + p3(dR.BEST_TEAM) + ":" + yv + yp(qq.percent, yr.buff, qq.hp, qq.count) + y5(qN) : " " + p3(dR.NO_WIN_TEAM) + "!";
      if (qy > 0) {
        qc += "\n\n" + p3(dR.BEST_TEAMS_ANY_BUFF) + ":" + yv;
        for (let qX = 1; qX <= qy; qX++) {
          qc += yp(qY[qX].percent, qY[qX].buff, qY[qX].hp, qY[qX].count) + y5(yq(qY[qX].pack));
        }
        qc += yY;
      }
      if (qb > 0) {
        q4 = p3(dR.TEAM_STATS_VS_BOSS) + " " + q2 + yv + q4 + yY;
        q0.push({
          msg: p3(dR.TEAM_STATS),
          title: p3(dR.TEAM_STATS_TITLE),
          result: 4
        });
      }
      if (qq && yQ) {
        const qH = {
          heroes: [],
          favor: {},
          chance: qq.percent
        };
        yr.best = qH;
        for (let qM of qN) {
          let qS = +qM.value[0];
          let qD = +qM.value[1];
          if (qS > 1000) {
            yr.best.pet = qS;
          } else {
            yr.best.heroes.push(qS);
          }
          if (qD > 0) {
            yr.best.favor[qS] = qD;
          }
        }
      }
      b3(qc);
    }
    let qz = "";
    if (yQ) {
      q0.push({
        msg: p3(dR.BEST_AUTO_ATTACK),
        title: p3(dR.BEST_AUTO_ATTACK_TITLE),
        result: 5
      });
      qz += q5 ? p3(dR.NOT_INFO_BEST) : p3(dR.FOR_USE_ACCESS, {
        function: p3(dR.BEST_AUTO_ATTACK)
      }) + dq;
    }
    yw(q3, q0, yr, q4, qz);
  }
  async function yH(yr) {
    yr = await yZ(yr);
    if (yr.mainId == yr.id) {
      yB(yr);
    } else {
      yX(yr);
    }
  }
  function yM(yr) {
    pF = true;
    pL = false;
    let ym = yr;
    let yU;
    let yQ = {};
    let q0 = 10;
    let q1 = 10000;
    let q2 = 1500;
    let q3 = 0;
    let q4 = 0;
    let q5 = {};
    let q6 = 0;
    let q7 = Date.now();
    let q8 = [];
    let q9 = [];
    function qd(qX) {
      const qH = {
        percentInOutDamageModAndEnergyIncrease_any_99_100_300_99_1000_300: qX
      };
      const qM = {
        attackers: qH
      };
      ym.battleData.effects = qM;
    }
    async function qp() {
      const qX = {
        result: -1,
        isClose: true
      };
      let qH = await vI.confirm(p3(dR.BUFF_ANSWER), {}, {
        buttons: [{
          msg: p3(dR.BTN_RUN),
          isInput: true,
          default: vo("invasionBossBuff", 0).toString()
        }, qX]
      });
      if (qH == -1) {
        return false;
      }
      ym.buff = p0(qH, 0, 0, 300);
      ym.buff -= ym.buff % 5;
      vu("invasionBossBuff", ym.buff);
      if (ym.buff > 0) {
        qd(ym.buff);
      } else {
        ym.battleData.effects = [];
      }
      return true;
    }
    function qz() {
      ym.countAll = 0;
      ym.countWin = 0;
      ym.sumAttempt = 0;
      ym.bestAttempt = 100;
    }
    function ql() {
      pF = false;
      pL = false;
      vi();
    }
    async function qv(qX, qH) {
      if (qH.autoImproved.checked) {
        q5 = await lO();
      }
      q1 = qX * 1000 - 200;
      q2 = 800 + q1 / 2;
      const qM = {
        chapterId: ym.chapterId,
        id: ym.id,
        pet: ym.pet,
        heroes: ym.heroes,
        favor: ym.favor
      };
      yQ = qM;
      yU = p3(dR.PROGRESS) + " " + qy();
      b3(qc() + "\n" + p3(dR.CLICK_TO_STOP), 0, qg);
      await b9((ym.await - Date.now()) / 1000);
      qZ();
    }
    this.quickStart = async function () {
      qv(vo("delayAttackInvasion", 30), vo("selectInvasionChecked", {}));
    };
    this.start = async function () {
      const qX = [{
        name: "autoImproved",
        checked: false,
        label: p3(dR.AUTO_IMPROVED),
        title: p3(dR.AUTO_IMPROVED_INVASION_TITLE),
        action: function (qs) {
          const qk = pd("hackBattle");
          if (qs && (!qk)) {
            b3(p3(qk ? dR.FOR_IMPROVED_CHECK : dR.NEED_IMPROVED_CHECK), 6000);
            return false;
          }
          return qs;
        }
      }];
      const qH = vo("selectInvasionChecked", {});
      if (!pd("hackBattle")) {
        qH.autoImproved = {
          checked: false
        };
      }
      lY(qX, qH);
      const qS = {
        result: -1,
        isClose: true
      };
      const qt = {
        checkBoxes: qX,
        options: {
          inRow: true
        }
      };
      let qA = vo("delayAttackInvasion", 30);
      let qi = await vI.confirm(p3(dR.ATTACK_TIMEOUT), {}, {
        buttons: [{
          msg: p3(dR.BTN_RUN),
          isInput: true,
          default: qA.toString()
        }, qS]
      }, qt);
      if (qi == -1) {
        ql();
        return;
      }
      vI.getCheckBoxes().forEach(qs => {
        qH[qs.name].checked = qs.checked;
      });
      qA = p0(qi, 30, 2, 300);
      vu("selectInvasionChecked", qH);
      vu("delayAttackInvasion", qA);
      qz();
      qv(qA, qH);
    };
    this.startFastKill = async function (qX) {
      await b9((ym.await - Date.now()) / 1000);
      const qH = {
        chapterId: ym.chapterId,
        id: ym.id,
        pet: ym.pet,
        heroes: ym.heroes,
        favor: ym.favor
      };
      const qM = {
        name: "invasion_bossStart",
        args: qH,
        ident: "body"
      };
      const qS = {
        calls: [qM]
      };
      let qD = await dd.Send(qS);
      if (!qD || "error" in qD) {
        console.log(qD?.error);
        ql();
        return;
      }
      qz();
      yU = p3(dR.PROGRESS) + " " + qy();
      ym.countAll++;
      pD = qD.results[0].result.response;
      const qt = {
        input: qX
      };
      const qA = {
        attackers: qt
      };
      pD.progress = [qA];
      let qi = await lK(pD);
      if (!qi.result.win) {
        vI.confirm(p3(dR.WRONG_INPUT));
        ql();
      } else {
        qh(qi);
      }
    };
    this.startPrecalc = async function () {
      ym.buff = 0;
      ym.battleData = structuredClone(ym.battle);
      if (ym.mainId != ym.id || (await qp())) {
        let qX = ym.heroes;
        let qH = ym.favor;
        let qM = ym.pet;
        const qS = {
          id: ym.id,
          pet: qM,
          heroes: qX,
          favor: qH
        };
        yQ = qS;
        yU = p3(dR.PRECALC) + " " + qy();
        qz();
        ym.battleData.attackers = YU(qX, qH, qM);
        if (ym.battleData?.attackers) {
          vA();
          qB();
          return;
        }
      }
      ql();
    };
    this.startFind = async function (qX) {
      vA();
      let qS = Object.values(dv.lib.invasion.list).at(-1).attackUnitsPool;
      let qD = [];
      let qt = {
        "1": 4,
        "2": 12,
        "4": 10,
        "5": 8,
        "6": 17,
        "7": 9,
        "12": 0,
        "13": 6,
        "16": 15,
        "17": 13,
        "21": 1,
        "33": 3,
        "34": 11,
        "35": 16,
        "36": 5,
        "45": 18,
        "48": 7,
        "58": 2,
        "59": 14
      };
      let qA = {
        "6000": 3,
        "6001": 4,
        "6002": 6,
        "6003": 8,
        "6004": 7,
        "6005": 0,
        "6006": 1,
        "6007": 5,
        "6008": 2,
        "6009": 9
      };
      for (let qi of qS.availableUnits) {
        if ((qi / 1000).floor(0) == 6) {
          q9.push(qi);
        } else if (qi != qS.mandatoryUnitId) {
          qD.push(qi);
        }
      }
      qD = qD.sort((qs, qk) => qt[qs] - qt[qk]);
      q9 = q9.sort((qs, qk) => qA[qs] - qA[qk]);
      q9.push(null);
      for (let qs = 4; qs > 0; qs--) {
        q8.push(...y0(qD, qs));
      }
      for (let qk of q8) {
        qk.push(qS.mandatoryUnitId);
      }
      qz();
      qV(qX);
    };
    function qb(qX, qH) {
      let qM = 0;
      let qS = 0;
      for (let qD in qX) {
        let qt = qX[qD].stats;
        qM += qt.strength * 40 + qt.hp;
      }
      for (let qA in qH) {
        qS += qH[qA]?.hp ?? 0;
      }
      return qS * 100 / qM;
    }
    function qY(qX) {
      let qH = qX.round(3) + p3(dR.HP_LEFT);
      if (qX < ym.bestAttempt) {
        ym.bestAttempt = qX;
        console.log(p3(dR.NEW_BEST_RESULT) + qH);
      }
      ym.sumAttempt += qX;
    }
    function qy() {
      return p3(dR.INVASION_PROGRESS, {
        bossName: "\"" + (dv.lib.invasion.boss.list[ym.id]?.label ?? "undefined") + " <span style=\"color:red;\">" + ym.level + "</span> " + p3(dR.LEVELS) + "\"",
        buff: "<span style=\"color:" + y4(ym.buff, 300) + ";\">" + ym.buff + "</span>"
      });
    }
    function qq() {
      return yU + dr(ym.countAll) + (" " + p3(dR.BATTLES_COUNT) + "\n" + p3(dR.BEST) + ":   ") + ym.bestAttempt.round(2) + (p3(dR.HP_LEFT) + "\n" + p3(dR.AVR) + ": ") + (ym.countAll ? (ym.sumAttempt / ym.countAll).round(2) : 0) + p3(dR.HP_LEFT);
    }
    function qc() {
      return qq() + (ym.chance >= 0 ? "\n" + p3(dR.CHANCE_TO_WIN) + ": <span style=\"color:green;\">" + yd(ym.chance, -3) + "</span>" : "");
    }
    function qN(qX, qH, qM, qS, qD, qt, qA) {
      const qi = {
        pet: qX,
        petAll: qH,
        pack: qM,
        packLast: qS,
        favor: qD,
        favorAll: qt,
        progress: qA
      };
      return qq() + ("\n" + p3(dR.FIND_PROGRESS, qi) + "\n");
    }
    async function qC(qX, qH = Date.now()) {
      const qM = {
        delay: qX / 1000
      };
      console.log(p3(dR.WAIT_DELAY_LOG, qM));
      await b9((qX + qH - Date.now()) / 1000);
      qZ();
    }
    function qW(qX = true, qH) {
      if (pd("stayOnline")) {
         if (z9?.stayOnline) {
          if (qX) {
            vu("invasionAutoStart", ym);
            location.reload();
          } else {
            b3(qc() + (qH + "\n" + p3(dR.ATTEMPT_RESTART_BATTLE)));
            qC(300000);
          }
          return;
        }
      }
      b5(p3(dR.FOR_AUTO_RESTART));
    }
    async function qh(qX, qH = true) {
      let qM = qX.progress;
      let qS = qX.result;
      ym.countWin++;
      qY(0);
      b3(qc() + ("\n" + p3(dR.BOSS_WIN) + "!\n" + p3(dR.WAIT_END_BATTLE) + "!"));
      console.log(qX);
      v0(pf, pD, qM);
      let qD = qX.battleTime[0];
      let qt = b8(qD);
      if (qH && qt > 0) {
        console.log(p3(dR.NEED_WAIT_LOG, {
          time: qD.round(1),
          timer: qt.round(1)
        }));
        await b9(qt);
      }
      b5("");
      const qA = {
        id: ym.id,
        progress: qM,
        result: qS
      };
      const qi = {
        name: "invasion_bossEnd",
        args: qA,
        ident: "body"
      };
      let qs = [qi];
      const qk = {
        calls: qs
      };
      await dd.Send(qk);
      setTimeout(dv.refreshGame, 100);
      b3(qc() + ("\n" + p3(dR.BOSS_WIN) + "!"));
      vI.confirm(p3(dR.WIN_BOSS) + " \"" + (dv.lib.invasion.boss.list[ym.id]?.label ?? "undefined") + " <span style=\"color:red;\">" + ym.level + "</span> " + p3(dR.LEVELS) + "\"");
      ql();
    }
    async function qn(qX) {
      let qH = p1(q2, q1) + q3;
      let qM = Date.now();
      if (!qX) {
        b3(qc() + ("\n" + p3(dR.GAME_CONNECT_FAILED) + "\n" + p3(dR.ATTEMPT_RESTART_BATTLE)));
        if (++q4 > 5) {
          qW();
        } else {
          qC(qH, qM);
        }
        return;
      }
      q4 = 0;
      if ("error" in qX) {
        let qD = qX.error;
        let qt = "\n" + p3(dR.THROW_ERROR) + ": " + qD.description + "\n" + qD.name;
        if (qD.name != "NotFound") {
          if (qD.name == "NotAvailable" && qD.description.includes("many tries")) {
            q3 += 100;
            qC(qH, qM);
          } else {
            const qA = {
              name: qD.name,
              description: qD.description
            };
            if (pd("interface.showErrors")) {
              vI.confirm(p3(dR.ERROR_MSG, qA));
            }
            qW(!qD.description.includes("battle limit"), qt);
          }
        }
        b3(qc() + ("\n" + p3(dR.BTN_AUTO) + " <span style=\"color:red;\">" + p3(dR.STOPPED) + "</span>" + qt));
        return;
      }
      ym.countAll++;
      pt = Date.now();
      pD = qX.results[0].result.response;
      ym.battleData = pD;
      let qS = await lK(pD);
      if (qS.result.win) {
        qh(qS);
      } else {
        if (q5.valid) {
          const qi = await vZ(pD, (q5.x ?? 0) - 273235429, (q5.y ?? 0) - 904648297, qS, !pd("manualPrecalc"), qH);
          qS[q5.p] = qi.result;
          qS[q5.f][0][q5.s] = qi.progress[0].attackers;
          qS[q5.f][0][q5.t] = qi.progress[0].defenders;
          qS[q5.d] = [qi.battleTime];
          qH = 0;
        }
        qY(qb(pD.defenders[0], qS.progress[0].defenders.heroes));
        b3(qc() + "\n" + p3(dR.CLICK_TO_STOP), 0, qg);
        if (qS.result.win) {
          qh(qS);
        } else {
          qC(qH, qM);
        }
      }
    }
    function qg() {
      pL = true;
      pN = true;
      pR = true;
    }
    function qZ() {
      if (!pL) {
        const qX = {
          name: "invasion_bossStart",
          args: yQ,
          ident: "body"
        };
        let qH = [qX];
        const qM = {
          calls: qH
        };
        dd.Send(qM).then(qS => qn(qS));
        return;
      }
      ql();
    }
    async function qf(qX) {
      let qH = await lK(qX);
      let qM = 0;
      if (!qH.result.win) {
        qM = qb(qX.defenders[0], qH.progress[0].defenders.heroes);
      }
      qY(qM);
      return qM;
    }
    async function qj(qX) {
      ym.level = qX.lvl;
      ym.buff = qX.buff;
      ym.battleData = structuredClone(await yg(ym, false));
      ym.battleData.seed = ym.seed;
      ym.battleData.typeId = ym.level;
      qd(ym.buff);
      yU = p3(dR.SEARCH) + " " + qy();
    }
    async function qV(qX) {
      await qj(qX);
      while (qX) {
        let qS = q9[qX.pet];
        let qD = qX.pet + 1;
        while (qX.first < qX.last) {
          let qt = qX.pet / q9.length + qX.first / q8.length / q9.length;
          let qA = q8[qX.first++];
          let qi = 0;
          let qs = YQ(qA, q9);
          while (qi < qs.length) {
            let qk = ((qt + qi / q8.length / q9.length / qs.length) * 100).round(4);
            let qG = qs[qi++];
            if (!pL) {
              ym.battleData.attackers = YU(qA, qG, qS);
              let qF = await ze(ym.battleData, false, {});
              ym.countAll++;
              qX.battle++;
              qY(qb(ym.battleData.defenders[0], qF.progress[0].defenders.heroes));
              if (Date.now() - q6 > 200) {
                q6 = Date.now();
                b3(qN(qD, q9.length, qX.first, q8.length, qi + 1, qs.length, qk) + p3(dR.CLICK_TO_STOP), 0, qg);
                await bd();
              }
              if (qF.result.win) {
                b3(qN(qD, q9.length, qX.first, q8.length, qi + 1, qs.length, qk) + p3(dR.BOSS_WIN));
                ym.bestAttempt = 100;
                delete qX.part;
                const qL = {
                  id: ym.id,
                  heroes: qA,
                  favor: qG,
                  pet: qS
                };
                v0(qL, ym.battleData);
                vI.confirm(p3(dR.TEAM_FOUND));
                if (qX.search) {
                  qX.buff = await yf(ym.level);
                  qX.new = z8[zw][ym.level][qX.buff].percent == 0;
                  qV(await ls(true, qX));
                } else {
                  ls(false, qX);
                  ql();
                }
                return;
              }
            } else {
              b3(qN(qD, q9.length, qX.first, q8.length, qi + 1, qs.length, qk) + p3(dR.CALC_STATS_STOPPED));
              qX.first--;
              ls(false, qX);
              ql();
              return;
            }
          }
          if (Date.now() - q7 > 1500000) {
            break;
          }
        }
        qX = await ls(true, qX);
        await qj(qX);
        q7 = Date.now();
      }
      if (!z8[zw][ym.level]) {
        z8[zw][ym.level] = {};
      }
      z8[zw][ym.level][ym.buff] = {
        possible: 0,
        percent: 100,
        team: 0
      };
      b3(qq() + "\n" + p3(dR.CALC_STATS_STOPPED));
      vI.confirm(dr(ym.countAll) + " " + p3(dR.BATTLES_COUNT) + "\n" + p3(dR.NOTHING_TEST), {}, {
        buttons: [{
          msg: p3(dR.BTN_OK),
          result: false
        }, {
          isClose: true,
          result: false
        }]
      });
      ql();
    }
    async function qB() {
      q0 = 10;
      for (let qH = 0; qH < q0 && !pL; qH++) {
        ym.battleData.seed = (Date.now() / 1000).floor(0) - p1(0, 1000000000);
        if ((await qf(ym.battleData)) == 0) {
          ym.countWin++;
        }
        ym.countAll++;
      }
      let qX = qq() + "\nПобед: <span style=\"color:green;\">" + yd(ym.countWin * 100 / ym.countAll, -3) + "</span> (" + ym.countWin + " / " + ym.countAll + ")\n";
      if (pL) {
        qX += p3(dR.CALC_STATS_STOPPED);
        b3(qX);
        qw();
        ql();
      } else {
        qX += p3(dR.CLICK_TO_STOP);
        b3(qX, 0, qg);
        setTimeout(qB, 0);
      }
    }
    function qw() {
      let qX = ym.id;
      let qH = ym.level;
      let qM = zl + qX + "_" + qH;
      let qS = ym.battleData.attackers.sort((qO, qR) => qO.id - qR.id);
      let qD = z8[qM];
      let qt = yn(qS);
      let qA = qt.hero;
      let qi = qt.pet;
      let qs = ym.buff;
      let qk = ym.countWin;
      let qG = ym.countAll;
      let qF = ym.bestAttempt;
      if (qA.length == 12 && qi.length == 10 && +qi > 0) {
        const qO = {
          id: qX,
          lvl: qH,
          bf: qs,
          hc: qA,
          pc: qi,
          w: qk,
          c: qG,
          b: qF
        };
        lD(qO);
      }
      if (!qD) {
        qD = {};
      }
      if (!qD[qs]) {
        qD[qs] = {};
      }
      if (!qD[qs][qA]) {
        qD[qs][qA] = {};
      }
      if (!qD[qs][qA][qi]) {
        qD[qs][qA][qi] = {
          w: 0,
          c: 0,
          b: 100
        };
      }
      qD[qs][qA][qi].w += qk;
      qD[qs][qA][qi].c += qG;
      if (qF < qD[qs][qA][qi].b) {
        qD[qs][qA][qi].b = qF;
      }
      z8[qM] = qD;
      ql();
    }
  }
  async function yS(yr) {
    return new Promise((ym, yU) => {
      let yQ = new yt(ym, yU, yr);
      yQ.start();
    });
  }
  async function yD() {
    
    return yS(py);
  }
  function yt(yr, ym, yU) {
    let yQ = yU?.id;
    let q0 = yU?.lvl;
    let q1 = [];
    let q2;
    let q3 = {};
    let q4;
    async function q5(q7) {
      let q8 = p3(dR.BEST_TEAMS_VS_BOSS) + " " + q4 + yv + "                                                            " + p3(dR.HERO_TEAMS);
      let q9 = q3;
      let qd = true;
      if (q7 <= 300) {
        const ql = {
          [q7]: q3[q7]
        };
        q9 = ql;
        qd = false;
      }
      let qp = 0;
      let qz = 0;
      for (let qv in q9) {
        if (qz < +qv) {
          qz = +qv;
        }
        for (let qb of q9[qv]) {
          if (qp < qb.rate) {
            qp = qb.rate;
          }
          if (qd) {
            break;
          }
        }
      }
      qz = Math.max(qz, 100);
      for (let qY in q9) {
        for (let qy of q9[qY]) {
          q8 += yp(qy.rate, qY, qy.bestHp, qy.count, qp, qz) + y5(qy.heroes);
          if (qd) {
            break;
          }
        }
      }
      q8 += yY;
      b3(q8);
      if (q1.length != 1) {
        q6();
      }
    }
    async function q6() {
      const q7 = {
        isClose: true,
        result: -1
      };
      let q8 = [q7];
      if (q0 > 130) {
        q8.push({
          msg: p3(dR.PREV_LEVEL),
          title: p3(dR.PREV_LEVEL_TITLE),
          result: -2
        });
      }
      if (q2 && q0 < 400) {
        q8.push({
          msg: p3(dR.NEXT_LEVEL),
          title: p3(dR.NEXT_LEVEL_TITLE),
          result: -3
        });
      }
      if (q1.length > 1) {
        q8 = q8.concat(q1.map(qp => ({
          msg: qp,
          result: qp
        })));
        q8.push({
          msg: p3(dR.ALL_BUFFS),
          title: p3(dR.ALL_BUFFS_TITLE),
          result: 1000
        });
      }
      if (q1.length == 1) {
        q5(q1[0] ?? 0);
      }
      const q9 = {
        buttons: q8
      };
      let qd = await vI.confirm(p3(dR.SELECT_BUFF) + "\n" + q4 + ":", {}, q9);
      if (qd == -1) {
        return;
      }
      if (qd == -2) {
        const qp = {
          id: yQ,
          lvl: q0 - 10
        };
        return yS(qp);
      }
      if (qd == -3) {
        const qz = {
          id: yQ,
          lvl: q0 + 10
        };
        return yS(qz);
      }
      if (qd == 1000) {
        q5(qd);
      } else {
        q5(qd);
      }
    }
    this.start = async function () {
      let q7 = ["invasion_getInfo"].map(qz => ({
        name: qz,
        args: {},
        ident: qz
      }));
      const q8 = {
        calls: q7
      };
      let q9 = await dd.Send(q8).then(qz => qz.results);
      let qd = q9[0].result.response?.actions;
      if (!qd) {
        b3(p3(dR.EVENT) + " " + p3(dR.NOT_AVAILABLE), 5000);
        return;
      }
      let qp = dv.lib.invasion.boss.list;
      q4 = "\"" + (qp[yQ]?.label ?? "undefined") + " <span style=\"color:red;\">" + q0 + ("</span> " + p3(dR.LEVELS) + "\"");
      q2 = await vT((yQ == Object.values(qp).at(-1).id ? zv : zl) + yQ + "_" + q0, 2);
      b3("");
      if (q2) {
        for (let qz in q2) {
          let ql = [];
          let qv = [];
          for (let qb in q2[qz]) {
            for (let qY in q2[qz][qb]) {
              let qy = q2[qz][qb][qY];
              let qq = qy.w * 100 / qy.c;
              ql.push({
                code: yC(qb, qY),
                rate: qq,
                countWin: qy.w,
                countAll: qy.c,
                bestHp: qy.b
              });
            }
          }
          ql.sort((qc, qN) => qc.bestHp - qN.bestHp || qN.rate - qc.rate);
          for (let qc in ql) {
            let qN = ql[qc];
            qN.resource = qz * 0.6;
            if (qv.length < 50) {
              qv.push({
                heroes: yq(qN.code),
                rate: qN.rate,
                count: qN.countAll,
                bestHp: qN.bestHp
              });
            } else {
              break;
            }
          }
          if (qv.length > 0) {
            q3[qz] = qv;
          }
        }
        q1 = Object.keys(q3).map(qC => +qC).sort((qC, qW) => qC - qW);
        if (q1.length == 0) {
          b3(p3(dR.NO_FIND_WIN_TEAM));
        }
      } else {
        b3(p3(dR.NO_DATA_BOSS));
      }
      q6();
      yr();
    };
  }
  function yA(yr) {
    let ym = {};
    for (let yU in yr) {
      let yQ = yr?.[yU] ?? {};
      for (let q0 in yQ) {
        if (!ym[q0]) {
          ym[q0] = {};
        }
        for (let q1 in yQ[q0]) {
          if (!ym[q0][q1]) {
            ym[q0][q1] = {
              w: 0,
              c: 0,
              d: 0
            };
          }
          ym[q0][q1].w += yQ[q0][q1].w;
          ym[q0][q1].c += yQ[q0][q1].c;
          ym[q0][q1].d += yQ[q0][q1].d;
        }
      }
    }
    return ym;
  }
  async function yi() {
    
    return new Promise((yr, ym) => {
      let yU = new ys(yr, ym);
      yU.start();
    });
  }
  function ys(yr, ym) {
    let yU;
    let yQ;
    let q0;
    let q1;
    let q2;
    let q3;
    let q4;
    const q5 = {
      msg: p3(dR.BACK),
      title: p3(dR.BACK_TITLE),
      result: -1
    };
    const q6 = {
      isClose: true,
      result: -2
    };
    const q7 = q6;
    const q8 = [{
      name: "defWithPet",
      label: p3(dR.DEF_PET),
      title: p3(dR.DEF_PET_TITLE),
      checked: false
    }, {
      name: "allPlatform",
      label: p3(dR.OTHER_PLAT),
      title: p3(dR.OTHER_PLAT_TITLE),
      checked: false
    }];
    function q9(qb, qY, qy) {
      const qq = {
        name: qb,
        label: qY,
        checked: qy
      };
      return qq;
    }
    function qd(qb, qY, qy, qq = 70, qc = 1000, qN = 100) {
      return "\n<span style=\"color:" + y3(qb, qq) + ";\">" + yd(qb, 1) + "</span>   <span style=\"color:" + y3(qY, qc) + ";\">" + y7(qY) + "</span>   <span style=\"color:" + y3(qy, qN) + (";\">" + qy).fixed(6) + "</span>     ";
    }
    function qp(qb, qY, qy, qq) {
      let qc = qY * 100 / qq;
      if (q3 < qc) {
        q3 = qc;
      }
      const qN = {
        code: qb,
        rate: qc,
        diff: qy,
        count: qq
      };
      q4.push(qN);
    }
    async function qz(qb, qY, qy, qq) {
      q3 = 0;
      q4 = [];
      let qc = 0;
      let qN = yA(await vP(q0.map(qW => zp + "def_" + qW), 2));
      for (let qW in qN) {
        let qh = qN[qW];
        let qn = qW.match(/..?/g);
        let qg = false;
        qc += Object.keys(qh).length;
        for (let qV of qn) {
          if (q2.includes(+qV)) {
            qg = true;
            break;
          }
        }
        if (qg) {
          continue;
        }
        let qZ = 0;
        let qf = 0;
        let qj = 0;
        for (let qB in qh) {
          let qw = qh[qB];
          let qX = qw.w;
          let qH = qw.c;
          let qM = qw.d;
          if (qY && qy <= qH && qq <= qM) {
            qp(yC(qW, qB), qX, qM, qH);
          } else {
            qZ += qX;
            qf += qH;
            qj += qM;
          }
        }
        if (!qY && qy <= qf && qq <= qj) {
          qp(qW, qZ, qj, qf);
        }
      }
      q4.sort((qS, qD) => qD.rate - qS.rate);
      let qC = p3(dR.EBR_TAB_TITLE, {
        teamType: p3(dR.DEF),
        platforms: q0.join(", ")
      }) + "\n" + p3(dR.EBR_TEAMS_COUNT, {
        baseCount: qc,
        selectCount: q4.length,
        bestCount: Math.min(qb, q4.length)
      }) + "\n\nWR       CB         DF                                    " + (qY ? "                            " : "") + p3(dR.HERO_TEAMS);
      for (let qS in q4) {
        if (qS >= qb) {
          break;
        }
        let qD = q4[qS];
        qC += qd(qD.rate, qD.count, qD.diff, q3);
        if (qY) {
          qC += y5(yq(qD.code));
        } else {
          qC += y6(yN(qD.code));
        }
      }
      qC += "\n\n" + p3(dR.EBR_LEGEND) + "\n" + p3(dR.EBR_LEGEND_WR_DEF) + "\n" + p3(dR.EBR_LEGEND_CB) + "\n" + p3(dR.EBR_LEGEND_DF);
      b3(qC);
      ql();
    }
    async function ql() {
      let qb = vo("epicBrawlDefOptionsChecked", {});
      let qY = vo("epicBrawlDefInputs", {});
      let qy = [{
        name: "minCount",
        title: p3(dR.MIN_CB),
        placeholder: "min CB",
        default: (qY.minCount ?? 500).toString()
      }, {
        name: "minDiff",
        title: p3(dR.MIN_DIFF),
        placeholder: "min DF",
        default: (qY.minDiff ?? 50).toString()
      }, {
        name: "countBest",
        title: p3(dR.COUNT_SHOW_BEST),
        placeholder: p3(dR.COUNT_BEST),
        default: (qY.countBest ?? 30).toString()
      }];
      lY(q8, qb);
      let qq = [{
        msg: p3(dR.SHOW),
        result: 1
      }, q5, q7];
      const qc = {
        buttons: qq
      };
      const qN = {
        checkBoxes: q8
      };
      const qC = {
        inputs: qy
      };
      let qW = await vI.confirm(p3(dR.ADD_SETTING), {}, qc, qN, qC);
      let qh = vI.getInputs();
      let qn = vI.getCheckBoxes();
      let qg;
      qh.forEach(qZ => {
        qY[qZ.name] = qZ.value;
      });
      qn.forEach(qZ => {
        qb[qZ.name].checked = qZ.checked;
      });
      vu("epicBrawlDefInputs", qY);
      vu("epicBrawlDefOptionsChecked", qb);
      if (qW == -2) {
        return;
      }
      if (qW == -1) {
        qv();
        return;
      }
      q0 = qb?.allPlatform?.checked ? ["vk", "ok", "wb", "mg", "mm", "fb"] : [dx];
      qz(+qY.countBest, qb.defWithPet.checked, +qY.minCount, +qY.minDiff);
    }
    async function qv() {
      let qb = [{
        msg: "           " + p3(dR.NEXT) + "          ",
        result: 1
      }, {
        msg: "    " + p3(dR.DEFAULT) + "    ",
        result: 2
      }, {
        msg: "     " + p3(dR.ON_ALL) + "     ",
        result: 3
      }, {
        msg: "     " + p3(dR.OFF_ALL) + "     ",
        result: 4
      }, q7];
      let qY = vo("epicBrawlDefHeroChecked", {});
      lY(q1, qY);
      const qy = {
        buttons: qb
      };
      const qc = {
        checkBoxes: q1,
        options: {
          inRow: true,
          width: 160
        }
      };
      let qN = await vI.confirm(p3(dR.SELECT_HEROES), {}, qy, qc);
      let qC = vI.getCheckBoxes();
      if (qN == 1) {
        qC.forEach(qn => {
          qY[qn.name].checked = qn.checked;
        });
      } else if (qN == 2) {
        qC.forEach(qn => {
          qY[qn.name].checked = yU[qn.name].power > 150000;
        });
      } else if (qN == 3) {
        qC.forEach(qn => {
          qY[qn.name].checked = true;
        });
      } else if (qN == 4) {
        qC.forEach(qn => {
          qY[qn.name].checked = false;
        });
      }
      vu("epicBrawlDefHeroChecked", qY);
      if (qN > 1) {
        qv();
        return;
      }
      let qW = yQ.filter(qn => qY[qn]?.checked).slice(0, 10);
      let qh = 0;
      for (let qn = 0; qn < qW.length; qn++) {
        qh += yU[qW[qn]].power;
      }
      q2 = Object.keys(yU).filter(qg => !yQ.includes(qg) || !qY[qg]?.checked).map(qg => +qg);
      if (qN == -2) {
        return;
      }
      ql();
    }
    this.start = async function () {
      let qb = ["epicBrawl_getInfo", "heroGetAll"].map(qc => ({
        name: qc,
        args: {},
        ident: qc
      }));
      const qY = {
        calls: qb
      };
      let qy = await dd.Send(qY).then(qc => qc.results);
      let qq = qy[0].result.response?.bannedHeroes;
      if (!qq) {
        b3(p3(dR.EVENT) + " " + p3(dR.NOT_AVAILABLE), 5000);
        return;
      }
      yU = qy[1].result.response;
      yQ = Object.keys(yU).filter(qc => !qq.includes(+qc)).sort((qc, qN) => yU[qN].power - yU[qc].power);
      q1 = yQ.map(qc => q9(qc, dv.translate("LIB_HERO_NAME_" + qc), yU[qc].power > 150000));
      qv();
      yr();
    };
  }
  function yk(yr, ym) {
    let yU = {};
    for (let yQ in yr) {
      let q0 = yr[yQ];
      for (let q1 in q0) {
        if (!yU[q1]) {
          yU[q1] = {};
        }
        for (let q2 in q0[q1]) {
          if (!yU[q1][q2]) {
            yU[q1][q2] = {};
          }
          for (let q3 in q0[q1][q2]) {
            if (!yU[q1][q2][q3]) {
              yU[q1][q2][q3] = {
                w: 0,
                c: 0
              };
            }
            yU[q1][q2][q3].w += q0[q1][q2][q3].w;
            yU[q1][q2][q3].c += q0[q1][q2][q3].c;
          }
        }
      }
    }
    return yU;
  }
  async function yG(yr = false) {
    
    if (!pu) {
      pu = yr === true;
      return new Promise((ym, yU) => {
        let yQ = new yF(ym, yU, yr === true);
        yQ.start();
      });
    }
  }
  function yF(yr, ym, yU) {
    let yQ;
    let q0;
    let q1;
    let q2;
    let q3;
    const q4 = {
      msg: p3(dR.BACK),
      title: p3(dR.BACK_TITLE),
      result: -1
    };
    const q5 = {
      isClose: true,
      result: -2
    };
    const q6 = q5;
    const q7 = [{
      name: "defWithPet",
      label: p3(dR.DEF_PET),
      title: p3(dR.DEF_PET_TITLE),
      checked: true
    }, {
      name: "allPlatform",
      label: p3(dR.OTHER_PLAT),
      title: p3(dR.OTHER_PLAT_TITLE),
      checked: false
    }, {
      name: "fastShow",
      label: p3(dR.FAST_SHOW),
      title: p3(dR.FAST_SHOW_TITLE),
      checked: false
    }];
    function q8(qv, qb, qY) {
      const qy = {
        name: qv,
        label: qb,
        checked: qY
      };
      return qy;
    }
    function q9(qv, qb, qY = 100, qy = 1000) {
      return "\n<span style=\"color:" + y3(qv, qY) + ";\">" + yd(qv, 1) + "</span>   <span style=\"color:" + y3(qb, qy) + ";\">" + y7(qb) + "</span>     ";
    }
    function qd(qv) {
      let qb = dv.lib.hero;
      let qY = [];
      for (let qN in qv) {
        let qC = qv[qN];
        let qW = qb[qN].battleOrder;
        const qh = {
          order: qW,
          unit: qC
        };
        qY.push(qh);
      }
      qY.sort((qn, qg) => qg.order - qn.order);
      qY.push(qY[0]);
      let qy = [];
      let qq = "";
      let qc = "";
      for (let qn = 1; qn < qY.length; qn++) {
        let qg = qY[qn].unit;
        let qZ = qg.type == "pet";
        let qf = qg.id;
        let qj = qg.favorPetId ?? 0;
        qq += ("0" + (qZ ? 6099 - qf : qf)).slice(-2);
        qc += qZ ? "" : ("0" + Math.max(0, qj - 5999)).slice(-2);
        qy.push(qf + "." + qj);
      }
      return {
        full: qy.join("_"),
        hero: qq,
        pet: qc
      };
    }
    async function qp(qv, qb, qY) {
      let qy = {};
      let qq = await vT(zp + q3.hero, 2);
      let qc = yk(qq ?? {}, qY);
      let qN = 0;
      pu = false;
      if (!qc || Object.keys(qc).length == 0) {
        b3(p3(dR.NO_TEAM_DATA) + (qY.length == 1 ? p3(dR.OTHER_PLAT_DATA) : " 😢"));
        if (!yU) {
          qz();
        }
        return;
      }
      if (qb) {
        if (!qc[q3.pet]) {
          b3(p3(dR.NO_TEAM_DATA) + p3(dR.OTHER_PET_DATA));
          if (!yU) {
            qz();
          }
          return;
        }
        qc = {
          [q3.pet]: qc[q3.pet]
        };
      }
      for (let qg in qc) {
        let qZ = qc[qg];
        for (let qf in qZ) {
          let qj = qZ[qf];
          let qV = qf.match(/..?/g);
          let qB = false;
          qN += Object.keys(qj).length;
          for (let qw of qV) {
            if (q2.includes(+qw)) {
              qB = true;
              break;
            }
          }
          if (qB) {
            continue;
          }
          for (let qX in qj) {
            let qH = qj[qX];
            let qM = yC(qf, qX);
            if (!qy[qM]) {
              qy[qM] = {
                win: 0,
                count: 0
              };
            }
            qy[qM].win += qH.w;
            qy[qM].count += qH.c;
          }
        }
      }
      qy = Object.entries(qy);
      if (qy.length == 0) {
        b3(p3(dR.NO_TEAM_DATA) + p3(dR.OTHER_SETTING_DATA));
        if (!yU) {
          qz();
        }
        return;
      }
      qy = qy.sort((qD, qt) => qt[1].count - qD[1].count);
      let qC = qy[0][1].count;
      let qW = 0;
      let qh = 0;
      for (let qD = Math.min(qv, qy.length) - 1; qD < qy.length; qD++) {
        qW = qy[qD][1].count;
        if (qC - qW >= 20 || qW < 20) {
          break;
        }
      }
      qy = qy.filter(qt => qt[1].count >= qW).map(qt => [qt[0], {
        count: qt[1].count,
        rate: qt[1].win * 100 / qt[1].count
      }]).sort((qt, qA) => qA[1].rate - qt[1].rate);
      let qn = p3(dR.EBR_TAB_TITLE, {
        teamType: p3(dR.ATT),
        platforms: qY.join(", ")
      }) + ("\n" + p3(dR.VS_TEAM) + ": ") + (qb ? y5(yq(q3.full)) : y6(yN(q3.hero))) + "\n" + p3(dR.EBR_TEAMS_COUNT, {
        baseCount: qN,
        selectCount: qy.length,
        bestCount: Math.min(qv, qy.length)
      }) + "\n\nWR       CB                                                                " + p3(dR.HERO_TEAMS);
      qy = Object.fromEntries(qy);
      for (let qt in qy) {
        if (qh++ >= qv) {
          break;
        }
        let qA = qy[qt];
        qn += q9(qA.rate, qA.count) + y5(yq(qt));
      }
      qn += "\n\n" + p3(dR.EBR_LEGEND) + "\n" + p3(dR.EBR_LEGEND_WR_ATT) + "\n" + p3(dR.EBR_LEGEND_CB);
      b3(qn);
      if (!yU) {
        qz();
      }
    }
    async function qz() {
      let qv = vo("epicBrawlAttOptionsChecked", {});
      let qb = vo("epicBrawlAttInputs", {});
      if (!yU) {
        let qy = [{
          name: "countBest",
          title: p3(dR.COUNT_SHOW_BEST),
          placeholder: p3(dR.COUNT_BEST),
          default: (qb.countBest ?? 10).toString()
        }];
        lY(q7, qv);
        let qq = [{
          msg: p3(dR.SHOW),
          result: 1
        }, q4, q6];
        const qc = {
          buttons: qq
        };
        const qN = {
          checkBoxes: q7
        };
        const qC = {
          inputs: qy
        };
        let qW = await vI.confirm(p3(dR.ADD_SETTING), {}, qc, qN, qC);
        let qh = vI.getInputs();
        let qn = vI.getCheckBoxes();
        qh.forEach(qg => {
          qb[qg.name] = qg.value;
        });
        qn.forEach(qg => {
          qv[qg.name].checked = qg.checked;
        });
        vu("epicBrawlAttInputs", qb);
        vu("epicBrawlAttOptionsChecked", qv);
        if (qW == -2) {
          return;
        }
        if (qW == -1) {
          ql();
          return;
        }
      }
      let qY = qv?.allPlatform?.checked ? ["vk", "ok", "wb", "mg", "mm", "fb"] : [dx];
      qp(+(qb?.countBest ?? 10), qv?.defWithPet?.checked, qY);
    }
    async function ql() {
      let qv = vo("epicBrawlAttHeroChecked", {});
      if (!yU) {
        lY(q1, qv);
        let qb = [{
          msg: "           " + p3(dR.NEXT) + "          ",
          result: 1
        }, {
          msg: "    " + p3(dR.DEFAULT) + "    ",
          result: 2
        }, {
          msg: "     " + p3(dR.ON_ALL) + "     ",
          result: 3
        }, {
          msg: "     " + p3(dR.OFF_ALL) + "     ",
          result: 4
        }, q6];
        const qY = {
          buttons: qb
        };
        const qq = {
          checkBoxes: q1,
          options: {
            inRow: true,
            width: 160
          }
        };
        let qc = await vI.confirm(p3(dR.SELECT_HEROES), {}, qY, qq);
        let qN = vI.getCheckBoxes();
        if (qc == 1) {
          qN.forEach(qC => {
            qv[qC.name].checked = qC.checked;
          });
        } else if (qc == 2) {
          qN.forEach(qC => {
            qv[qC.name].checked = yQ[qC.name].power > 150000;
          });
        } else if (qc == 3) {
          qN.forEach(qC => {
            qv[qC.name].checked = true;
          });
        } else if (qc == 4) {
          qN.forEach(qC => {
            qv[qC.name].checked = false;
          });
        }
        vu("epicBrawlAttHeroChecked", qv);
        if (qc > 1) {
          ql();
          return;
        }
        if (qc == -2) {
          return;
        }
      }
      q2 = Object.keys(yQ).filter(qC => !q0.includes(qC) || !qv[qC]?.checked).map(qC => +qC);
      qz();
    }
    this.start = async function () {
      let qv = ["epicBrawl_getInfo", "heroGetAll"].map(qc => ({
        name: qc,
        args: {},
        ident: qc
      }));
      const qb = {
        calls: qv
      };
      let qY = await dd.Send(qb).then(qc => qc.results);
      let qy = qY[0].result.response;
      let qq = qy.bannedHeroes;
      if (!qy) {
        b3(p3(dR.EVENT) + " " + p3(dR.NOT_AVAILABLE), 5000);
        return;
      }
      if (!qy?.enemy) {
        b3(p3(dR.NO_RIVAL_DATA), 5000);
        pu = false;
        return;
      }
      q3 = qd(qy.enemy.defence.units);
      yQ = qY[1].result.response;
      q0 = Object.keys(yQ).filter(qc => !qq.includes(+qc)).sort((qc, qN) => yQ[qN].power - yQ[qc].power);
      q1 = q0.map(qc => q8(qc, dv.translate("LIB_HERO_NAME_" + qc), yQ[qc].power > 150000));
      ql();
      yr();
    };
  }
  async function yL() {
    let yr = ["userGetInfo", "brawl_questGetInfo", "brawl_findEnemies", "brawl_getInfo", "teamGetAll", "teamGetFavor"].map(yQ => ({
      name: yQ,
      args: {},
      ident: yQ
    }));
    const ym = {
      calls: yr
    };
    const yU = await dd.Send(ym);
    return {
      attempts: yU.results[0].result.response.refillable.find(yQ => yQ.id == 48).amount,
      questInfo: yU.results[1].result.response,
      findEnemies: yU.results[2].result.response,
      info: yU.results[3].result.response,
      teams: yU.results[4].result.response,
      favor: yU.results[5].result.response
    };
  }
  async function yO() {
    let yU = vo("autoBrawlInputs", {});
    let yQ = vo("autoBrawlMods", {});
    let q0 = await yL();
    let q1 = dv.lib.brawl.promoHero[q0.info.id].promoHero;
    let q2 = dv.lib.hero[q1].type;
    let q3 = [{
      name: "battle",
      title: p3(dR.COUNT_PRECALC_BRAWL_TITLE),
      placeholder: p3(dR.COUNT_TEST),
      default: (yU.battle ?? 10).toString()
    }, {
      name: "winrate",
      title: p3(dR.MIN_WINRATE_TITLE),
      placeholder: p3(dR.WIN_RATE),
      default: (yU.winrate ?? 90).toString()
    }];
    let q4 = await vI.confirm(p3(dR.BRAWL_SELECT, {
      type: q2 == "titan" ? p3(dR.TITANS) : p3(dR.HEROES)
    }), {}, {
      buttons: [{
        msg: p3(dR.BTN_RUN),
        title: p3(dR.RUN_BRAWL_TITLE),
        result: 1,
        inRow: true,
        selects: [{
          selected: yQ[0] ?? 1,
          options: p3(dR.BRAWL_MODES)
        }]
      }, {
        isClose: true,
        result: 0
      }]
    }, {
      checkBoxes: []
    }, {
      inputs: q3
    });
    vI.getInputs().forEach(q5 => {
      yU[q5.name] = q5.value;
    });
    yU.battle = p0(yU.battle, 10, 0, 1000);
    yU.winrate = p0(yU.winrate, 90, 0, 100);
    vu("autoBrawlInputs", yU);
    if (q4?.id == 1) {
      for (let q5 = 0; q5 < q4.results.length; q5++) {
        yQ[q5] = q4.results[q5];
      }
      vu("autoBrawlMods", yQ);
      return new Promise((q6, q7) => {
        z1 = true;
        const q8 = new yR(q6, q7, yU, yQ, q2, q1, q0);
        q8.start();
      });
    }
  }
  function yR(yr, ym, yU, yQ, q0, q1, q2) {
    let q3 = +yQ[0] == 0;
    let q4 = yU.battle;
    let q5 = yU.winrate / 100;
    let q6 = q0 == "titan";
    let q7 = q1;
    let q8 = q2;
    let q9 = {};
    let qd = {};
    let qp = {};
    let qz = 0;
    let ql = 3;
    let qv = [];
    let qb = [];
    let qY = {};
    const qq = {
      name: "brawl_questGetInfo",
      args: {},
      ident: "brawl_questGetInfo"
    };
    const qN = {
      name: "brawl_findEnemies",
      args: {},
      ident: "brawl_findEnemies"
    };
    const qW = {
      name: "brawl_questFarm",
      args: {},
      ident: "brawl_questFarm"
    };
    const qn = {
      win: 0,
      loss: 0,
      count: 0
    };
    const qZ = {
      "3": 1,
      "7": 2,
      "12": 3
    };
    async function qf(qt) {
      return await vI.confirm(qt, {}, {
        buttons: [{
          msg: p3(dR.BTN_CONTINUE),
          result: false
        }, {
          msg: p3(dR.BTN_STOP),
          result: true
        }, {
          isClose: true,
          result: true
        }]
      });
    }
    this.start = async function () {
      const qt = zY + q7;
      const qA = zb + q7;
      if (!z8[qt]) {
        z8[qt] = await lj(qt);
      }
      const qi = z8[qt] ?? [];
      q9 = z8[qA] ?? {};
      q8 = q8;
      qz = q8.attempts;
      ql = Math.min(2, qz);
      if (q6) {
        for (let qk in qi) {
          qv[qk] = {
            heroes: qi[qk],
            favor: {}
          };
        }
      } else {
        qv = qi;
      }
      let qs;
      if (q3) {
        if (q6) {
          const qG = {
            heroes: q8.teams.brawl_titan,
            favor: {}
          };
          qs = qG;
        } else {
          let qF = q8.teams.brawl;
          let qL = q8.favor.brawl;
          let qO;
          if (qF) {
            qO = qF.find(qI => qI >= 6000);
            qF = qF.filter(qI => qI <= 5000);
          }
          const qR = {
            heroes: qF,
            favor: qL,
            pet: qO
          };
          qs = qR;
        }
        if (!qs.heroes) {
          qD(p3(dR.LAST_TEAM_UNKNOWN));
          return;
        }
        qv = [qs];
      }
      qv = qv.filter(qI => qI.heroes.includes(q7));
      for (let qI = qv.length - 1; qI >= 0; qI--) {
        qs = qv[qI];
        qs.attackers = qj(qs.heroes, qs.favor, qs.pet);
        qb.push(qs);
      }
      if (qb.length < 10 && !q3) {
        if (qb.length == 0) {
          qD(p3(dR.EMPTY_TEAMS));
          return;
        } else if (await qf(p3(dR.FEW_TEAMS_WARNING, {
          count: qb.length
        }))) {
          qD(p3(dR.FEW_TEAMS));
          return;
        }
      }
      pX = false;
      while (z1) {
        const qK = q8.questInfo.stage;
        b3(p3(dR.STAGE) + " " + qZ[qK] + ": " + q8.questInfo.progress + "/" + qK + "<br>" + p3(dR.FIGHTS) + ": " + qn.count + "<br>" + p3(dR.WINS) + ": " + qn.win + "<br>" + p3(dR.LOSSES) + ": " + qn.loss + "<br>" + p3(dR.LIVES) + ": " + qz + "<br>" + p3(dR.STOP), 0, function () {
          z1 = false;
        });
        if (q8.questInfo.canFarm) {
          await qX();
        }
        if (q8.questInfo.stage == 12 && q8.questInfo.progress == 12) {
          if (await vI.confirm(p3(dR.DAILY_BRAWL_COMPLETE), {}, {
            buttons: [{
              msg: p3(dR.RELOAD_GAME),
              result: true
            }, {
              msg: p3(dR.BTN_STOP),
              result: false
            }, {
              isClose: true,
              result: true
            }]
          })) {
            location.reload();
          }
          qD(p3(dR.SUCCESS));
          return;
        }
        if (!q8.info.boughtEndlessLivesToday && qz <= ql) {
          if (!qz) {
            qD(p3(dR.DONT_HAVE_LIVES));
            return;
          }
          const qP = {
            attempts: qz
          };
          if (await qf(p3(dR.LOW_LIVE_WARNING, qP))) {
            qD(p3(dR.LOW_LIVE));
            return;
          }
          ql--;
        }
        const qJ = {
          winrate: -1
        };
        let qE = Object.values(q8.findEnemies);
        let qa = qJ;
        while (qa.winrate < q5 && z1) {
          let qT = qE.pop();
          if (qT) {
            let qe;
            let qx = q6 ? Object.keys(qT.heroes).join("_") : Object.values(qT.heroes).map(qU => qU.id + "." + (qU.favorPetId ?? 0)).join("_");
            let qr = q9[qx]?.winrate ?? 0;
            let qm = q9[qx]?.count ?? 0;
            if (qr >= q5 && qm >= q4) {
              b5("");
              qe = q9[qx];
            } else {
              qe = await qB(qT.heroes);
              if (z1) {
                let qU = q9[qx]?.args?.heroes ?? [];
                if (dm(qU, qe.args.heroes)) {
                  qe.winrate = (qe.winrate * qe.count + qr * qm) / (qe.count + qm);
                  qe.count += qm;
                }
                if (qe.winrate > 0 && qe.count > 0) {
                  qd[qx] = structuredClone(qe);
                }
                q9[qx] = qe;
              }
            }
            qe.args.userId = qT.userId;
            if (qe.winrate > qa.winrate) {
              qa = qe;
            }
          } else {
            break;
          }
        }
        if (!z1) {
          break;
        }
        if (qa.winrate < q5 && (await qf(p3(dR.LOW_WINRATE_WARNING, {
          winrate: (qa.winrate * 100).round(1)
        })))) {
          qD(p3(dR.LOW_WINRATE));
          return;
        }
        qp = qa.args;
        const qo = await qH();
        lU([qo[0].reward], qY);
        q8.questInfo = qo[1];
        q8.findEnemies = qo[2];
      }
      qD(p3(dR.BTN_CANCEL));
      return;
    };
    function qj(qt, qA, qi) {
      let qs;
      if (q6) {
        qs = Object.values(z3.titan).filter(qk => qt.includes(qk.id)).reduce((qk, qG) => ({
          ...qk,
          [qG.id]: qG
        }), {});
      } else {
        qs = vd(YU(qt, qA, qi));
      }
      return qs;
    }
    function qV(qt, qA) {
      let qi = Date.now();
      const qs = {
        battleConfig: q6 ? "titan_clan_pvp" : "clan_pvp"
      };
      return {
        attackers: qt,
        defenders: [qA],
        effects: qs,
        startTime: qi,
        seed: (qi / 1000).floor(0) + p1(0, 1000000000),
        type: q6 ? "brawl_titan" : "brawl",
        endTime: qi + p1(10, 100)
      };
    }
    async function qB(qt) {
      let qA = [];
      for (const qs in qb) {
        let qk = qb[qs];
        let qG = qk.heroes;
        let qF = qk.favor;
        let qL = qk.pet;
        let qO = qk.attackers;
        let qR = qV(qO, qt);
        let qI = l0(qR, q4);
        const qK = {
          battle: qR,
          count: qI,
          heroes: qG,
          favor: qF,
          pet: qL
        };
        qA.push(qK);
      }
      qA.sort((qJ, qE) => qJ.count - qE.count);
      let qi = await new Promise(qJ => {
        qw(q4, q5, qA, qJ);
      });
      if (q4 <= 0) {
        qi.winrate = 1;
      }
      return qi;
    }
    async function qw(qt, qA, qi, qs) {
      let qk = 0;
      const qG = {
        args: {},
        winrate: -1
      };
      let qF = qG;
      function qL() {
        const qI = {
          countBattle: qk,
          bestCoeff: qF.winrate * 100
        };
        console.log(p3(dR.BATTLE_PROGRESS, qI), qF.args);
        qs(qF);
      }
      async function qO(qI) {
        if (qI < qi.length && z1) {
          return new Promise(qK => {
            let qJ = new qR(qK);
            qJ.start(qI);
          });
        } else {
          qL();
        }
      }
      function qR(qI) {
        this.start = async function (qK) {
          let qJ = qi[qK++];
          let qE = 0;
          let qa = 0;
          let qo = 0.6;
          let qu = 1;
          let qP = 0.35 / ((qJ.count - 3) / qu).ceil(0);
          let qT = 0;
          if (qJ.battle.attackers) {
            while (qT < qJ.count) {
              const qe = await lh(qJ.battle, Math.min(qu, qJ.count - qT));
              for (let qx of qe) {
                qE += qx.result.win;
                qT++;
              }
              qa = qE / qT;
              if (qT > 2) {
                if (qa < qo * qA) {
                  break;
                }
                qo += qP;
              }
            }
          }
          qk += qT;
          if (qa > qF.winrate) {
            qF.winrate = qa;
            qF.count = qJ.count < qt ? 1000 : qJ.count;
            qF.args.heroes = qJ.heroes;
            qF.args.favor = qJ.favor;
            if (qJ.pet) {
              qF.args.pet = qJ.pet;
            }
          }
          if (qJ.count > 0) {
            b5(p3(dR.BRAWL_PRECALC_PROGRESS, {
              count: qK,
              countTeam: qi.length,
              bestWin: (qF.winrate * 100).round(1),
              lastWin: (qa * 100).round(1),
              countBattle: qk
            }));
          }
          setTimeout(qO, 10, qa >= qA ? 1000000000 : qK);
          qI();
        };
      }
      qO(0);
    }
    async function qX() {
      const qt = {
        calls: [qW]
      };
      const qA = await dd.Send(qt);
      lU(qA.results[0].result, qY);
    }
    async function qH() {
      qn.count++;
      const qt = await qM(qp);
      const qA = await lK(qt);
      console.log(qA.result);
      if (qA.result.win) {
        qn.win++;
      } else {
        qn.loss++;
        if (!q8.info.boughtEndlessLivesToday) {
          qz--;
        }
      }
      return await qS(qA);
    }
    async function qM(qt) {
      const qA = {
        name: "brawl_startBattle",
        args: qt,
        ident: "brawl_startBattle"
      };
      const qi = {
        calls: [qA]
      };
      const qs = await dd.Send(qi);
      return qs.results[0].result.response;
    }
    async function qS(qt) {
      qt.progress[0].attackers.input = ["auto", 0, 0, "auto", 0, 0];
      const qA = {
        result: qt.result,
        progress: qt.progress
      };
      const qi = {
        name: "brawl_endBattle",
        args: qA,
        ident: "brawl_endBattle"
      };
      const qs = [qi, qq, qN];
      const qk = {
        calls: qs
      };
      return await dd.Send(qk).then(qG => qG.results.map(qF => qF.result.response));
    }
    function qD(qt) {
      pX = true;
      z1 = false;
      b3(qt, 10000);
      console.log(qt);
      if (Object.keys(qY).length > 0) {
        dv.showLootboxReward(qY);
      }
      yr();
    }
  }
  async function yI() {
    let yr = ["offerGetAll"].map(q0 => ({
      name: q0,
      args: {},
      ident: q0
    }));
    let ym = await dd.Send({
      calls: yr
    });
    let yU = ym.results[0].result.response.find(q0 => q0.offerType == "bossEvent");
    let yQ = 0;
    yr = [];
    for (let q0 = 1; q0 < 10; q0++) {
      if (yU.progress.farmedChests.includes(q0)) {
        continue;
      }
      if (yU.progress.score < yU.reward[q0].score) {
        break;
      }
      const q1 = {
        rewardId: q0
      };
      const q2 = {
        name: "bossRatingEvent_getReward",
        args: q1,
        ident: "body_" + q0
      };
      yr.push(q2);
      yQ++;
    }
    if (yQ) {
      const q3 = {
        calls: yr
      };
      let q4 = await dd.Send(q3);
      console.log(q4);
      const q5 = {
        count: q4?.results?.length
      };
      b3("" + p3(dR.COLLECT_REWARDS, q5), 5000);
    }
    dv.refreshGame();
  }
  async function yK() {
    const yQ = await dd.Send({
      calls: [{
        name: "topGet",
        args: {
          type: "bossRatingTop",
          extraId: 0
        },
        ident: "body"
      }]
    }).then(qY => qY.results.map(qy => qy.result.response));
    if (!yQ || !yQ[0][0]) {
      b3(p3(dR.EVENT) + " " + p3(dR.NOT_AVAILABLE), 5000);
      return;
    }
    const q0 = yQ[0][0].userData.replayId;
    let q1 = ["battleGetReplay", "heroGetAll", "pet_getAll", "offerGetAll"].map(qY => ({
      name: qY,
      args: {},
      ident: qY
    }));
    const q2 = {
      id: q0
    };
    q1[0].args = q2;
    const q3 = {
      calls: q1
    };
    const q4 = await dd.Send(q3).then(qY => qY.results.map(qy => qy.result.response));
    const q5 = q4[3].find(qY => qY.offerType == "bossEvent");
    if (!q5) {
      b3(p3(dR.EVENT) + " " + p3(dR.NOT_AVAILABLE), 5000);
      return;
    }
    const q6 = q5.progress.usedHeroes;
    const q7 = Object.values(q4[0].replay.attackers);
    const q8 = Object.values(q4[1]).map(qY => qY.id);
    const q9 = Object.values(q4[2]).map(qY => qY.id);
    q1 = [];
    const qp = {
      heroes: [],
      favor: {}
    };
    for (let qY of q7) {
      if (qY.id >= 6000 && q9.includes(qY.id)) {
        qp.pet = qY.id;
        continue;
      }
      if (!q8.includes(qY.id) || q6.includes(qY.id)) {
        continue;
      }
      qp.heroes.push(qY.id);
      if (qY.favorPetId) {
        qp.favor[qY.id] = qY.favorPetId;
      }
    }
    if (qp.heroes.length) {
      const qy = {
        name: "bossRatingEvent_startBattle",
        args: qp,
        ident: "body_0"
      };
      q1.push(qy);
    }
    let qz = [];
    let ql = 1;
    while (heroId = q8.pop()) {
      if (qp.heroes.includes(heroId) || q6.includes(heroId)) {
        continue;
      }
      qz.push(heroId);
      if (qz.length == 5) {
        q1.push({
          name: "bossRatingEvent_startBattle",
          args: {
            heroes: [...qz],
            pet: q9[(Math.random() * q9.length).floor(0)]
          },
          ident: "body_" + ql
        });
        qz = [];
        ql++;
      }
    }
    if (!q1.length) {
      b3("Закончились герои", 5000);
      return;
    }
    const qv = {
      calls: q1
    };
    const qb = await dd.Send(qv);
    console.log(qb);
    await yI();
  }
  async function yJ() {
    const yU = await vI.confirm(p3(dR.RUN_ARCHDEMON_SOULS), {}, {
      buttons: [{
        msg: p3(dR.GET_250_POINT),
        title: p3(dR.GET_250_POINT_TITLE),
        result: 250
      }, {
        msg: p3(dR.GET_MAX_POINT),
        title: p3(dR.GET_MAX_POINT_TITLE),
        result: 10000
      }, {
        isClose: true,
        result: 0
      }],
      options: {
        inColumn: true
      }
    });
    if (yU == 0) {
      return;
    }
    let yQ = ["heroGetAll", "pet_getAll", "offerGetAll"].map(qp => ({
      name: qp,
      args: {},
      ident: qp
    }));
    let q0 = await dd.Send({
      calls: yQ
    });
    let q1 = q0.results[2].result.response.find(qp => qp.offerType == "bossEvent");
    if (!q1) {
      b3(p3(dR.EVENT) + " " + p3(dR.NOT_AVAILABLE), 5000);
      return;
    }
    let q2 = q1.progress.usedHeroes;
    let q3 = Object.values(q0.results[0].result.response);
    let q4 = q3.map(qp => qp.id).filter(qp => !q2.includes(qp));
    let q5 = Object.values(q0.results[1].result.response).map(qp => qp.id);
    let q6 = q2.length;
    let q7 = q3.length;
    let q8 = q1.progress.score;
    let q9 = q5.includes(6005) ? 6005 : q5[(Math.random() * q5.length).floor(0)];
    if (!q4.length) {
      b3(p3(dR.NO_HEROES), 5000);
      return;
    }
    for (const qp of q4) {
      const qz = {
        heroes: [qp],
        pet: q9
      };
      let ql = qz;
      for (let qc of q5) {
        if (dv.lib.pet[qc].favorHeroes.includes(qp)) {
          const qN = {
            [qp]: qc
          };
          ql.favor = qN;
          break;
        }
      }
      const qv = {
        name: "bossRatingEvent_startBattle",
        args: ql,
        ident: "body"
      };
      const qY = {
        calls: [qv, {
          name: "offerGetAll",
          args: {},
          ident: "offerGetAll"
        }]
      };
      const qy = await dd.Send(qY);
      if ("error" in qy) {
        if (await vI.confirm(p3(dR.ERROR_DURING_THE_BATTLE), {}, {
          buttons: [{
            msg: p3(dR.BTN_OK),
            result: false
          }, {
            msg: p3(dR.RELOAD_GAME),
            result: true
          }]
        })) {
          location.reload();
        }
        return;
      }
      q8 = qy.results[1].result.response.find(qC => qC.offerType == "bossEvent").progress.score;
      q6++;
      const qq = {
        score: q8,
        countUsed: q6,
        countHero: q7
      };
      b3(p3(dR.KILL_SOUL_EVENT, qq));
      if (q8 >= yU) {
        break;
      }
    }
    const qd = {
      score: q8,
      countUsed: q6,
      countHero: q7
    };
    b3(p3(dR.KILL_SOUL_EVENT, qd), 8000);
    yI();
  }
  async function yE(yr, ym, yU) {
    pI = true;
    if (!ym || !ym[0]) {
      ym = [0];
    }
    return new Promise(yQ => {
      const q0 = new yo(yQ, ym, yU);
      q0.start(yr);
    });
  }
  async function ya(yr) {
    let ym = [{
      name: "synchronization",
      label: p3(dR.SYNC),
      title: p3(dR.SYNC_DUNGEON),
      checked: true
    }];
    let yU = vo("dungeonChecked", {});
    let yQ = vo("dungeonInputs", {});
    let q0 = vo("dungeonMods", {});
    lY(ym, yU);
    if (yr != "fast") {
      if (!pI) {
        const q3 = {
          checkBoxes: ym,
          options: {
            inRow: true
          }
        };
        let q4 = await vI.confirm(p3(dR.SET_MODE_DUNGEON), {}, {
          buttons: [{
            msg: p3(dR.BTN_RUN),
            title: p3(dR.RUN_DUNGEON_TITLE),
            result: 1,
            inRow: true,
            selects: [{
              selected: q0[0] ?? 0,
              options: p3(dR.MODE_DUNGEON)
            }]
          }, {
            isClose: true,
            result: 0
          }]
        }, q3, {
          inputs: [{
            name: "titanit",
            title: p3(dR.COUNT_TITANITE),
            placeholder: p3(dR.COUNT_TITANITE_COMPACT),
            default: (yQ.titanit ?? 300).toString()
          }]
        });
        vI.getCheckBoxes().forEach(q5 => {
          yU[q5.name].checked = q5.checked;
        });
        vI.getInputs().forEach(q5 => {
          yQ[q5.name] = q5.value;
        });
        yQ.titanit = p0(yQ.titanit, 100000, 1, 300000);
        vu("dungeonChecked", yU);
        vu("dungeonInputs", yQ);
        if (q4?.id == 1) {
          for (let q5 = 0; q5 < q4.results.length; q5++) {
            q0[q5] = q4.results[q5];
          }
          vu("dungeonMods", q0);
          return yE(yQ.titanit, q0, yU);
        }
      } else {
        pK = true;
      }
    } else if (!pI) {
      return yE(yQ.titanit ?? 150, q0, yU);
    }
    return {};
  }
  function yo(yr, ym, yU) {
    let yQ = 0;
    let q0 = 0;
    let q1 = 300;
    let q2 = false;
    let q3 = new Date().getTime();
    let q4 = {};
    let q5;
    let q6;
    let q7 = {};
    let q8;
    let q9;
    let qd;
    let qp = +ym[0] < 1;
    let qz = +ym[0] < 2;
    let ql = false;
    let qv;
    let qb;
    let qY = {};
    async function qy(qa = false) {
      let qo = "";
      if (!qa) {
        qo += p3(dR.ACTIVATE_ACCESS) + " ";
        if (!z8.script.code(1)) {
          qo += dy + "\n" + p3(dR.FOR_MORE_TIT);
        } else if (!z8.script.code(2)) {
          qo += dq + "\n" + p3(dR.FOR_UNLIM_TIT);
        }
        qo += "\n" + p3(dR.SMART_SELECT);
      } else {
        qo += p3(dR.NO_CONNECT_SERVER);
      }
      return await vI.confirm(qo + "\n\n" + p3(dR.CONTINUE_WARN_DUNGEON), {}, {
        buttons: [{
          msg: p3(dR.BTN_CONTINUE),
          result: true
        }, {
          msg: p3(dR.BTN_STOP),
          result: false
        }, {
          isClose: true,
          result: false
        }]
      });
    }
    async function qq(qa, qo, qu) {
      let qT = await vI.confirm(p3(dR.SERVER_CONNECT_REPEAT), {}, {
        buttons: [{
          msg: p3(dR.BTN_REPEAT),
          result: true
        }, {
          msg: p3(dR.BTN_STOP),
          result: false
        }, {
          isClose: true,
          result: false
        }]
      });
      if (qT) {
        let qx = await lV(qa, qo, qu);
        if (qx.error) {
          return await qq(qa, qo, qu);
        } else {
          return qx;
        }
      }
      return {
        stop: true
      };
    }
    function qc() {
      let qa = yQ - q0;
      let qo = ((new Date().getTime() - q3) / 1000).round(0);
      console.log(q4);
      console.log(p3(dR.DUNGEON_LOG_HARVEST), qa);
      console.log(p3(dR.DUNGEON_LOG_SPEED, {
        speed: (qa * 3600 / qo).round(0)
      }));
      console.log(p3(dR.DUNGEON_LOG_TIME, {
        hours: (qo / 3600).floor(0),
        minutes: (qo % 3600 / 60).floor(0),
        seconds: qo % 60
      }));
    }
    function qN(qa, qo) {
      if (!q2) {
        q2 = true;
        let qu = p3(dR.DUNGEON_STOP);
        let qP = "";
        switch (qa) {
          case "out":
            qP = "\n" + p3(dR.DUNGEON_END_UNAVAILABLE) + "!";
            break;
          case "stop":
            qP = "\n" + p3(dR.DUNGEON_END_STOP);
            break;
          case "complete":
            qu = p3(dR.DUNGEON_END);
            break;
          case "impossible":
            qP = "\n" + p3(dR.FAILED_TO_WIN);
            break;
          case "mayBeDead":
            qP = "\n" + p3(dR.DUNGEON_END_MAY_DEAD);
            break;
          case "lowHealth":
            qP = "\n" + p3(dR.DUNGEON_END_LOW_HEALTH);
            break;
          case "unHeal":
            qP = "\n" + p3(dR.DUNGEON_END_UNHEAL);
            break;
          case "restart":
            qP = "\n" + p3(dR.THROW_ERROR) + ", " + p3(dR.RERUN_DUNGEON) + "!";
            break;
          default:
            qP = "\n" + p3(dR.DUNGEON_END_UNKNOWN) + "!";
        }
        const qT = {
          dungeonActivity: yQ,
          maxDungeonActivity: q1
        };
        b5(qu + p3(dR.DUNGEON_TITANIT, qT) + qP);
        console.log(qo);
        qc();
        if (!pJ && yU?.synchronization?.checked) {
          dv.refreshGame();
        }
        yr({
          rewards: qY,
          show: !pJ && yU?.showRewards?.checked && Object.keys(qY).length > 0
        });
        pI = false;
        pK = false;
        pJ = false;
      }
    }
    async function qC(qa, qo) {
      qN(qa, qo);
      setTimeout(yE, 200, q1, ym, yU);
    }
    function qW(qa) {
      switch (qa) {
        case -1:
          qN("unHeal");
          break;
        case -2:
          qN("lowHealth");
          break;
        case -3:
          qN("mayBeDead");
          break;
        case -4:
          qN("impossible");
          break;
      }
    }
    async function qh() {
      qc();
      let qo = [{
        name: "dungeonSaveProgress",
        args: {},
        ident: "body"
      }];
      const qu = {
        calls: qo
      };
      qI(await dd.Send(qu));
    }
    function qn(qa, qo) {
      let qu = qa.slice(0, 3);
      if (qu == "401" || qu == "402") {
        return qo;
      } else {
        return qo / 2;
      }
    }
    function qg(qa, qo, qu) {
      let qP = qa == "4020" && qo == 1000 ? 0.1 : qo / 20000;
      return qn(qa, qu + qP);
    }
    function qZ(qa, qo, qu) {
      switch (qa) {
        case "4020":
          return qu > 0.25 || qo == 1000 && qu > 0.05;
          break;
        case "4010":
          return qu + qo / 2000 > 0.63;
          break;
        case "4000":
          return qu > 0.62 || qo < 1000 && (qu > 0.45 && qo >= 400 || qu > 0.3 && qo >= 670);
      }
      return true;
    }
    function qf(qa) {
      let qo = qa.battleData.attackers;
      let qu = qa.progress[0].attackers.heroes;
      let qP = (qa.result.stars - 3) * 100;
      let qT = 0;
      for (let qe in qu) {
        let qr = qu[qe] ?? {
          hp: 0,
          energy: 0
        };
        let qm = qo[qe].hp;
        let qU = qo[qe].strength ?? 0;
        let qQ = qr.hp / (qm ? qm + qU * 40 : -1);
        let c0 = qZ(qe, qr.energy, qQ) ? qg(qe, qr.energy, qQ) : -10;
        qP += c0;
      }
      for (let c1 in qo) {
        let c2 = qo[c1];
        let c3 = c2.state;
        qT += c3 ? qg(c1, c3.energy, c3.hp / c2.hp) : qn(c1, 1);
      }
      return qP - qT;
    }
    async function qj(qa) {
      if (qa.length == 0) {
        return [];
      }
      const qo = {
        calls: qa
      };
      let qu = await dd.Send(qo);
      if (qu?.error) {
        qC("restart");
        return [];
      } else {
        return qu.results.map(qP => qP.result.response);
      }
    }
    async function qV(qa, qo, qu) {
      let qP = [];
      let qT = [];
      let qe = [];
      if (qu.length == 0) {
        return;
      }
      for (let qU of qo) {
        for (let qQ of qU) {
          for (let c0 of qQ) {
            if (!pg[c0] && !qT.includes(c0)) {
              qT.push(c0);
            }
          }
        }
      }
      for (let c1 of qT) {
        qe.push(c1);
        if (qe.length == qu.length) {
          qP.push(qO(qa, qe, qP.length));
          qe = [];
        }
      }
      if (qP.length == 0 || qe.length > 0) {
        qP.push(qO(qa, qe.length > 0 ? qe : qu, qP.length));
      }
      const qx = await qj(qP);
      qb = qx[0];
      qb.progress = [{
        attackers: {
          input: ["auto", 0, 0, "auto", 0, 0]
        }
      }];
      for (let c2 of qx) {
        for (let c3 in c2.attackers) {
          pg[c3] = c2.attackers[c3];
        }
      }
    }
    async function qB(qa, qo, qu, qP) {
      const qT = [];
      for (let qr of qu) {
        const qm = structuredClone(qb);
        qm.attackers = {};
        for (let qU of qr) {
          qm.attackers[qU] = pg[qU];
        }
        for (let qQ = 0; qQ < qP; qQ++) {
          qT.push(qm);
        }
      }
      const qe = await lW(qT);
      const qx = {
        count: qT.length,
        recovery: -1000,
        favor: {},
        teamNum: qa,
        attackerType: qo
      };
      for (let c0 of qe) {
        let c1 = qf(c0);
        if (c1 > qx.recovery) {
          qx.recovery = c1;
          qx.attackers = c0.progress[0].attackers.heroes;
          qx.team = Object.keys(c0.battleData.attackers).map(c2 => parseInt(c2));
        }
      }
      return qx;
    }
    async function qw(qa) {
      let qo = -1000;
      let qu = 0;
      let qP;
      for (let qm = 0.02, qU = qa.recovery; qo < qU; qU -= qm, qu++) {
        qP = await qR(qa.teamNum, qa.attackerType, qa.team, qa.favor, qa.pet);
        qo = qf(qP);
      }
      const qT = qa.attackerType;
      const qe = qa.count;
      const qx = (qo > 0 ? "+" : "") + (qo * 100).round(0);
      const qr = {
        type: qT,
        recov: qx,
        countTest: qe,
        iterations: qu
      };
      console.log(p3(dR.DUNGEON_BATTLE_LOG, qr) + "\n", qP.progress[0].attackers.heroes);
      qK(qP);
    }
    function qX(qa) {
      if (qa.recovery < -270) {
        qa.failStatus = -4;
      } else if (qa.recovery < -70) {
        if (qz) {
          qa.failStatus = -3;
        }
      } else if (qa.recovery < -5) {
        if (qp) {
          qa.failStatus = -2;
        }
      } else if (qp && qa.attackerType == "neutral" && qa.recovery < -0.2) {
        qa.failStatus = -1;
      }
      return qa;
    }
    function qH(qa, qo) {
      let qu = qa;
      if (qa.recovery < qo.recovery) {
        qu = qo;
      }
      qu.count = qa.count + qo.count;
      return qu;
    }
    function qM(qa) {
      let qo = [[], []];
      if (qa.length > 2) {
        qo[0].push(qa);
      }
      if (qa.length == 4) {
        for (let qu = 0; qu < qa.length; qu++) {
          qo[0].push(qa.slice(0, qu).concat(qa.slice(qu + 1)));
        }
      }
      for (let qP = qa.length - 1; qP >= 0; qP--) {
        qo[1].push([qa[qP]]);
        for (let qT = qP - 1; qT >= 0; qT--) {
          qo[1].push([qa[qP], qa[qT]]);
        }
      }
      return qo;
    }
    async function qS(qa, qo, qu, qP) {
      if (ql) {
        if (qa == "neutral") {
          return [[qP.slice(0, 5)]];
        }
        return [[qo[qa]]];
      }
      if (qa == "neutral") {
        let qT = "dungeon_floor_" + qv;
        let qe = z8[qT];
        if (!qe) {
          qe = await lV(qo, qu, qP);
          if (qe.error) {
            await new Promise(qm => {
              let qU = 4;
              let qQ = 0;
              const c0 = setInterval(async () => {
                qe = await lV(qo, qu, qP);
                if (!qe.error || ++qQ == qU) {
                  clearInterval(c0);
                  qm();
                }
              }, p1(5000, 15000));
            });
          }
          if (qe.error) {
            qe = await qq(qo, qu, qP);
            if (qe.stop) {
              pK = true;
              return [];
            }
          }
        }
        z8[qT] = qe;
        let qx = qe.data;
        if (!qx) {
          z8[zB].dungeon = false;
          if (await qy()) {
            ql = true;
            qp = false;
            qz = false;
            qx = [[qP.slice(0, 5)]];
          } else {
            pK = true;
            return [];
          }
        }
        let qr = Object.values(qx).map(qm => qm.length).reduce((qm, qU) => qm + qU, 0);
        if (qr == 0) {
          qx = [[qP.slice(0, 5)]];
        }
        return qx;
      }
      return qM(qo[qa]);
    }
    function qD() {
      let qa = q7.neutral;
      let qo = [];
      for (let qu in qa) {
        let qP = qa[qu];
        let qT = q4[qP];
        let qe = qT ? qT.hp / qT.maxHp + qT.energy / 10000 : 1;
        if (qe > 0) {
          qo.push({
            id: qP,
            value: qe
          });
        }
      }
      return qo.sort((qx, qr) => qx.value - qr.value);
    }
    async function qt(qa, qo) {
      const qu = {
        recovery: -1000,
        count: 0
      };
      let qP = qu;
      let qT = await qS(qo, q7);
      await qV(qa, qT, q7[qo]);
      for (let qe in qT) {
        let qx = qT[qe];
        let qr = await qB(qa, qo, qx, qo == "water" ? 1 : 5);
        qP = qH(qP, qr);
        if (qP.recovery > -1) {
          break;
        }
        const qm = (qr.recovery > 0 ? "+" : "") + (qr.recovery * 100).round(0) + "%";
        const qU = {
          countTest: qr.count,
          attackerType: qo,
          recov: qm
        };
        console.log(p3(dR.DUNGEON_FIND_LOG, qU) + "\n", qr.attackers);
      }
      return qX(qP);
    }
    async function qA(qa, qo) {
      const qu = {
        recovery: -1000,
        count: 0
      };
      let qP = qD();
      let qT = qu;
      let qe = 0.6 - ((qP[0]?.value ?? 1) + (qP[1]?.value ?? 1)) / 3;
      let qx = qe / 20 + 0.01;
      let qr = await qS(qo, q7, qP.map(qm => qm.id), q5.map(qm => qm.id));
      await qV(qa, qr, Object.entries(q7).filter(qm => qm[0] != "neutral").reduce((qm, qU) => qm.concat(...qU[1]), []).slice(0, 5));
      for (let qm in qr) {
        let qU = qr[qm];
        let qQ = await qB(qa, qo, qU, 1);
        qT = qH(qT, qQ);
        if (qT.recovery > qe) {
          break;
        }
        const c0 = (qQ.recovery > 0 ? "+" : "") + (qQ.recovery * 100).round(0) + "% / " + (qe * 100).round(0) + "%";
        const c1 = {
          countTest: qQ.count,
          attackerType: qo,
          recov: c0
        };
        console.log(p3(dR.DUNGEON_FIND_LOG, c1) + "\n", qQ.attackers);
        qe -= qx;
      }
      return qX(qT);
    }
    async function qi(qa, qo) {
      if (pK) {
        qN("stop");
        return null;
      }
      switch (qa) {
        case "hero":
          const qu = {
            count: 0,
            recovery: -900,
            team: q8,
            favor: q9,
            pet: qd,
            teamNum: qo,
            attackerType: qa
          };
          return qu;
        case "neutral":
          return await qA(qo, qa);
        case "water":
        case "earth":
        case "fire":
          return await qt(qo, qa);
      }
    }
    function qs(qa) {
      qa = qa.toString();
      return !q4[qa]?.isDead && q6.includes(qa);
    }
    function qk() {
      q7.neutral = [4023, 4022, 4012, 4021, 4011, 4010, 4020].filter(qa => qs(qa));
      q7.water = [4000, 4001, 4002, 4003].filter(qa => qs(qa));
      q7.earth = [4020, 4022, 4021, 4023].filter(qa => qs(qa));
      q7.fire = [4010, 4011, 4012, 4013].filter(qa => qs(qa));
      q7.dark = [4030, 4031, 4032, 4033].filter(qa => qs(qa));
      q7.light = [4040, 4041, 4042, 4043].filter(qa => qs(qa));
      for (let qa in q4) {
        if (pg[qa]) {
          pg[qa].state = q4[qa];
        }
      }
    }
    function qG(qa) {
      for (let qo of ["hero", "neutral", "water", "earth", "fire"]) {
        for (let qu in qa) {
          if (qa[qu].attackerType == qo) {
            return +qu;
          }
        }
      }
    }
    async function qF(qa) {
      qv = qa.floorNumber;
      q4 = qa.states.titans;
      qk();
      q5 = q5.filter(qe => qs(qe.id)).sort((qe, qx) => qx.power - qe.power);
      if (!("floor" in qa) || qa.floor?.state == 2) {
        qh();
        return;
      }
      const qo = {
        dungeonActivity: yQ,
        maxDungeonActivity: q1
      };
      b5(p3(dR.DUNGEON) + p3(dR.DUNGEON_TITANIT, qo));
      if (yQ >= q1) {
        qN("complete");
        return;
      }
      let qu = qa.floor.userData;
      let qP = qG(qu);
      let qT = await qi(qu[qP].attackerType, qP);
      if (!qT) {
        return;
      }
      if (qu.length > 1) {
        if (qT.recovery < -0.1) {
          qP = (qP + 1) % 2;
          let qQ = await qi(qu[qP].attackerType, qP);
          if (!qQ) {
            return;
          }
          qT = qH(qT, qQ);
        }
        const qe = qu[0].attackerType;
        const qx = qu[1].attackerType;
        const qr = qT.failStatus ? p3(dR.NO_DONE) : qT.attackerType;
        const qm = qT.count;
        const qU = {
          first: qe,
          second: qx,
          choice: qr,
          count: qm
        };
        console.log(p3(dR.DUNGEON_CHOICE_LOG, qU));
      }
      if (qT.failStatus) {
        qW(qT.failStatus);
      } else {
        qw(qT);
      }
    }
    async function qL(qa) {
      let qo = qa.results;
      let qu = qo[0].result.response;
      if (!qu) {
        qN("out", qo);
        return;
      }
      console.log(p3(dR.START_DUNGEON), new Date());
      let qP = qo[1].result.response;
      let qT = qo[2].result.response;
      let qe = qo[3].result.response.stat?.todayDungeonActivity ?? 0;
      console.log("clanGetInfo: ", qo[3].result.response);
      yQ = qe;
      q0 = qe;
      pT = qo[4].result.response.consumable?.[81] ?? 0;
      q5 = Object.values(qo[5].result.response);
      q6 = Object.keys(qo[5].result.response);
      let qx = qP.dungeon_hero.filter(qr => qr >= 6000).pop();
      q8 = qP.dungeon_hero.filter(qr => qr < 6000);
      q9 = qT.dungeon_hero;
      if (qx) {
        qd = qx;
      }
      if (!z8[zB]?.dungeon) {
        if (await qy(!z8[zB])) {
          ql = true;
          qp = false;
          qz = false;
        } else {
          qN("stop");
          return;
        }
      }
      qF(qu);
    }
    this.start = async function (qa) {
      q1 = qa;
      const qo = ["dungeonGetInfo", "teamGetAll", "teamGetFavor", "clanGetInfo", "inventoryGet", "titanGetAll"].map(qP => ({
        name: qP,
        args: {},
        ident: qP
      }));
      const qu = {
        calls: qo
      };
      qL(await dd.Send(qu));
    };
    function qO(qa, qo, qu, qP = {}, qT) {
      const qe = {
        favor: qP,
        heroes: qo,
        teamNum: qa
      };
      let qx = qe;
      if (qT) {
        qx.pet = qT;
      }
      const qr = {
        name: "dungeonStartBattle",
        args: qx,
        ident: "dungeonStartBattle_" + qu
      };
      return qr;
    }
    async function qR(qa, qo, qu, qP = {}, qT) {
      if (qu.length == 0) {
        return null;
      }
      return new Promise(async function (qe, qx) {
        let qr = [qO(qa, qu, 0, qP, qT)];
        let qm = await dd.Send({
          calls: qr
        });
        const qU = {
          resolve: qe,
          teamNum: qa,
          attackerType: qo
        };
        qE(qm, qU);
      });
    }
    function qI(qa) {
      if (qa && !qa.error) {
        let qo = qa.results[0].result.response;
        lU([qo.reward], qY);
        if ("error" in qo) {
          qC("restart", qo);
          return;
        }
        let qu = qo.dungeon ?? qo;
        yQ += qo.reward.dungeonActivity ?? 0;
        if (yQ < 500) {
          by(yQ);
        }
        qF(qu);
      } else {
        qC("restart");
      }
    }
    async function qK(qa) {
      if (qa) {
        if (qa.result.win) {
          const qo = {
            type: qa.attackerType,
            result: qa.result,
            progress: qa.progress
          };
          const qu = qo;
          if (pT > 0) {
            qu.isRaid = true;
          } else {
            let qP = qa.battleTime[0];
            let qT = b8(qP);
            console.log(p3(dR.NEED_WAIT_LOG, {
              time: qP.round(1),
              timer: qT.round(1)
            }));
            const qe = {
              dungeonActivity: yQ,
              maxDungeonActivity: q1
            };
            await b9(qT, p3(dR.DUNGEON) + p3(dR.DUNGEON_TITANIT, qe), false);
          }
          if (pK) {
            qN("stop");
            return;
          } else {
            const qx = {
              name: "dungeonEndBattle",
              args: qu,
              ident: "dungeonEndBattle"
            };
            let qr = [qx];
            const qm = {
              calls: qr
            };
            qI(await dd.Send(qm));
          }
        } else {
          qN("impossible", qa);
          return;
        }
      }
    }
    async function qJ(qa, qo, qu) {
      qa.progress = [{
        attackers: {
          input: ["auto", 0, 0, "auto", 0, 0]
        }
      }];
      let qe = await lK(qa);
      qe.teamNum = qo;
      qe.attackerType = qu;
      return qe;
    }
    async function qE(qa, qo) {
      if (qa && !qa.error) {
        let qu = qa.results[0].result.response;
        qo.resolve(qJ(qu, qo.teamNum, qo.attackerType));
      } else {
        qC("restart");
      }
    }
  }
  function yu() {
    
    if (pE) {
      pa = true;
    } else {
      pE = true;
      pX = false;
      return new Promise((yr, ym) => {
        let yU = new yP(yr, ym);
        yU.start();
      });
    }
  }
  function yP(yr, ym) {
    let yU = false;
    let yQ;
    let q0 = [];
    let q1 = [];
    let q2 = [];
    let q3 = [];
    let q4 = 10000000000;
    let q5 = "";
    let q6 = "";
    let qd = {
      7: {
        text: p3(dR.WATER),
        info: "",
        pack: [],
        bestAttack: {
          score: 0,
          pack: ""
        }
      },
      8: {
        text: p3(dR.FIRE),
        info: "",
        pack: [],
        bestAttack: {
          score: 0,
          pack: ""
        }
      },
      9: {
        text: p3(dR.EARTH),
        info: "",
        pack: [],
        bestAttack: {
          score: 0,
          pack: ""
        }
      }
    };
    const qp = [{
      checked: true,
      name: "water",
      label: p3(dR.ELEMENTS_SELECT)[0],
      title: p3(dR.WATER_TITLE)
    }, {
      checked: true,
      name: "fire",
      label: p3(dR.ELEMENTS_SELECT)[1],
      title: p3(dR.FIRE_TITLE)
    }, {
      checked: true,
      name: "earth",
      label: p3(dR.ELEMENTS_SELECT)[2],
      title: p3(dR.EARTH_TITLE)
    }, {
      checked: true,
      name: "limitPoint",
      label: p3(dR.LIMIT_POINT),
      title: p3(dR.LIMIT_POINT_TITLE)
    }];
    this.start = async function () {
      if (!z6) {
        let qZ = [zN + dG.id, zN + "default"];
        let qf = await lf(qZ);
        z6 = qf[qZ[0]] ?? {};
        if (z6.length == 0) {
          z6 = {};
        }
        z7 = qf[qZ[1]] ?? {};
      }
      const qh = ["titanArenaGetStatus", "teamGetAll"].map(qj => ({
        name: qj,
        args: {},
        ident: qj
      }));
      const qn = {
        calls: qh
      };
      let qg = await dd.Send(qn).then(qj => qj.results.map(qV => qV.result.response));
      qz(qg);
    };
    async function qz(qh) {
      let qn = vo("attackLordChecked", {});
      let qg = vo("attackLordSelect", {});
      lY(qp, qn);
      const qV = {
        checkBoxes: qp,
        options: {
          inRow: true
        }
      };
      let qB = await vI.confirm(p3(dR.SELECT_LORD_MODE), {}, {
        buttons: [{
          isClose: true,
          result: 0
        }, {
          msg: p3(dR.BTN_ATTACK),
          title: p3(dR.BTN_ATTACK_TITLE),
          result: 1,
          inRow: true,
          selects: [{
            selected: qg[0] ?? 0,
            options: p3(dR.MODE_LORD_ATTACK)
          }]
        }, {
          msg: p3(dR.BTN_SETTING),
          title: p3(dR.BTN_SETTING_TITLE),
          result: 3
        }],
        options: {
          inColumn: true
        }
      }, qV);
      let qw = vI.getCheckBoxes();
      qw.forEach(qM => {
        qn[qM.name].checked = qM.checked;
      });
      vu("attackLordChecked", qn);
      const qX = qh[0];
      const qH = qh[1];
      if (qB == 3) {
        const qM = 86400;
        const qS = qM * 7;
        let qD = 0;
        let qt = 0;
        let qA = 3;
        if (qX.battleStartTs) {
          qD = ((qX.battleStartTs + 252000) / qS).round(0) % 3;
        } else {
          qD = ((qX.weekEndTs - 158400) / qS).round(0) % 3;
          qt = 4 - ((qX.weekEndTs - qX.nextDayTs) / qM).round(0);
        }
        const qi = p3(dR.WEEKS_SELECT);
        const qs = p3(dR.DAY_SELECT);
        const qk = p3(dR.ELEMENTS_SELECT);
        const qG = {
          selected: 3,
          options: qi
        };
        const qF = {
          selected: 5,
          options: qs
        };
        const qL = {
          selected: 3,
          options: qk
        };
        const qO = {
          selected: qD,
          options: qi
        };
        const qR = {
          selected: qt,
          options: qs
        };
        const qI = {
          selected: qA,
          options: qk
        };
        qB = await vI.confirm(p3(dR.SETTING_USER_REPLAY), {}, {
          buttons: [{
            msg: "                       " + p3(dR.SAVE_REPLAY) + "                       ",
            title: p3(dR.SAVE_REPLAY_TITLE),
            placeholder: "https://www.hero-wars.com?replay_id=1234567890123456789",
            isInput: true,
            default: ""
          }, {
            msg: p3(dR.UNLOAD_REPLAY),
            title: p3(dR.UNLOAD_REPLAY_TITLE),
            result: 12,
            inRow: true,
            selects: [qG, qF, qL]
          }, {
            msg: "  " + p3(dR.DELETE_REPLAY) + "  ",
            title: p3(dR.DELETE_REPLAY_TITLE),
            result: 11,
            inRow: true,
            selects: [qO, qR, qI]
          }, {
            isClose: true,
            result: 0
          }]
        });
        if (qB && qB != 0) {
          if (qB.results) {
            qD = parseInt(qB.results[0]);
            qt = parseInt(qB.results[1]);
            qA = parseInt(qB.results[2]);
            if (qB.id == 11) {
              if (qD == 3) {
                lJ(p3(dR.DELETE_ALL_CONFIRM), () => {
                  za();
                  b3(p3(dR.DELETE_ALL_COMPLETE), 8000);
                });
              } else if (qt == 5) {
                const qJ = {
                  week: qi[qD]
                };
                lJ(p3(dR.DELETE_WEEK_CONFIRM, qJ), () => {
                  zE(qD);
                  b3(p3(dR.DELETE_WEEK_COMPLETE), 8000);
                });
              } else if (qA == 3) {
                const qE = {
                  week: qi[qD],
                  dayOfWeek: qs[qt]
                };
                lJ(p3(dR.DELETE_DAY_CONFIRM, qE), () => {
                  zJ(qD, qt);
                  b3(p3(dR.DELETE_DAY_COMPLETE), 8000);
                });
              } else {
                zK(qD, qt, qA);
                b3(p3(dR.DELETE_ONE_COMPLETE), 8000);
              }
            } else if (qB.id == 12) {
              let qa = {};
              let qo = "";
              if (qD == 3) {
                qa = zO();
                qo += p3(dR.REPLAY_ALL_COPY);
              } else if (qt == 5) {
                qa = zL(qD);
                qo += p3(dR.REPLAY_WEEK_COPY);
              } else if (qA == 3) {
                qa = zF(qD, qt);
                qo += p3(dR.REPLAY_DAY_COPY);
              } else {
                qa = zG(qD, qt, qA);
                qo += p3(dR.REPLAY_ONE_COPY);
              }
              dQ(qa);
              console.log(qa);
              b3(qo + p3(dR.COPY_TO_BUFFER), 8000);
            }
          } else if (qB.includes("replay_id")) {
            let qu = await zM(qB);
            if (qu == null) {
              b3(p3(dR.INVALID_REPLAY), 8000);
            } else {
              b3(p3(dR.REPLAY_SAVED), 5000);
            }
          } else if (qB.includes("attackers")) {
            let qP = zS(qB);
            if (qP == null) {
              b3(p3(dR.INVALID_JSON), 8000);
            } else {
              b3(p3(dR.REPLAY_UPLOAD), 5000);
            }
          } else {
            b3(p3(dR.NOT_MATCH_EXAMPLE), 6000);
          }
        }
      } else if (qB.id == 1) {
        let qT = qB.results;
        qg = {};
        for (let qe = 0; qe < qT.length; qe++) {
          qg[qe] = qT[qe];
        }
        vu("attackLordSelect", qg);
        if (!qX.canUpdateDefenders) {
          console.log(p3(dR.LORD_ATTACK_RUN));
          q1 = ql(qX.rivals, qn);
          if (q1.length > 0) {
            let qx = qg[0];
            if (qx == "0") {
              qv(qn.limitPoint.checked);
            } else if (qx == "1") {
              await qb(qH.titan_arena);
            }
            yQ = q1[0];
            await qq();
            qc();
            return;
          } else {
            qC();
          }
        } else {
          b3(p3(dR.END_DEF_BEFORE_RUN), 7000);
        }
      }
      qy();
    }
    function ql(qh, qn) {
      let qg = [];
      for (let qZ in qh) {
        let qf = qh[qZ];
        let qj = parseInt(qf.power, 10);
        if (qj > 1000000) {
          let qV = qf.userId;
          let qB = qV.toString().slice(4, 5);
          const qw = {
            id: qV,
            pack: [],
            progress: [],
            element: qB,
            score: 0,
            bestScore: qf.attackScore,
            limitScore: 250,
            count: 0,
            allCount: 0,
            limitCount: 10000000000
          };
          let qX = qw;
          qd[qB].info = qY(qX);
          qd[qB].pack = Object.keys(qf.titans);
          if (qX.bestScore < qX.limitScore && (qn.water.checked && qB == "7" || qn.fire.checked && qB == "8" || qn.earth.checked && qB == "9")) {
            qg.push(qX);
          }
        }
      }
      return qg;
    }
    function qv(qh) {
      for (let qn of q1) {
        let qg = zH(qn.id);
        qn.pack = qg.pack;
        qn.progress = qg.progress;
        if (qh) {
          qn.limitScore = qg.score;
        }
      }
    }
    async function qb(qh) {
      for (let qf of q1) {
        qf.pack = qh;
        qf.score = 0;
        qf.count = 0;
        qd[qf.element].info = qY(qf);
        qf.limitCount = zU(qh, qd[qf.element].pack, q4);
      }
      let qn = [];
      let qg = dv.lib.hero;
      let qZ = true;
      for (let qj of qh) {
        let qV = qg[qj].battleOrder;
        let qB = dv.translate("LIB_HERO_NAME_" + qj);
        const qw = {
          order: qV,
          info: qB
        };
        qn.push(qw);
      }
      qn.sort((qX, qH) => qH.order - qX.order);
      q5 = "\n" + p3(dR.CURRENT_TEAM) + ":\n";
      q6 = qn.map(qX => qX.info).join(", ");
    }
    function qY(qh) {
      return " " + qd[qh.element].text + "  -  " + (qh.score + "/" + qh.limitScore + ",   ").fixed(11) + qh.allCount;
    }
    function qy() {
      if (q4 < 10000000000) {
        qC();
      }
      pX = true;
      pE = false;
      pa = false;
      yr();
    }
    async function qq() {
      const qh = {
        rivalId: yQ.id,
        titans: yQ.pack
      };
      const qn = {
        name: "titanArenaStartBattle",
        args: qh,
        ident: "body"
      };
      let qg = [qn];
      const qZ = {
        calls: qg
      };
      await lK((await dd.Send(qZ)).results[0].result.response.battle);
    }
    async function qc() {
      while (!pa) {
        qd[yQ.element].info = qY(yQ);
        qC();
        if (yU) {
          yU = false;
          for (let qh of q1) {
            q2.push(qh);
          }
          q1 = [];
        }
        if (q1.length > 0) {
          yQ = q1.shift();
          if (yQ.count < yQ.limitCount) {
            q3 = yQ.progress;
            const qn = {
              rivalId: yQ.id,
              titans: yQ.pack
            };
            const qg = {
              name: "titanArenaStartBattle",
              args: qn,
              ident: "body"
            };
            let qZ = [qg];
            let qf = (await dd.Send({
              calls: qZ
            })).results[0].result.response.battle;
            qf.progress = q3;
            yQ.count++;
            yQ.allCount++;
            let qj = await lK(qf);
            if (qj) {
              let qV = qj.progress;
              let qB = qj.result;
              let qw = qj.battleData.typeId;
              let qX = zu(qV, qj.battleData.defenders[0]);
              if (qX > yQ.score) {
                yQ.score = qX;
                if (qd[yQ.element].bestAttack.score < yQ.score) {
                  qd[yQ.element].bestAttack.score = yQ.score;
                  qd[yQ.element].bestAttack.pack = q6;
                }
              }
              if (qX > yQ.bestScore) {
                const qH = {
                  progress: qV,
                  result: qB,
                  rivalId: qw
                };
                const qM = {
                  name: "titanArenaEndBattle",
                  args: qH,
                  ident: "body"
                };
                let qS = [qM];
                let qD = await dd.Send({
                  calls: qS
                });
                if (qD) {
                  let qt = qD.results[0].result.response.attackScore;
                  yQ.bestScore = qt;
                  if (qt < yQ.limitScore) {
                    q1.push(yQ);
                    qW(p3(dR.LORD_BATTLE_LOG));
                  } else {
                    qW(p3(dR.LORD_WIN_LOG));
                  }
                  continue;
                } else {
                  qW(p3(dR.LORD_ERROR_BATTLE_LOG));
                }
              } else if (qX >= yQ.limitScore) {
                qW(p3(dR.LORD_LIMIT_LOG));
                continue;
              }
            }
            q1.push(yQ);
          } else {
            q2.push(yQ);
          }
        } else if (q0.length > 0) {
          for (let qA of q2) {
            q1.push(qA);
          }
          q2 = [];
          await qb(q0.shift());
        } else {
          pa = true;
        }
      }
      qy();
    }
    function qN() {
      yU = true;
      b4();
    }
    function qC() {
      let qh = p3(dR.PROGRESS_LORD_ATTACK);
      for (let qn in qd) {
        qh += qd[qn].info + "\n";
      }
      b5(qh + q5 + q6, 0, qN);
    }
    function qW(qh) {
      console.log(qh + ": " + qY(yQ));
    }
  }
  async function yT(yr, ym) {
    const yU = await lh(yr, ym);
    return yU.map(yQ => zP(yQ.progress, yQ.battleData.attackers));
  }
  async function ye() {
    
    if (!po) {
      let yr = vo("defLordInputs", {});
      let yQ = await vI.confirm(p3(dR.SET_PARAMS), {}, {
        buttons: [{
          msg: p3(dR.BTN_RUN),
          title: p3(dR.RUN_DEF_TITLE),
          result: 1
        }, {
          isClose: true,
          result: 0
        }]
      }, {
        checkBoxes: []
      }, {
        inputs: [{
          name: "count",
          title: p3(dR.COUNT_TEST_BATTLE),
          placeholder: p3(dR.COUNT_BATTLE),
          default: (yr.count ?? 20).toString()
        }, {
          name: "min",
          title: p3(dR.MIN_POWER),
          placeholder: p3(dR.MIN_POWER_COMPACT),
          default: (yr.min ?? 600).toString()
        }, {
          name: "max",
          title: p3(dR.MAX_POWER),
          placeholder: p3(dR.MAX_POWER_COMPACT),
          default: (yr.max ?? 1500).toString()
        }]
      });
      if (yQ == 0) {
        return;
      }
      let q0 = vI.getInputs();
      q0.forEach(q1 => {
        yr[q1.name] = q1.value;
      });
      yr.count = p0(yr.count, 20, 1, 10000);
      yr.min = p0(yr.min, 600, 1, 1500);
      yr.max = p0(yr.max, 1500, 100, 5000);
      vu("defLordInputs", yr);
      return new Promise((q1, q2) => {
        let q3 = new yx(q1, q2, yr.min, yr.max, yr.count);
        q3.start();
      });
    }
  }
  function yx(yr, ym, yU, yQ, q0) {
    let q1 = [];
    let q2 = [];
    let q3 = [];
    let q4 = q0;
    let q5 = yU;
    let q6 = yQ;
    let q7 = "";
    let q8 = 0;
    let q9 = 0;
    let qd = 0;
    let qp = 10000000000;
    let qz = 0;
    let ql = 1;
    this.start = async function () {
      if (pQ.status == "battle") {
        po = true;
        qv(pQ.rivals);
        q1 = pQ.defenders;
        const qc = {
          tier: pQ.tier,
          countRival: q2.length,
          countBattle: q4
        };
        q7 += p3(dR.PROGRESS_LORD_DEF, qc) + "Min  Avr   Max  Win\n";
        b3(q7);
        setTimeout(qy, 0, 0);
      }
    };
    function qv(qc) {
      q5 *= 1000;
      q6 *= 1000;
      qc = Object.values(qc);
      let qN = 0;
      qc.sort((qC, qW) => qC.power - qW.power);
      for (let qC in qc) {
        let qW = qc[qC];
        let qh = parseInt(qW.power, 10);
        if (q5 <= qh && qh <= q6) {
          let qn = qW.titans;
          for (let qg in qn) {
            qn[qg].state = undefined;
          }
          q2.push(qn);
          qN++;
          q3.push({
            num: qN,
            power: (qh / 1000).floor(0)
          });
        }
      }
    }
    function qb(qc, qN) {
      let qC = 0;
      let qW = 50;
      let qh = 0;
      let qn = 0;
      let qg = qc.length;
      for (let qM of qc) {
        if (qM > qh) {
          qh = qM;
        }
        if (qM < qW) {
          qW = qM;
        } else if (qM == 50) {
          qC++;
        }
        qn += qM;
      }
      let qZ = qn / qg;
      let qf = qC / qg;
      let qj = {};
      qd += qZ;
      q8 += qW;
      q9 += qh;
      qz += qf / q2.length;
      if (qf < qp) {
        qp = qf;
      }
      ql *= qf;
      const qV = qN.num + (" -  " + qN.power + "к:  ").fixed(12);
      const qB = (qW + ", ").fixed(5);
      const qw = (qZ.toFixed(1) + ", ").fixed(6).replace(".0,", ",   ");
      const qX = (qh + ", ").fixed(5);
      const qH = ((qf * 100).toFixed(1) + "%").fixed(8).replace(".0%", "%");
      return qV + qB + qw + qX + qH + "\n";
    }
    function qY() {
      let qc = 0;
      let qN = 0;
      let qC = 0;
      if (qp < 1000000000) {
        qc = qz * 100;
        qN = qp * 100;
        qC = ql * 100;
      }
      let qW = q2.length * 50;
      let qh = "/  " + qW + "  (-";
      let qn = "),\n";
      let qg = p3(dR.FINAL_STATS);
      q7 += "\n" + qg + "\nMin:   " + (q8 + " ").fixed(5) + qh + (qW - q8) + qn + "Avr:   " + qd.toFixed(1).fixed(5).replace(".0", "   ") + qh + (qW - qd).round(1) + qn + "Max:  " + (q9 + " ").fixed(5) + qh + (qW - q9) + qn + "Win:  " + qc.round(1) + "%,  bad - " + qN.round(1) + "%,  all - " + qC.round(1) + "%";
      b3(q7);
      yr();
    }
    async function qy(qc) {
      return new Promise((qN, qC) => {
        let qW = new qq(qN, qC);
        qW.start(qc);
      });
    }
    function qq(qc, qN) {
      this.start = async function (qC) {
        if (qC < q2.length) {
          let qW = zx(q2[qC], q1);
          let qh = await yT(qW, q4);
          q7 += qb(qh, q3[qC]);
          b3(q7);
          setTimeout(qy, 0, qC + 1);
        } else {
          qY();
          po = false;
        }
        qc();
      };
    }
  }
})();
