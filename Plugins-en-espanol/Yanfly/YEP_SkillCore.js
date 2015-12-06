//=============================================================================
// Yanfly Engine Plugins - Skill Core
// YEP_SkillCore.js
// Traducción al español : Rekiem
//=============================================================================

var Imported = Imported || {};
Imported.YEP_SkillCore = true;

var Yanfly = Yanfly || {};
Yanfly.Skill = Yanfly.Skill || {};

//=============================================================================
/*:
 * @plugindesc v1.06 Las habilidades ahora dan más funciones y la
 * capacidad de exigir diferentes tipos de costos.
 * @author Yanfly Engine Plugins (Es)
 *
 * @param ---General---
 * @default
 *
 * @param Cost Padding
 * @desc Si una habilidad tiene costos múltiples, esta es la 
 * cantidad de pixels usados como padding entre los costos.
 * @default 4
 *
 * @param Command Alignment
 * @desc Ajusta la alineación de texto de la ventana de tipo de 
 * habilidad. left(Izquierda)  center(Centro)  right(Derecha)
 * @default center
 *
 * @param Window Columns
 * @desc Elija el número de columnas que se utilizara para la  
 * ventana de habilidades.  Por defecto: 2
 * @default 2
 *
 * @param ---HP Costs(Costo de HP)---
 * @default
 *
 * @param HP Format
 * @desc Ajusta la forma en que el costo de HP aparece en la  
 * ventana de lista de habilidades.   %1 - Costo     %2 - HP
 * @default %1%2
 *
 * @param HP Font Size
 * @desc Ajusta el tamaño de la fuente usada para mostrar el HP.
 * Por defecto: 28
 * @default 20
 *
 * @param HP Text Color
 * @desc Ajusta el color del texto utilizado en la skin de 
 * Ventana para HP.  Por defecto: 21
 * @default 18
 *
 * @param HP Icon
 * @desc Elija cual icono utilizar para representar los costos 
 * de HP.  Use 0 si usted no desea usar un icono.
 * @default 162
 *
 * @param ---MP Costs(Costo de MP)---
 * @default
 *
 * @param MP Format
 * @desc Ajusta la forma en que el costo de MP aparece en la 
 * ventana de lista. de habilidades.  %1 - Costo     %2 - MP
 * @default %1%2
 *
 * @param MP Font Size
 * @desc Ajusta el tamaño de la fuente usada para mostrar el MP.
 * Por defecto: 28
 * @default 20
 *
 * @param MP Text Color
 * @desc Ajusta el color del texto utilizado en la skin de 
 * Ventana para MP.  Por defecto: 23
 * @default 23
 *
 * @param MP Icon
 * @desc Elija cual icono utilizar para representar los costos 
 * de MP.  Use 0 si usted no desea usar un icono.
 * @default 165
 *
 * @param ---TP Costs(Costo de TP)---
 * @default
 *
 * @param TP Format
 * @desc Ajusta la forma que el costo de TP aparece en la 
 * ventana de lista.  de habilidades.  %1 - Costo     %2 - TP
 * @default %1%2
 *
 * @param TP Font Size
 * @desc Ajusta el tamaño de la fuente usado para mostrar el TP.
 * Por defecto: 28
 * @default 20
 *
 * @param TP Text Color
 * @desc Ajusta el color del texto utilizado en la skin de 
 * Ventana para TP.  Por defecto: 29
 * @default 29
 *
 * @param TP Icon
 * @desc Elija cual icono utilizar para representar los costos 
 * de TP.  Use 0 si usted no desea usar un icono.
 * @default 164
 *
 * @help
 * ============================================================================
 * Introducción
 * ============================================================================
 *
 * Habilidades en RPG's constan de tres componentes principales: Costos, Daño,
 * y efectos. Aunque no todos los componentes son requeridos para una 
 * habilidad, ellos ciertamente contribuyen para una gran parte de él.
 * El daño será manejado por otro plugin, más este plugin proporcionara el
 * manejo del costo de habilidades y efectos de habilidades.
 *
 * Este plugin también incluye la capacidad para que el combatientes cambie sus
 * indicadores de HP, MP, y/o TP para algo diferente si esto ajusta en el 
 * personaje mejor (por ejemplo, algunas clases no usan MP y/ TP)
 *
 * ============================================================================
 * Notetags - Etiquetas
 * ============================================================================
 *
 * Estas etiquetas pueden ajustar tanto los costos de habilidades o efectos de
 * habilidades especiales.
 *
 * Etiqueta de Habilidad:
 *   <HP Cost: x>
 *   Cambia la habilidad para tener X como su costo de HP. El editor de RPG
 *   Maker MV carece de funciones de costo de HP, así que esto permitirá a las
 *   habilidades a usar HP como su costo
 *
 *   <HP Cost: x%>
 *   Cambia la habilidad a costar un porcentaje del valor de MaxHP del
 *   personaje.
 *
 *   <MP Cost: x>
 *   Cambia la habilidad para tener X como su costo de MP.
 *   Esto ayuda a eludir el límite del banco de datos de 9999.
 *
 *   <MP Cost: x%>
 *   Cambia la habilidad a costar un porcentaje del valor de MaxMP del.
 *   personaje.
 *
 *   <TP Cost: x>
 *   Cambia la habilidad para tener X como su costo de TP.
 *   Esto ayuda a eludir el límite del banco de datos de 99.
 *
 *   <TP Cost: x%>
 *   Cambia la habilidad a costar un porcentaje del valor de MaxTP del
 *   personaje. Aunque el MaxTP por defecto es 100, esta etiqueta será útil 
 *   para cualquier plugin que vaya alterar el valor de MaxTP de un personaje.
 *
 *   <Hide in Battle>
 *   Esto ocultara y desactivara la habilidad durante la batalla.
 *
 *   <Hide in Field>
 *   Esto ocultara y desactivara la habilidad fuera de la batalla.
 *
 *   <Hide if Learned Skill: x>
 *   <Hide if Learned Skill: x, x, x>
 *   <Hide if Learned Skill: x to y>
 *   Oculta y desactiva esta habilidad si habilidad X se ha aprendido. Si se
 *   enumeran varias habilidades, la habilidad se ocultara y desactivara si
 *   alguna otra de las habilidades enumeradas ha sido aprendida. Esta no se
 *   aplica a las habilidad que se dan por rasgos.
 *
 * ============================================================================
 * Gauge Swapping - Cambio de Indicador
 * ============================================================================
 *
 * Este plugin también le permite cambiar los indicadores de HP, MP, y TP para
 * cualquier orden que usted desee asumiendo que todos los plugins que usted
 * usa tendrán el mismo orden de HP, MP, y TP y no pasa por encima del proceso
 * de diseño del indicador por defecto. Si usted usa cualquier extensión de
 * plugin, ellos también podrán ser cambiados.
 *
 * Nota: Si usted no tiene 'Display TP in Battle' marcado abajo del tab System
 * en el banco de datos, no se mostrara en la tercera ranura(slot).
 *
 * Notetag de Classe:
 *   <Swap Gauge x: y>
 *   Esto cambiara el indicador X (1, 2, o 3) para Y. Remplace Y con 'HP',
 *   'MP', o 'TP' para mostrar ese tipo de indicador en el slot de indicador.
 *   Si usted quiere que el slot no muestre nada, inserte 'Nothing' o 'Null'
 *   en lugar de Y en el notetag.
 *
 * Notetags de Arma,Armadura,y Estado:
 *   <Swap Gauge x: y>
 *   Personajes con equipo o estados que contengan este notetag o enemigos con
 *   estados que contengan este notetag van a mostrar aquellos indicadores
 *   intercambiados en lugar de las configuraciones por defecto o 
 *   configuraciones definidas por la Class o Enemy notetags.
 *
 *   Prioridad que acontece el siguiente orden:
 *     Armas, Armaduras, Estados, Classes, Enemigo
 *
 * ============================================================================
 * Lunatic Mode - Skill Costs (Modo Lunático - Costo de Habilidades)
 * ============================================================================
 *
 * Para usuarios que quieran más control sobre costos de habilidad y efectos de
 * habilidades, hay notetags que permiten que usted aplique código para los
 * costos y/o efectos de una habilidad, para efectos, esto también extiende el
 * el control de items también. 
 *
 *   <Custom HP Cost>       Ejemplo: <Custom HP Cost>
 *    Código                         cost += $gameVariables.value(1);
 *    Código                         </Custom HP Cost>
 *   </Custom HP Cost>
 *   Esto permite a las habilidades a tener un costo de HP personalizado basado
 *   del código. Para la pieza de código, 'cost' y una variable ya predefinida
 *   con el costo de HP y el costo de porcentaje de HP.
 *
 *   <Custom MP Cost>       Ejemplo: <Custom MP Cost>
 *    Código                         cost += $gameVariables.value(1);
 *    Código                         </Custom MP Cost>
 *   </Custom MP Cost>
 *   Esto permite a las habilidades a tener un costo de MP personalizado basado
 *   del código. Para la pieza de código, 'cost' y una variable ya predefinida
 *   con el costo de MP y el costo de porcentaje de MP.
 *
 *   <Custom TP Cost>       Ejemplo: <Custom TP Cost>
 *    Código                         cost += $gameVariables.value(1);
 *    Código                         </Custom TP Cost>
 *   </Custom TP Cost>
 *   Esto permite a las habilidades a tener un costo de TP personalizado basado
 *   del código. Para la pieza de código, 'cost' y una variable ya predefinida
 *   con el costo de TP y el costo de porcentaje de TP.
 *
 * ============================================================================
 * Lunatic Mode - Custom Show Requirements(Mostrar Requisitos Personalizados)
 * ============================================================================
 *
 * Para aquellos que quieran mostrar ciertas habilidades y desactivarlas bajo
 * cualquier condición personalizada usando sus conocimientos JavaScript, use 
 * los siguientes notetags.
 *
 * Notetag de Habilidades:
 *   <Custom Show Eval>
 *   if (user.level > 50) {
 *     visible = true;
 *   } else {
 *     visible = false;
 *   }
 *   </Custom Show Eval>
 *   Si visible se establece true, la habilidad es mostrada (no oculta) y
 *   habilitada si las otras condiciones fueran cumplidas. Si visible se
 *   establece false, la habilidad es deshabilitada y escondida de la lista.
 *
 * ============================================================================
 * Lunatic Mode - Requerimientos Personalizados y Ejecución
 * ============================================================================
 *
 * Para aquellos con un poco de experiencia en JavaScript, pueden usar los
 * siguientes notetags para restringir una habilidad y que tipo de código de
 * proceso al ejecutar dicha habilidad.
 *
 * Notetag de Habilidad:
 *
 *   <Custom Requirement>
 *    if ($gameParty.gold() > 1000) {
 *      value = true;
 *    } else {
 *      value = false;
 *    }
 *   </Custom Requirement>
 *   Si el valor se establece en true, la habilidad podrá ser usada si todos
 *   los otros requisitos son cumplidos. Si el valor es false, la habilidad no 
 *   podrá ser usada.
 *
 *   <Custom Execution>
 *    $gameParty.loseGold(1000);
 *   </Custom Execution>
 *   Esto ejecuta el código dentro de los notetags cuando se utiliza la 
 *   habilidad.
 *
 * ============================================================================
 * Lunatic Mode - Custom Cost Display(Exhibición de Costo Personalizado)
 * ============================================================================
 *
 * Para aquellos con un poco de experiencia en JavaScript, pueden adicionar
 * nuevas formas de exhibir el costo de habilidad.
 *
 * Notetags de Habilidad:
 *
 *   <Cost Display Eval>
 *    var variableId = 1;
 *    var value = 1000;
 *    $gameVariables.setValue(variableId, value);
 *   </Cost Display Eval>
 *   Este notetag ejecuta una eval antes de mostrar el costo de la habilidad.
 *   Esto es para usted establecer variables para el texto de exhibición de el
 *   costo de la habilidad.
 *
 *   <Custom Cost Display>
 *    \c[4]\v[1]\c[0] Gold
 *   </Custom Cost Display>
 *   Este es el texto personalizado que se muestra antes del resto de los
 *   costos de habilidad. Usted puede usar códigos de texto con este notetag.
 *
 * ============================================================================
 * Lunatic Mode - The Skill Phases (Las Fases de Habilidad)
 * ============================================================================
 *
 * Para esta habilidad, múltiples efectos son aplicados y en diferentes fases.
 * Las diversas fases son las siguientes:
 *
 *    Antes de Fase de Efecto (Influenciado por este plugin)
 *    si la habilidad acontece con éxito:
 *    - Fase de Efecto Pre-Daño (Influenciado por este plugin)
 *    - Fase de Daño
 *    - Fase de Efecto Post-Daño (Influenciado por este plugin)
 *    - Fase de Efecto de Seguimiento de Items
 *    Fase Después de Efecto (Influenciado por este plugin)
 *
 * Hay cuatro fases que pueden ser influenciadas por este plugin. Dos que no
 * importan si el efecto acontece con éxito, y otras dos que importan si el 
 * efecto acontece con éxito.
 *
 * Notetag de Habilidad y item:
 *   <Before Eval>    <Pre-Damage Eval>    <Post-Damage Eval>    <After Eval>
 *       Código            Código                Código             Código
 *       Código            Código                Código             Código
 *   </Before Eval>   </Pre-Damage Eval>   </Post-Damage Eval>   </After Eval>
 *   Si desea utilizar efectos personalizados para sus habilidad, puede
 *   insertar los respectivos notetags en la caja de habilidades (o items)
 *   notebox y este ejecutara el código que aparece dentro de los tags. sin 
 *   embargo, el uso de cualquier forma de comentario en ese tag bloqueara el 
 *   código que síguete.
 *   
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.06:
 * - Added <Hide in Battle> and <Hide in Field> notetags.
 *
 * Version 1.05:
 * - Added <Hide if Learned Skill: x> notetags.
 * - Added <Custom Show Eval> Lunatic Mode notetag.
 *
 * Version 1.04:
 * - Added four Lunatic Modes notetags: Custom Requirement, Custom Execution,
 * Cost Display Eval, Custom Cost Display.
 *
 * Version 1.03:
 * - Fixed a bug with the Lunatic Mode notetags not working.
 *
 * Version 1.02:
 * - Added 'Window Columns' parameter to let users adjust the number of columns
 * used for the skill window.
 *
 * Version 1.01:
 * - Fixed a mathematical error for skill cost padding.
 * - Added return for drawSkillCost to assist others scripters when making
 * compatibility notes.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_SkillCore');
Yanfly.Param = Yanfly.Param || {};
Yanfly.Icon = Yanfly.Icon || {};

Yanfly.Param.SCCCostPadding = Number(Yanfly.Parameters['Cost Padding']);
Yanfly.Param.SCCTextAlign = String(Yanfly.Parameters['Command Alignment']);
Yanfly.Param.SCCWindowCol = Number(Yanfly.Parameters['Window Columns']);
Yanfly.Param.SCCTpFormat = String(Yanfly.Parameters['TP Format']);
Yanfly.Param.SCCTpFontSize = Number(Yanfly.Parameters['TP Font Size']);
Yanfly.Param.SCCTpTextColor = Number(Yanfly.Parameters['TP Text Color']);
Yanfly.Icon.Tp = Number(Yanfly.Parameters['TP Icon']);
Yanfly.Param.SCCMpFormat = String(Yanfly.Parameters['MP Format']);
Yanfly.Param.SCCMpFontSize = Number(Yanfly.Parameters['MP Font Size']);
Yanfly.Param.SCCMpTextColor = Number(Yanfly.Parameters['MP Text Color']);
Yanfly.Icon.Mp = Number(Yanfly.Parameters['MP Icon']);
Yanfly.Param.SCCHpFormat = String(Yanfly.Parameters['HP Format']);
Yanfly.Param.SCCHpFontSize = Number(Yanfly.Parameters['HP Font Size']);
Yanfly.Param.SCCHpTextColor = Number(Yanfly.Parameters['HP Text Color']);
Yanfly.Icon.Hp = Number(Yanfly.Parameters['HP Icon']);

//=============================================================================
// DataManager
//=============================================================================

Yanfly.Skill.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!Yanfly.Skill.DataManager_isDatabaseLoaded.call(this)) return false;
    this.processSkillNotetags($dataSkills);
    this.processObjectNotetags($dataSkills);
    this.processObjectNotetags($dataItems);
    this.processGSCNotetags1($dataClasses);
    this.processGSCNotetags1($dataEnemies);
    this.processGSCNotetags2($dataWeapons);
    this.processGSCNotetags2($dataArmors);
    this.processGSCNotetags2($dataStates);
    return true;
};

DataManager.processSkillNotetags = function(group) {
  var note1 = /<(?:MP COST):[ ](\d+)>/i;
  var note2 = /<(?:MP COST):[ ](\d+)([%ï¼…])>/i;
  var note3 = /<(?:TP COST):[ ](\d+)>/i;
  var note4 = /<(?:TP COST):[ ](\d+)([%ï¼…])>/i;
  var note5 = /<(?:HP COST):[ ](\d+)>/i;
  var note6 = /<(?:HP COST):[ ](\d+)([%ï¼…])>/i;
  var note7a = /<(?:HIDE IF LEARNED SKILL):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note7b = /<(?:HIDE IF LEARNED SKILL):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
  var note8a = /<(?:HIDE IN BATTLE|hide during battle)>/i;
  var note8b = /<(?:HIDE IN FIELD|hide during field)>/i;
  var noteMpEval1 = /<(?:MP COST EVAL|custom mp cost)>/i;
  var noteMpEval2 = /<\/(?:MP COST EVAL|custom mp cost)>/i;
  var noteTpEval1 = /<(?:TP COST EVAL|custom tp cost)>/i;
  var noteTpEval2 = /<\/(?:TP COST EVAL|custom tp cost)>/i;
  var noteHpEval1 = /<(?:HP COST EVAL|custom hp cost)>/i;
  var noteHpEval2 = /<\/(?:HP COST EVAL|custom hp cost)>/i;
  var noteEvalReq1 = /<(?:EVAL REQUIREMENT|custom requirement)>/i;
  var noteEvalReq2 = /<\/(?:EVAL REQUIREMENT|custom requirement)>/i;
  var noteEvalExe1 = /<(?:EVAL EXECUTION|custom execution)>/i;
  var noteEvalExe2 = /<\/(?:EVAL EXECUTION|custom execution)>/i;
  var noteCostEval1 = /<(?:COST DISPLAY EVAL|display cost eval)>/i;
  var noteCostEval2 = /<\/(?:COST DISPLAY EVAL|display cost eval)>/i;
  var noteCostText1 = /<(?:CUSTOM COST DISPLAY|custom display cost)>/i;
  var noteCostText2 = /<\/(?:CUSTOM COST DISPLAY|custom display cost)>/i;
  var noteShowEval1 = /<(?:CUSTOM SHOW EVAL)>/i;
  var noteShowEval2 = /<\/(?:CUSTOM SHOW EVAL)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.hpCost = 0;
    obj.hpCostPer = 0.0;
    obj.mpCostPer = 0.0;
    obj.tpCostPer = 0.0;
    obj.hideInBattle = false;
    obj.hideInField = false;
    obj.hideIfLearnedSkill = [];
    var evalMode = 'none';
    obj.hpCostEval = '';
    obj.mpCostEval = '';
    obj.tpCostEval = '';
    obj.requireEval = '';
    obj.executeEval = '';
    obj.costdisplayEval = '';
    obj.costShowEval = '';
    obj.customCostText = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        obj.mpCost = parseInt(RegExp.$1);
      } else if (line.match(note2)) {
        obj.mpCostPer = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(note3)) {
        obj.tpCost = parseInt(RegExp.$1);
      } else if (line.match(note4)) {
        obj.tpCostPer = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(note5)) {
        obj.hpCost = parseInt(RegExp.$1);
      } else if (line.match(note6)) {
        obj.hpCostPer = parseFloat(RegExp.$1 * 0.01);
      } else if (line.match(note7a)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        obj.hideIfLearnedSkill = obj.hideIfLearnedSkill.concat(array);
      } else if (line.match(note7b)) {
        var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
        var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
          parseInt(RegExp.$2));
        obj.hideIfLearnedSkill = obj.hideIfLearnedSkill.concat(range);
      } else if (line.match(note8a)) {
        obj.hideInBattle = true;
      } else if (line.match(note8b)) {
        obj.hideInField = true;
      } else if (line.match(noteMpEval1)) {
        evalMode = 'mp';
      } else if (line.match(noteMpEval2)) {
        evalMode = 'none';
      } else if (line.match(noteTpEval1)) {
        evalMode = 'tp';
      } else if (line.match(noteTpEval2)) {
        evalMode = 'none';
      } else if (line.match(noteHpEval1)) {
        evalMode = 'hp';
      } else if (line.match(noteHpEval2)) {
        evalMode = 'none';
      } else if (line.match(noteEvalReq1)) {
        evalMode = 'custom requirement';
      } else if (line.match(noteEvalReq2)) {
        evalMode = 'none';
      } else if (line.match(noteEvalExe1)) {
        evalMode = 'custom execute';
      } else if (line.match(noteEvalExe2)) {
        evalMode = 'none';
      } else if (line.match(noteCostEval1)) {
        evalMode = 'display cost eval';
      } else if (line.match(noteCostEval2)) {
        evalMode = 'none';
      } else if (line.match(noteCostText1)) {
        evalMode = 'custom display cost';
      } else if (line.match(noteCostText2)) {
        evalMode = 'none';
      } else if (line.match(noteShowEval1)) {
        evalMode = 'custom show eval';
      } else if (line.match(noteShowEval2)) {
        evalMode = 'none';
      } else if (evalMode === 'mp') {
        obj.mpCostEval = obj.mpCostEval + line + '\n';
      } else if (evalMode === 'tp') {
        obj.tpCostEval = obj.tpCostEval + line + '\n';
      } else if (evalMode === 'hp') {
        obj.hpCostEval = obj.hpCostEval + line + '\n';
      } else if (evalMode === 'custom requirement') {
        obj.requireEval = obj.requireEval + line + '\n';
      } else if (evalMode === 'custom execute') {
        obj.executeEval = obj.executeEval + line + '\n';
      } else if (evalMode === 'display cost eval') {
        obj.costdisplayEval = obj.costdisplayEval + line + '\n';
      } else if (evalMode === 'custom display cost') {
        obj.customCostText = obj.customCostText + line;
      } else if (evalMode === 'custom show eval') {
        obj.costShowEval = obj.costShowEval + line + '\n';
      }
    }
  }
};

DataManager.processObjectNotetags = function(group) {
  var note1 = /<(?:BEFORE EVAL)>/i;
  var note2 = /<\/(?:BEFORE EVAL)>/i;
  var note3 = /<(?:PRE-DAMAGE EVAL)>/i;
  var note4 = /<\/(?:PRE-DAMAGE EVAL)>/i;
  var note5 = /<(?:POST-DAMAGE EVAL)>/i;
  var note6 = /<\/(?:POST-DAMAGE EVAL)>/i;
  var note7 = /<(?:AFTER EVAL)>/i;
  var note8 = /<\/(?:AFTER EVAL)>/i;
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    var customMode = 'none';
    obj.customBeforeEval = '';
    obj.customPreDamageEval = '';
    obj.customPostDamageEval = '';
    obj.customAfterEval = '';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(note1)) {
        customMode = 'before';
      } else if (line.match(note2)) {
        customMode = 'none';
      } else if (line.match(note3)) {
        customMode = 'pre-damage';
      } else if (line.match(note4)) {
        customMode = 'none';
      } else if (line.match(note5)) {
        customMode = 'post-damage';
      } else if (line.match(note6)) {
        customMode = 'none';
      } else if (line.match(note7)) {
        customMode = 'after';
      } else if (line.match(note8)) {
        customMode = 'none';
      } else if (customMode === 'before') {
        obj.customBeforeEval = obj.customBeforeEval + line + '\n';
      } else if (customMode === 'pre-damage') {
        obj.customPreDamageEval = obj.customPreDamageEval + line + '\n';
      } else if (customMode === 'post-damage') {
        obj.customPostDamageEval = obj.customPostDamageEval + line + '\n';
      } else if (customMode === 'after') {
        obj.customAfterEval = obj.customAfterEval + line + '\n';
      }
    }
  }
};

DataManager.processGSCNotetags1 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.gauge1 = 'HP';
    obj.gauge2 = 'MP';
    obj.gauge3 = 'TP';

    obj.gaugeIcon1 = 0;
    obj.gaugeIcon2 = 0;
    obj.gaugeIcon3 = 0;

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i)) {
        var gauge = parseInt(RegExp.$1);
        var text = String(RegExp.$2).toUpperCase();
        if (['HP', 'MP', 'TP', 'NOTHING', 'NULL'].contains(text)) {
          if (gauge === 1) obj.gauge1 = text;
          if (gauge === 2) obj.gauge2 = text;
          if (gauge === 3) obj.gauge3 = text;
        }
      }
    }
  }
};

DataManager.processGSCNotetags2 = function(group) {
  for (var n = 1; n < group.length; n++) {
    var obj = group[n];
    var notedata = obj.note.split(/[\r\n]+/);

    obj.gauge1 = 'UNDEFINED';
    obj.gauge2 = 'UNDEFINED';
    obj.gauge3 = 'UNDEFINED';

    obj.gaugeIcon1 = 'UNDEFINED';
    obj.gaugeIcon2 = 'UNDEFINED';
    obj.gaugeIcon3 = 'UNDEFINED';

    for (var i = 0; i < notedata.length; i++) {
      var line = notedata[i];
      if (line.match(/<(?:SWAP GAUGE|gauge)[ ](\d+):[ ](.*)>/i)) {
        var gauge = parseInt(RegExp.$1);
        var text = String(RegExp.$2).toUpperCase();
        if (['HP', 'MP', 'TP', 'NOTHING', 'NULL'].contains(text)) {
          if (gauge === 1) obj.gauge1 = text;
          if (gauge === 2) obj.gauge2 = text;
          if (gauge === 3) obj.gauge3 = text;
        }
      }
    }
  }
};

//=============================================================================
// Game_BattlerBase
//=============================================================================

Yanfly.Skill.Game_BattlerBase_mSC =
    Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    if (!Yanfly.Skill.Game_BattlerBase_mSC.call(this, skill)) return false;
    if (!this.noHiddenSkillConditionsMet(skill)) return false;
    return this.meetsSkillConditionsEval(skill);
};

Game_BattlerBase.prototype.noHiddenSkillConditionsMet = function(skill) {
    if (this.isEnemy()) return true;
    for (var i = 0; i < skill.hideIfLearnedSkill.length; ++i) {
      var skillId = skill.hideIfLearnedSkill[i];
      if (this.isLearnedSkill(skillId)) return false;
    }
    if (skill.hideInBattle && $gameParty.inBattle()) return false;
    if (skill.hideInField && !$gameParty.inBattle()) return false;
    if (!this.meetsCustomShowEval(skill)) return false;
    return true;
};

Game_BattlerBase.prototype.meetsCustomShowEval = function(skill) {
    if (skill.costShowEval === '') return true;
    var visible = true;
    var item = skill;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.costShowEval);
    return visible;
};

Game_BattlerBase.prototype.meetsSkillConditionsEval = function(skill) {
    if (skill.requireEval === '') return true;
    var value = true;
    var item = skill;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.requireEval);
    return value;
};

Game_BattlerBase.prototype.skillHpCost = function(skill) {
  var cost = skill.hpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  cost += this.mhp * skill.hpCostPer;
  eval(skill.hpCostEval);
  return Math.max(0, Math.floor(cost));
};

Game_BattlerBase.prototype.skillMpCost = function(skill) {
  var cost = skill.mpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  cost += this.mmp * skill.mpCostPer;
  eval(skill.mpCostEval);
  return Math.max(0, Math.floor(cost * this.mcr));
};

Game_BattlerBase.prototype.skillTpCost = function(skill) {
  var cost = skill.tpCost;
  var item = skill;
  var a = this;
  var user = this;
  var subject = this;
  var s = $gameSwitches._data;
  var v = $gameVariables._data;
  cost += this.maxTp() * skill.tpCostPer;
  eval(skill.tpCostEval);
  return Math.max(0, Math.floor(cost));
};

Yanfly.Skill.Game_BattlerBase_canPaySkillCost =
    Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    if (!this.canPaySkillHpCost(skill)) return false;
    return Yanfly.Skill.Game_BattlerBase_canPaySkillCost.call(this, skill);
};

Game_BattlerBase.prototype.canPaySkillHpCost = function(skill) {
    return this._hp > this.skillHpCost(skill);
};

Yanfly.Skill.Game_BattlerBase_paySkillCost =
    Game_BattlerBase.prototype.paySkillCost
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    Yanfly.Skill.Game_BattlerBase_paySkillCost.call(this, skill);
    this.paySkillHpCost(skill);
    this.paySkillEvalCost(skill);
};

Game_BattlerBase.prototype.paySkillHpCost = function(skill) {
    this._hp -= this.skillHpCost(skill);
};

Game_BattlerBase.prototype.paySkillEvalCost = function(skill) {
    if (skill.executeEval === '') return;
    var item = skill;
    var a = this;
    var user = this;
    var subject = this;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.executeEval);
};

Game_BattlerBase.prototype.gauge1 = function() {
    return 'HP';
};

Game_BattlerBase.prototype.gauge2 = function() {
    return 'MP';
};

Game_BattlerBase.prototype.gauge3 = function() {
    return 'TP';
};

Game_BattlerBase.prototype.gaugeIcon1 = function() {
    return 0;
};

Game_BattlerBase.prototype.gaugeIcon2 = function() {
    return 0;
};

Game_BattlerBase.prototype.gaugeIcon3 = function() {
    return 0;
};

//=============================================================================
// Game_Actor
//=============================================================================

Game_Actor.prototype.gauge1 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gauge1 === 'UNDEFINED') continue;
      return equip.gauge1;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge1 === 'UNDEFINED') continue;
      return state.gauge1;
    }
    return this.currentClass().gauge1;
};

Game_Actor.prototype.gauge2 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gauge2 === 'UNDEFINED') continue;
      return equip.gauge2;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge2 === 'UNDEFINED') continue;
      return state.gauge2;
    }
    return this.currentClass().gauge2;
};

Game_Actor.prototype.gauge3 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gauge3 === 'UNDEFINED') continue;
      return equip.gauge3;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge3 === 'UNDEFINED') continue;
      return state.gauge3;
    }
    return this.currentClass().gauge3;
};

Game_Actor.prototype.gaugeIcon1 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gaugeIcon1 === 'UNDEFINED') continue;
      return equip.gaugeIcon1;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon1 === 'UNDEFINED') continue;
      return state.gaugeIcon1;
    }
    return this.currentClass().gaugeIcon1;
};

Game_Actor.prototype.gaugeIcon2 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gaugeIcon2 === 'UNDEFINED') continue;
      return equip.gaugeIcon2;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon2 === 'UNDEFINED') continue;
      return state.gaugeIcon2;
    }
    return this.currentClass().gaugeIcon2;
};

Game_Actor.prototype.gaugeIcon3 = function() {
    for (var i = 0; i < this.equips().length; ++i) {
      var equip = this.equips()[i];
      if (!equip) continue;
      if (equip.gaugeIcon3 === 'UNDEFINED') continue;
      return equip.gaugeIcon3;
    }
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon3 === 'UNDEFINED') continue;
      return state.gaugeIcon3;
    }
    return this.currentClass().gaugeIcon3;
};

//=============================================================================
// Game_Enemy
//=============================================================================

Game_Enemy.prototype.gauge1 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge1 === 'UNDEFINED') continue;
      return state.gauge1;
    }
    return this.enemy().gauge1;
};

Game_Enemy.prototype.gauge2 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge2 === 'UNDEFINED') continue;
      return state.gauge2;
    }
    return this.enemy().gauge2;
};

Game_Enemy.prototype.gauge3 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gauge1 === 'UNDEFINED') continue;
      return state.gauge1;
    }
    return this.enemy().gauge3;
};

Game_Enemy.prototype.gaugeIcon1 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon1 === 'UNDEFINED') continue;
      return state.gaugeIcon1;
    }
    return this.enemy().gaugeIcon1;
};

Game_Enemy.prototype.gaugeIcon2 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon2 === 'UNDEFINED') continue;
      return state.gaugeIcon2;
    }
    return this.enemy().gaugeIcon2;
};

Game_Enemy.prototype.gaugeIcon3 = function() {
    for (var i = 0; i < this.states().length; ++i) {
      var state = this.states()[i];
      if (!state) continue;
      if (state.gaugeIcon3 === 'UNDEFINED') continue;
      return state.gaugeIcon3;
    }
    return this.enemy().gaugeIcon3;
};

//=============================================================================
// Game_Action
//=============================================================================

Yanfly.Skill.Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    this.applyBeforeEffect(target);
    this.applyBeforeEval(target);
    Yanfly.Skill.Game_Action_apply.call(this, target);
    this.applyAfterEffect(target);
    this.applyAfterEval(target);
};

Game_Action.prototype.applyBeforeEffect = function(target) {
};

Game_Action.prototype.applyBeforeEval = function(target) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(item.customBeforeEval);
};

Game_Action.prototype.applyAfterEffect = function(target) {
};

Game_Action.prototype.applyAfterEval = function(target) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(item.customAfterEval);
};

Yanfly.Skill.Game_Action_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    this.applyPreDamageEffect(target, value);
    this.applyPreDamageEval(target, value);
    Yanfly.Skill.Game_Action_executeDamage.call(this, target, value);
    this.applyPostDamageEffect(target, value);
    this.applyPostDamageEval(target, value);
};

Game_Action.prototype.applyPreDamageEffect = function(target, value) {
};

Game_Action.prototype.applyPreDamageEval = function(target, value) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(item.customPreDamageEval);
};

Game_Action.prototype.applyPostDamageEffect = function(target, value) {
};

Game_Action.prototype.applyPostDamageEval = function(target, value) {
    var item = this.item();
    var a = this.subject();
    var b = target;
    var user = this.subject();
    var subject = this.subject();
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(item.customPostDamageEval);
};

//=============================================================================
// Window_Base
//=============================================================================

Yanfly.Skill.Window_Base_drawActorHp = Window_Base.prototype.drawActorHp;
Window_Base.prototype.drawActorHp = function(actor, x, y, width) {
    if (actor.gauge1() === 'HP') {
      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge1() === 'MP') {
      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge1() === 'TP') {
      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

Yanfly.Skill.Window_Base_drawActorMp = Window_Base.prototype.drawActorMp;
Window_Base.prototype.drawActorMp = function(actor, x, y, width) {
    if (actor.gauge2() === 'HP') {
      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge2() === 'MP') {
      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge2() === 'TP') {
      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

Yanfly.Skill.Window_Base_drawActorTp = Window_Base.prototype.drawActorTp;
Window_Base.prototype.drawActorTp = function(actor, x, y, width) {
    if (actor.gauge3() === 'HP') {
      Yanfly.Skill.Window_Base_drawActorHp.call(this, actor, x, y, width);
    } else if (actor.gauge3() === 'MP') {
      Yanfly.Skill.Window_Base_drawActorMp.call(this, actor, x, y, width);
    } else if (actor.gauge3() === 'TP') {
      Yanfly.Skill.Window_Base_drawActorTp.call(this, actor, x, y, width);
    }
};

//=============================================================================
// Window_SkillList
//=============================================================================

Window_SkillType.prototype.itemTextAlign = function() {
    return Yanfly.Param.SCCTextAlign;
};

//=============================================================================
// Window_SkillList
//=============================================================================

Window_SkillList.prototype.maxCols = function() {
    return Yanfly.Param.SCCWindowCol;
};

Yanfly.Skill.Window_SkillList_includes =
    Window_SkillList.prototype.includes;
Window_SkillList.prototype.includes = function(item) {
    if (this._actor) {
      if (!this._actor.noHiddenSkillConditionsMet(item)) return false;
    }
    return Yanfly.Skill.Window_SkillList_includes.call(this, item);
};

Window_SkillList.prototype.drawSkillCost = function(skill, wx, wy, width) {
    var dw = width;
    dw = this.drawTpCost(skill, wx, wy, dw);
    dw = this.drawMpCost(skill, wx, wy, dw);
    dw = this.drawHpCost(skill, wx, wy, dw);
    dw = this.drawCustomDisplayCost(skill, wx, wy, dw);
    dw = this.drawOtherCost(skill, wx, wy, dw);
    return dw;
};

Window_SkillList.prototype.drawTpCost = function(skill, wx, wy, dw) {
    if (this._actor.skillTpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Tp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Tp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCTpTextColor));
    var fmt = Yanfly.Param.SCCTpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillTpCost(skill)),
      TextManager.tpA);
    this.contents.fontSize = Yanfly.Param.SCCTpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawMpCost = function(skill, wx, wy, dw) {
    if (this._actor.skillMpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Mp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Mp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCMpTextColor));
    var fmt = Yanfly.Param.SCCMpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillMpCost(skill)),
      TextManager.mpA);
    this.contents.fontSize = Yanfly.Param.SCCMpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.drawHpCost = function(skill, wx, wy, dw) {
    if (this._actor.skillHpCost(skill) <= 0) return dw;
    if (Yanfly.Icon.Hp > 0) {
      var iw = wx + dw - Window_Base._iconWidth;
      this.drawIcon(Yanfly.Icon.Hp, iw, wy + 2);
      dw -= Window_Base._iconWidth + 2;
    }
    this.changeTextColor(this.textColor(Yanfly.Param.SCCHpTextColor));
    var fmt = Yanfly.Param.SCCHpFormat;
    var text = fmt.format(Yanfly.Util.toGroup(this._actor.skillHpCost(skill)),
      TextManager.hpA);
    this.contents.fontSize = Yanfly.Param.SCCHpFontSize;
    this.drawText(text, wx, wy, dw, 'right');
    var returnWidth = dw - this.textWidth(text) - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.textWidthEx = function(text) {
    return this.drawTextEx(text, 0, this.contents.height);
};

Window_SkillList.prototype.drawCustomDisplayCost = function(skill, wx, wy, dw) {
    this.runDisplayEvalCost(skill);
    if (skill.customCostText === '') return dw;
    var width = this.textWidthEx(skill.customCostText);
    this.drawTextEx(skill.customCostText, wx - width + dw, wy);
    var returnWidth = dw - width - Yanfly.Param.SCCCostPadding;
    this.resetFontSettings();
    return returnWidth;
};

Window_SkillList.prototype.runDisplayEvalCost = function(skill) {
    if (skill.costdisplayEval === '') return;
    var item = skill;
    var a = this._actor;
    var user = this._actor;
    var subject = this._actor;
    var s = $gameSwitches._data;
    var v = $gameVariables._data;
    eval(skill.costdisplayEval);
};

Window_SkillList.prototype.drawOtherCost = function(skill, wx, wy, dw) {
    return dw;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

if (!Yanfly.Util.toGroup) {
    Yanfly.Util.toGroup = function(inVal) {
        return inVal;
    }
};

//=============================================================================
// End of File
//=============================================================================
