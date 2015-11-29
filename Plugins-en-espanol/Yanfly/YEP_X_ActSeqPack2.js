//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 2
// YEP_X_ActSeqPack2.js
// Traducción al español - Rekiem
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack2 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP2 = Yanfly.ASP2 || {};

//=============================================================================
 /*:
 * @plugindesc v1.05 (Requires YEP_BattleEngineCore.js) Funciones visuales
 * se añaden a las secuencias de acción del Battle Engine Core's.
 * @author Yanfly Engine Plugins (Es)
 *
 * @help
 * ============================================================================
 *                    (Require YEP_BattleEngineCore.js)
 *   AVISO : IGNORAR LAS TRADUCCIÓNES EN ESPAÑOL AL LADO DE LAS ORGINALES
 *   EJEMPLO : ACTION COMMON EVENT -  > EVENTO DE ACCIÓN COMÚN <
 *   Ejemplo de uso: action common event < se llama en su versión en ingles
 * ============================================================================
 * ============================================================================
 * Introducción
 * ============================================================================
 *
 * El plugin de Action Sequence Pack 2 es un plugin de extensión para el Battle
 * Engine Core y Yanfly Engine Plugins. Este plugin de extensión no funcionara
 * sin el plugin principal.
 *
 * Este plugin de extensión contiene las funciones más básicas usadas para
 * personalizar secuencias de acción en una escala visual. Este plugin se 
 * centra en hacer que los combatientes realicen acciónes visuales.
 *
 * ============================================================================
 * Action Sequences - ala Melody (Secuencias de acciónes)
 * ============================================================================
 *
 * El Battle Engine Core incluye el sistema Yanfly Engine Melody Battle Engine,
 * donde cada uno de los aspectos de los efectos de habilidades y objetos 
 * pueden ser controlados a un cierto punto. Estos se llaman secuencias de
 * acciónes, donde cada comando de secuencia de acción hace que el juego 
 * realice una acción individual distinta.
 *
 * Cada habilidad y item consta de cinco diferentes secuencias de acciónes.
 * Estas son las siguientes:
 *
 * 1. Setup Actions -  acciónes de Configuración
 * Preparan el combatiente activo antes de ejecutar la mayor parte de la acción 
 * y sus efectos individuales. Normalmente lo que usted ve Aquí son cosas como
 * el combatiente activo se mueve un poco para adelante, desenfundando su arma,
 * etc. esta etapa se producirá antes que el combatiente activo gaste el costo
 * de habilidad o item.
 *
 * 2. Whole Actions - acciónes Enteras
 * Estas acciónes van a afectar a todos los objetivos simultáneamente. Aunque
 * esta sección no necesita ser usada, la mayoría de las acciónes van a usar 
 * esto para mostrar animaciónes sobre todos los enemigos. Esta etapa ocurre
 * después del costo de habilidad e item.
 *
 * 3. Target Actions - acciónes de Objetivo
 * Esta sección afectara a todos los objetivos individualmente. Usada princi -
 * palmente por ataques físicos que ofrecerá más formas de daño. las acciónes
 * que ocurren aquí no afectaran otros objetivos a no ser que sea ordenado
 * específicamente para afectar.
 *
 * 4. Follow Actions - acciónes de Seguimiento
 * Esta sección se dedicara a trabajos de limpieza después de las acciónes de
 * los objetivos individuales. Aquí, ella  hará cosas como remover banderas 
 * inmortales -immortal flags- , comenzar eventos comunes, y más.
 *
 * 5. Finish Actions - acciónes Terminadas
 * Esta sección tendrá muy cerca las secuencias de acción del combatiente 
 * activo. Normalmente cosas como hacer esperar, correr y aguardar en último 
 * minuto para habilidades e items, mover de regreso a su lugar , y otros.
 *
 * Ahora que usted sabe cada uno de los cinco pasos de cada secuencia de
 * acción, Aquí están los tags que usted puede insertar dentro de las
 * habilidades e items. Preste atención para cada nombre de etiqueta.
 *
 * 1. <setup action>                                5. <finish action>
 *     action list                                      action list
 *     action list                                      action list
 *    </setup action>                                  </finish action>
 *
 * 2. <whole action>       3. <target action>       4. <follow action>
 *     action list             action list              action list
 *     action list             action list              action list
 *    </whole action>         </target action>         </follow action>
 *
 * Ellos harán su respectivo conjunto de acciónes. Los métodos para insertar
 * para la lista de acciónes pueden encontrarse abajo del core del manual de
 * ayuda.
 *
 * Además, para prevenir que cada uno de sus notebox de items de su banco de 
 * datos este lleno de listas de secuencias de acciónes, Hay un atajo que usted
 * puede hacer para copiar todas las acciónes de Configuración, acciónes
 * enteras, acciónes de objetivo, acciónes de seguir, y acciónes terminadas con
 * apenas una línea.
 *
 * <action copy: x:y>
 *
 * Reemplace X con "item" o "skill" para establecer el tipo para el código de
 * lista de acciónes para copiar directamente. El número entero y es entonces 
 * el ID atribuido para aquel tipo de objeto especifico. Por ejemplo, 
 * para copiar las secuencia de acciónes de la habilidad 45º, el código seria
 * <action copy: skill:45> para cualquier cosa que acepte este código de 
 * acciónes. Si usted hace uso de este notetag, el llevara prioridad sobre
 * cualquier otro custom que usted coloque en el notebox.
 *
 * ============================================================================
 * Target Typing - Digitación de Objetivo
 * ============================================================================
 *
 * Usted podrá percibir que en algunas de las acciónes siguientes dirán "refer 
 * to target typing" que es esta sección Aquí, He Aquí una rápida lista de los
 * varios objetivos que usted puede seleccionar.
 *
 *   user; Esto seleccionara el combatiente activo.
 *   target, targets; Esto seleccionara los objetivos activos en cuestión.
 *   actors, existing actors; Esto seleccionara todos los personajes vivos.
 *   all actors; Esto seleccionara todos los personajes, incluido los muertos.
 *   dead actors: Esto seleccionara solo los personajes muertos.
 *   actors not user; Esto selecciona todos los actores vivos menos el usuario.
 *   actor x; Esto selecciona al personaje en la ranura X.
 *   charácter x; Esto selecciona el personaje especifico con el ID de
 *                personaje de X.
 *
 *   enemies, existing enemies; Esto seleccionara a todos los enemigos vivos.
 *   all enemies; Esto seleccionara a todos los enemigos, incluido los muertos.
 *   dead enemies: Esto seleccionara solo a los enemigos muertos.
 *   enemies not user; Esto seleccionara todos los enemigos menos al usuario.
 *   enemy x; Esto seleccionara al enemigo en la ranura X.
 *   friends; Esto seleccionara a los aliados vivos en combate.
 *   all friends; Esto seleccionara todos los aliados de combate, incluso
 *                muertos.
 *
 *   dead friends; Esto seleccionara los aliados muertos de combate.
 *   friends not user; Esto seleccionara los aliados de combate, menos
 *                     asi mismo.
 *
 *   friend x: Esto seleccionara al aliado de combate en la ranura X.
 *   opponents; Esto seleccionara los oponentes vivos de combate.
 *   all opponents; Esto seleccionara a todos los oponentes de combate.
 *   dead opponents; Esto seleccionara a los oponentes muertos en combate.
 *   opponent x: Esto seleccionara al oponente de combate de la ranura X.
 *   all alive; selecciona todos los personajes y enemigos vivos.
 *   all members; selecciona todos los personajes y enemigos vivos y muertos.
 *   all dead; selecciona todos los personajes y enemigos muertos.
 *   all not user; Esto seleccionara todos los combatientes vivos menos al
 *                 usuario.
 *
 *   focus; selecciona al combatiente activo y sus objetivos.
 *   not focus; selecciona todos menos el combatiente activo de sus objetivos.
 *
 * ============================================================================
 * Action Sequences - Action List (Secuencias de acción - Lista de acción)
 * ============================================================================
 *
 * Lo siguiente contiene una lista de acciónes que usted puede usar dentro de 
 * las cinco secuencias de acciónes. Cada acción tiene una función única y 
 * requiere ciertos formatos para operar apropiadamente.
 *
 *=============================================================================
 * ATTACK ANIMATION: target, (mirror)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Muestra la animación de ataque del combatiente activo al(a los) objetivo(s).
 * Esta será la animación determinada por la(s) arma(s del personaje). Si es 
 * por un enemigo, esta será determinada por la animación de ataque del enemigo
 * Si se utiliza espejo la animación puede ser reflejada.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: attack animation: target
 *=============================================================================
 *
 *=============================================================================
 * ENEMY EFFECT: target, effect-type
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Esto afecta solo a los enemigos, Hace al objetivo muestre un efecto 'whiten'
 * o 'blink'.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: enemy effect: targets, whiten
 *                 enemy effect: targets, blink
 *=============================================================================
 *
 *=============================================================================
 * FACE target: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * FACE target1: FORWARD
 * FACE target1: BACKWARD
 * FACE target1: HOME
 * FACE target1: AWAY FROM HOME
 * FACE target1: POINT, x coordinate, y coordinate
 * FACE target1: AWAY FROM POINT, x coordinate, y coordinate
 * FACE target1: target2
 * FACE target1: AWAY FROM target2
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Esto hará que el combatiente mire a una cierta dirección. Los argumentos
 * pueden ser usados con los formatos de arriba. Este formato de secuencia de
 * acción hará que el objetivo 1 mire para cualquiera de las direcciones. Si
 * objetivo 2 es usado, entonces el objetivo 1 mirara para la dirección 
 * relativa al objetivo 2.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: face user: forward
 *                 face target: backward
 *                 face enemies: home
 *                 face allies: away from home
 *                 face target: point, 20, 40
 *                 face target: away from point, 500, 600
 *                 face user: target
 *                 face target: away from user
 *=============================================================================
 *
 *=============================================================================
 * FADE OUT: (frames)
 * FADE IN: (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Da un fade out y fade in en la ventana, respectivamente, Usted puede
 * establecer la cantidad de frames para el proceso de fading, Si usted omite
 * frames, 60 frames serán usados por defecto.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: fade out
 *                 fade in: 10
 *=============================================================================
 *
 *=============================================================================
 * FLASH SCREEN: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * FLASH SCREEN: WHITE, (frames)
 * FLASH SCREEN: RED, (frames)
 * FLASH SCREEN: ORANGE, (frames)
 * FLASH SCREEN: YELLOW, (frames)
 * FLASH SCREEN: GREEN, (frames)
 * FLASH SCREEN: BLUE, (frames)
 * FLASH SCREEN: PURPLE, (frames)
 * FLASH SCREEN: MAGENTA, (frames)
 * FLASH SCREEN: BLACK, (frames)
 * FLASH SCREEN: (red), (green), (blue), (intensity), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa a la ventana de juego a parpadear de un cierto color. Si para los
 * argumentos usted usa un nombre de color, utilizará una configuración pre
 * definida de parpadeo. Si usted escoge usar sus propias configuraciones, use
 * el formato de intensidad de rojo, verde, y azul para determinar cual color
 * de flash usted prefiere. Las configuraciones de intensidad de rojo, verde, y
 * azul varían de 0 a 255. Si se utilizan frames, esta será la duración del
 * flash de la ventana, Si es omitido, el contador por defecto de frames será 
 * de 60 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: flash screen: white
 *                 flash screen: red, 45
 *                 flash screen: 128, 170, 214, 170
 *                 flash screen: 68, 68, 68, 170, 45
 *=============================================================================
 *
 *=============================================================================
 * FLOAT target: (height), (frames)
 * FLOAT target: (height%), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Hace que el objetivo flote por encima del suelo por height%. La altura es
 * relativa a el objetivo flotante. Usar 100% significa que el objetivo flotara
 * sobre el suelo 100% sobre su misma altura. Si ningún signo de '%' es usado, 
 * el objetivo flotara por aquella cantidad de pixels en vez de el numero de
 * porcentaje de altura del objetivo. Los frames determinan cuantos frames se
 * tardara el objetivo en alcanzar aquella altura, Usar 0% para la altura va
 * a elevar el objetivo de regreso hacia el suelo.
 *
 * height = Altura
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: float user: 200%
 *                float enemies: 500, 30
 *                float target: 0%, 30
 *=============================================================================
 *
 *=============================================================================
 * HIDE BATTLE HUD - OCULTAR BATALLA HUD
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Esconde el hud de batalla para no substituir cualquier animación siendo
 * reproducida. Usted puede revelar el hud de batalla de nuevo usando
 * 'show battle hud'.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: hide battle hud
 *=============================================================================
 *
 *=============================================================================
 * JUMP target: (height), (frames)
 * JUMP target: (height%), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa que el objetivo salte una altura relativa al mismo objetivo. Si el
 * objetivo salta una altura de 200%, la altura será de 200% de altura del
 * objetivo. Si ninguna utiliza el signo '%', el objetivo saltara aquella
 * cantidad en pixeles en vez de un porcentaje de altura sobre el objetivo.
 * El conteo de frames es la cantidad de tiempo que el objetivo permanece en el 
 * aire. Usted puede usar esto con la secuencia de acción 'Move' para hacer
 * que el objetivo parezca estar saltando una distancia.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: jump user: 150%
 *                 jump target: 300, 60
 *=============================================================================
 *
 *=============================================================================
 * MOTION type: target, (no weapon)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * MOTION WALK: target
 * MOTION STANDBY: target
 * MOTION CHANT: target
 * MOTION GUARD: target
 * MOTION DAMAGE: target
 * MOTION EVADE: target
 * MOTION ATTACK: target
 * MOTION THRUST: target
 * MOTION SWING: target
 * MOTION MISSILE: target
 * MOTION SKILL: target
 * MOTION SPELL: target
 * MOTION ITEM: target
 * MOTION ESCAPE: target
 * MOTION VICTORY: target
 * MOTION DYING: target
 * MOTION ABNORMAL: target
 * MOTION SLEEP: target
 * MOTION DEAD: target
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Fuerza al objetivo a realizar un especifico tipo de acción en sideview, Si
 * usted hace un comando de secuencia para que el objetivo realice 'attack', el
 * objetivo automáticamente determinara basado en el arma que este tenga 
 * equipado el uso de un impulso, columpio, o movimiento de misil. Ataque,
 * impulso, columpio y misil también mostrara el arma del objetivo, si este
 * tiene equipada alguna.
 * 
 * Si 'no weapon' es usada después de objetivo, ninguna habilidad de arma será
 * mostrada. Esto efecto solo funciona con los movimientos de impulso, columpio
 * , y de misil.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: motion walk: user
 *                 motion thrust: user, no weapon
 *=============================================================================
 *
 *=============================================================================
 * MOVE target: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * MOVE target1: HOME, (frames)
 * MOVE target1: RETURN, (frames)
 * MOVE target1: FORWARD, (distance), (frames)
 * MOVE target1: BACKWARD, (distance), (frames)
 * MOVE target1: POINT, x coordinate, y coordinate, (frames)
 * MOVE target1: target2, BASE, (frames)
 * MOVE target1: target2, CENTER, (frames)
 * MOVE target1: target2, HEAD, (frames)
 * MOVE target1: target2, FRONT BASE, (frames)
 * MOVE target1: target2, FRONT CENTER, (frames)
 * MOVE target1: target2, FRONT HEAD, (frames)
 * MOVE target1: target2, BACK BASE, (frames)
 * MOVE target1: target2, BACK CENTER, (frames)
 * MOVE target1: target2, BACK HEAD, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Este es un comando de movimiento. Los argumentos pueden ser usados en los
 * formatos de arriba. Este comando de secuencia de acción moverá el objetivo 1
 * para cualquiera de las localizaciones listadas en los argumentos. Si es
 * hacia objetivo 2, usted debe incluir la posición relativa al objetivo 2 para
 * que el objetivo 1 pueda viajar.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: move user: home, 20
 *                 move target: forward, 48, 12
 *                 move enemy 1: point, 400, 300
 *                 move actor 2: front base, 20
 *=============================================================================
 *
 *=============================================================================
 * OPACITY target: x, (frames)
 * OPACITY target: x%, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Cambia la opacidad del objetivo a X (0-255) o X% (0% a 100%). Si usted usa
 * 'frames', esa será la duración de frames para el cambio de la opacidad en el
 * objetivo.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: opacity user: 50%, 30
 *                 opacity not focus: 0
 *=============================================================================
 *
 *=============================================================================
 * SHOW BATTLE HUD - MOSTRAR BATALLA HUD
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Si el hud de batalla esta oculto usando 'hide battle hud', use esto para
 * mostrar el hud de batalla de regreso en la ventana del jugador.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: show battle hud
 *=============================================================================
 *
 *=============================================================================
 * SHAKE SCREEN: (power), (speed), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Hace que la ventana de juego se balancee. Ajuste el power de 0-9, speed 0-1,
 * y los frames para alterar la duración del balanceamiento de ventana. Si esos
 * valores fueran omitidos, tendrá los valores por defecto de 5 power, 5 speed,
 * y 60 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: shake screen
 *                 shake screen: 9
 *                 shake screen: 3, 9, 30
 *=============================================================================
 *
 *=============================================================================
 * TINT SCREEN: args
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * TINT SCREEN: NORMAL, (frames)
 * TINT SCREEN: DARK, (frames)
 * TINT SCREEN: SEPIA, (frames)
 * TINT SCREEN: SUNSET, (frames)
 * TINT SCREEN: NIGHT, (frames)
 * TINT SCREEN: (red), (green), (blue), (gray), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Cambia el tono de la ventana de batalla, Si usa los argumentos 'normal',
 * 'dark', 'sepia', 'sunset', o 'night' la ventana tendrá un tono pre-definido.
 * Si no, entonces los argumentos para los valores de rojo, verde, azul, y gris
 * ,tienen que ser colocados para el tono. Rojo, verde, y azul pueden variar de
 * -255 a 255 en cuanto que gris va a variar de 0 a 255. Si frames fueran 
 * usados, eso cambiara la duración con que la ventana cambiara de tono. Si es 
 * omitido, la cantidad por defecto de frames usados será de 60 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: tint screen: normal
 *                 tint screen: sepia, 30
 *                 tint screen: 68, -34, -34, 0
 *                 tint screen: 68, -68, 0, 68, 45
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR FLOAT - ESPERAR PARA FLOTAR
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera a que todos los cambios de flotación del combatiente terminen antes
 * de continuar a la próxima acción de la secuencia de acciónes.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait for float
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR JUMP - ESPERAR PARA SALTAR
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera a que terminen todos los saltos del combatiente antes de continuar a
 * la próxima acción de la secuencia de acciónes.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait for jump
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR OPACITY - ESPERAR OPACIDAD
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Esperar a que todos los combatientes terminen el cambio de opacidad antes de
 * continuar a la próxima acción de la secuencia de acciónes.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait for opacity
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.05:
 * - Creating compatibility for a future plugin.
 *
 * Version 1.04a:
 * - Rewrote and updated movement formulas.
 *
 * Version 1.03:
 * - Made a change to Motion action sequence. 'Wait' is now substituted for
 * 'Standby' as to not confuse it with the actual Motion Wait action sequence.
 * - Added a 'no weapon' option to Motion action sequences. This new tag will
 * only affect the 'Thrust', 'Swing', and 'Missile' motions.
 *
 * Version 1.02:
 * - Added a check for motion attack to differentiate between actor and enemy.
 *
 * Version 1.01:
 * - Updated help file to include Character X for target typing.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameters
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack2');
Yanfly.Param = Yanfly.Param || {};

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP2.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // ATTACK ANIMATION
  if (actionName === 'ATTACK ANIMATION') {
    return this.actionAttackAnimation(actionArgs);
  }
  // ENEMY EFFECT
  if (actionName === 'ENEMY EFFECT') {
    return this.actionEnemyEffect(actionArgs);
  }
  // FACE TARGET
  if (actionName.match(/FACE[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionFace(string, actionArgs);
    }
  }
  // FADE IN, FADE OUT
  if (['FADE IN', 'FADE OUT'].contains(actionName)) {
    return this.actionFadeScreen(actionName, actionArgs);
  }
  // FLASH SCREEN
  if (actionName === 'FLASH SCREEN') {
    return this.actionFlashScreen(actionArgs);
  }
  // FLOAT TARGET
  if (actionName.match(/FLOAT[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionFloat(string, actionArgs);
    }
  }
  // HIDE BATTLE HUD, SHOW BATTLE HUD
  if (['HIDE BATTLE HUD', 'SHOW BATTLE HUD'].contains(actionName)) {
    return this.actionBattleHud(actionName);
  }
  // JUMP TARGET
  if (actionName.match(/JUMP[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionJump(string, actionArgs);
    }
  }
  // MOTION TYPE
  if (actionName.match(/MOTION[ ](.*)/i)) {
    return this.actionMotionTarget(String(RegExp.$1), actionArgs);
  }
  // MOVE TARGET
  if (actionName.match(/MOVE[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionMove(string, actionArgs);
    }
  }
  // OPACITY TARGET
  if (actionName.match(/OPACITY[ ](.*)/i)) {
    var string = String(RegExp.$1);
    if (this.makeActionTargets(string).length > 0) {
      return this.actionOpacity(string, actionArgs);
    }
  }
  // SHAKE SCREEN
  if (actionName === 'SHAKE SCREEN') {
    return this.actionShakeScreen(actionArgs);
  }
  // TINT SCREEN
  if (actionName === 'TINT SCREEN') {
    return this.actionTintScreen(actionArgs);
  }
  // WAIT FOR FLOAT
  if (actionName === 'WAIT FOR FLOAT') {
    return this.actionWaitForFloat();
  }
  // WAIT FOR JUMP
  if (actionName === 'WAIT FOR JUMP') {
    return this.actionWaitForJump();
  }
  // WAIT FOR OPACITY
  if (actionName === 'WAIT FOR OPACITY') {
    return this.actionWaitForOpacity();
  }
  return Yanfly.ASP2.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.actionAttackAnimation = function(actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  var mirror = false;
  if (actionArgs[1] && actionArgs[1].toUpperCase() === 'MIRROR') mirror = true;
  if (mirror && this._subject.isActor()) {
    this._logWindow.showActorAtkAniMirror(this._subject,
      targets.filter(Yanfly.Util.onlyUnique));
  } else {
    this._logWindow.showAttackAnimation(this._subject,
      targets.filter(Yanfly.Util.onlyUnique));
  }
  return true;
};

BattleManager.actionBattleHud = function(actionName) {
  if (actionName === 'HIDE BATTLE HUD') {
    this._windowLayer.x = Graphics.boxWidth * 495;
  } else if (actionName === 'SHOW BATTLE HUD') {
    this._windowLayer.x = 0;
  }
  return false;
}

BattleManager.actionEnemyEffect = function(actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return true;
    if (actionArgs[1].toUpperCase() === 'WHITEN') {
      targets.forEach(function(target) {
        if (target.isEnemy()) target.requestEffect('whiten');
      });
    } else if (actionArgs[1].toUpperCase() === 'BLINK') {
      targets.forEach(function(target) {
        if (target.isEnemy()) target.requestEffect('blink');
      });
    }
    return true;
};

BattleManager.actionFace = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['FORWARD', 'NORMAL'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceForward();
      });
    } else if (['BACKWARD', 'MIRROR'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceBackward();
      });
    } else if (['HOME', 'ORIGIN'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceHome();
      });
    } else if (['AWAY FROM HOME', 'AWAY FROM ORIGIN'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.spriteFaceAwayHome();
      });
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      movers.forEach(function(mover) {
        mover.spriteFacePoint(destX, destY);
      });
    } else if (['AWAY FROM POINT', 'AWAY FROM POSITION', 'AWAY FROM COORDINATE',
    'AWAY FROM SCREEN', 'AWAY FROM SCREEN POS',
    'AWAY FROM COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      movers.forEach(function(mover) {
        mover.spriteFaceAwayPoint(destX, destY);
      });
    } else if (cmd.match(/AWAY[ ]FROM[ ](.*)/i)) {
      var targets = this.makeActionTargets(String(RegExp.$1));
      if (targets.length < 1) return false;
      var destX = 0;
      var destY = 0;
      targets.forEach(function(target) {
        destX += target.spritePosX();
        destY += target.spritePosY();
      }, this);
      destX /= targets.length;
      destY /= targets.length;
      movers.forEach(function(mover) {
        mover.spriteFaceAwayPoint(destX, destY);
      }, this);
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      if (targets.length < 1) return false;
      var destX = 0;
      var destY = 0;
      targets.forEach(function(target) {
        destX += target.spritePosX();
        destY += target.spritePosY();
      }, this);
      destX /= targets.length;
      destY /= targets.length;
      movers.forEach(function(mover) {
        mover.spriteFacePoint(destX, destY);
      }, this);
    }
    return false;
};

BattleManager.actionFadeScreen = function(actionName, actionArgs) {
  var frames = actionArgs[0] || 60;
  if (actionName === 'FADE IN') {
    $gameScreen.startFadeIn(frames);
  } else if (actionName === 'FADE OUT') {
    $gameScreen.startFadeOut(frames);
  }
  return false;
};

BattleManager.actionFlashScreen = function(actionArgs) {
    if (actionArgs[0].toUpperCase() === 'WHITE') {
      var flash = [255, 255, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'RED') {
      var flash = [255, 0, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'ORANGE') {
      var flash = [255, 128, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'YELLOW') {
      var flash = [255, 255, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'GREEN') {
      var flash = [0, 255, 0, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'BLUE') {
      var flash = [0, 128, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'PURPLE') {
      var flash = [128, 64, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'MAGENTA') {
      var flash = [255, 0, 255, 255];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'BLACK') {
      var flash = [0, 0, 0, 255];
      var frames = actionArgs[1] || 60;
    } else {
      var red = actionArgs[0] || 0;
      var green = actionArgs[1] || 0;
      var blue = actionArgs[2] || 0;
      var intensity = actionArgs[3] || 0;
      var frames = actionArgs[4] || 60;
      var flash = [parseInt(red), parseInt(green),
          parseInt(blue), parseInt(intensity)];
    }
    $gameScreen.startFlash(flash, frames);
    return false;
};

BattleManager.actionFloat = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    var pixels = 0;
    if (cmd.match(/(\d+)([%ï¼…])/i)) {
      var floatPeak = parseFloat(RegExp.$1 * 0.01);
    } else if (cmd.match(/(\d+)/i)) {
      pixels = parseInt(RegExp.$1);
      var floatPeak = 0.0;
    } else {
      var floatPeak = 1.0;
    }
    movers.forEach(function(mover) {
      var floatRate = floatPeak + (pixels / mover.spriteHeight());
      mover.spriteFloat(floatRate, frames);
    });
    return false;
};

BattleManager.actionJump = function(name, actionArgs) {
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    var pixels = 0;
    if (cmd.match(/(\d+)([%ï¼…])/i)) {
      var jumpPeak = parseFloat(RegExp.$1 * 0.01);
    } else if (cmd.match(/(\d+)/i)) {
      pixels = parseInt(RegExp.$1);
      var jumpPeak = 0.0;
    } else {
      var jumpPeak = 1.0;
    }
    movers.forEach(function(mover) {
      var jumpRate = jumpPeak + (pixels / mover.spriteHeight());
      mover.spriteJump(jumpRate, frames);
    });
    return true;
};

BattleManager.actionMotionTarget = function(name, actionArgs) {
    if (name.toUpperCase() === 'WAIT') return this.actionMotionWait(actionArgs);
    if (name.toUpperCase() === 'STANDBY') name = 'WAIT';
    var movers = this.makeActionTargets(actionArgs[0]);
    if (movers.length < 1) return true;
    var cmd = name.toLowerCase();
    var motion = 'wait';
    if (actionArgs[1] && actionArgs[1].toUpperCase() === 'NO WEAPON') {
      var showWeapon = false;
    } else {
      var showWeapon = true;
    }
    if (['wait', 'chant', 'guard', 'evade', 'skill', 'spell', 'item', 'escape',
    'victory', 'dying', 'abnormal', 'sleep', 'dead'].contains(cmd)) {
      motion = cmd;
    } else if (['walk', 'move'].contains(cmd)) {
      motion = 'walk';
    } else if (['damage', 'hit'].contains(cmd)) {
      motion = 'damage';
    } else if (['attack'].contains(cmd)) {
      movers.forEach(function(mover) {
        mover.performAttack();
      });
      return false;
    } else if (['thrust', 'swing', 'missile'].contains(cmd)) {
      motion = cmd;
      movers.forEach(function(mover) {
        mover.forceMotion(motion);
        if (mover.isActor() && showWeapon) {
          var weapons = mover.weapons();
          var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
          var attackMotion = $dataSystem.attackMotions[wtypeId];
          if (attackMotion && [0, 1, 2].contains(attackMotion.type)) {
            mover.startWeaponAnimation(attackMotion.weaponImageId);
          }
        }
      });
      return false;
    }
    movers.forEach(function(mover) {
      mover.forceMotion(motion);
    });
    return false;
};

BattleManager.actionMove = function(name, actionArgs) {
    if (!$gameSystem.isSideView()) return true;
    var movers = this.makeActionTargets(name);
    if (movers.length < 1) return true;
    var cmd = actionArgs[0].toUpperCase();
    if (['HOME', 'ORIGIN'].contains(cmd)) {
      var frames = actionArgs[1] || 12;
      movers.forEach(function(mover) {
        mover.battler().startMove(0, 0, frames);
        mover.requestMotion('walk');
        mover.spriteFaceHome();
      });
    } else if (['RETURN'].contains(cmd)) {
      var frames = actionArgs[1] || 12;
      movers.forEach(function(mover) {
        mover.battler().startMove(0, 0, frames);
        mover.requestMotion('evade');
        mover.spriteFaceForward();
      });
    } else if (['FORWARD', 'FORWARDS', 'BACKWARD',
    'BACKWARDS'].contains(cmd)) {
      var distance = actionArgs[1] || Yanfly.Param.BECStepDist;
      if (['BACKWARD', 'BACKWARDS'].contains(cmd)) distance *= -1;
      var frames = actionArgs[2] || 12;
      movers.forEach(function(mover) {
        mover.battler().moveForward(distance, frames);
        mover.requestMotion('walk');
        if (['FORWARD', 'FORWARDS'].contains(cmd)) {
          mover.spriteFaceForward();
        } else {
          mover.spriteFaceBackward();
        }
      });
    } else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
      var destX = eval(actionArgs[1]) || 0;
      var destY = eval(actionArgs[2]) || 0;
      var frames = actionArgs[3] || 12;
      movers.forEach(function(mover) {
        mover.battler().moveToPoint(destX, destY, frames);
        mover.requestMotion('walk');
        mover.spriteFacePoint(destX, destY);
      });
    } else {
      var targets = this.makeActionTargets(actionArgs[0]);
      var frames = actionArgs[2] || 12;
      var type = actionArgs[1].toUpperCase();
      if (targets.length < 1) return false;
      for (var i = 0; i < movers.length; ++i) {
      	var mover = movers[i];
      	if (!mover) continue;
      	if (['BASE', 'FOOT', 'FEET'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['CENTER', 'MIDDLE'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['HEAD', 'TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'center');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      } else if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET',
	      'FRONT'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET',
	      'BACK'].contains(type)) {
	      	var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'foot');
	      } else if (['FRONT CENTER', 'FRONT MIDDLE'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['BACK CENTER', 'BACK MIDDLE',].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'center');
	      } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'front');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
	        var destX = this.actionMoveX(mover, targets, 'back');
	        var destY = this.actionMoveY(mover, targets, 'head');
	      }
	      mover.battler().moveToPoint(destX, destY, frames);
        mover.spriteFacePoint(destX, destY);
      }
    }
    return true;
};

BattleManager.actionMoveX = function(mover, targets, value) {
		value = this.actionMoveXLocation(mover, targets, value);
		var max = targets.length;
		var moverWidth = mover.spriteWidth();
		if (value === 'center') {
			var destX = null;
		} else {
			var destX = (value === 'left') ? Graphics.boxWidth : 0;
		}
		for (var i = 0; i < max; ++i) {
			var target = targets[i];
			if (!target) continue;
			var targetWidth = target.spriteWidth();
			var point = target.spritePosX();
			if (value === 'center') {
				destX = (destX === null) ? 0 : destX;
				destX += point;
			} else if (value === 'left') {
				point -= targetWidth / 2;
				point -= (mover.isActor() ? 1 : 1) * moverWidth / 2;
				destX = Math.min(point, destX);
			} else {
				point += targetWidth / 2;
				point += (mover.isActor() ? 1 : 1) * moverWidth / 2;
				destX = Math.max(point, destX);
			}
		}
		if (value === 'center') destX /= max;
		return destX;
};

BattleManager.actionMoveXLocation = function(mover, targets, value) {
		if (value === 'center') return 'center';
		var actors = 0;
		var enemies = 0;
		var max = targets.length;
		for (var i = 0; i < max; ++i) {
			var target = targets[i];
			if (!target) continue;
			if (target.isActor()) actors += 1;
			if (target.isEnemy()) enemies += 1;
		}
		if (actors > 0 && enemies === 0) {
			return (value === 'front') ? 'left' : 'right';
		} else if (actors === 0 && enemies > 0) {
			return (value === 'front') ? 'right' : 'left';
		} else {
			if (mover.isActor()) {
				return (value === 'front') ? 'right' : 'left';
			} else { // enemy
				return (value === 'front') ? 'left' : 'right';
			}
		}
		return 'center';
};

BattleManager.actionMoveY = function(mover, targets, value) {
		var max = targets.length;
		var destY = 0;
		var point = (value === 'head') ? Graphics.boxHeight : 0;
		for (var i = 0; i < max; ++i) {
			var target = targets[i];
			if (!target) continue;
			if (value === 'head') {
				point = Math.min(target.spritePosY() - target.spriteHeight(), point);
			} else if (value === 'center') {
				point += target.spritePosY() - target.spriteHeight() / 2;
			} else { // foot
				point = Math.max(target.spritePosY(), point);
			}
		}
		destY = (value === 'center') ? point / max : point;
		return destY;
};

BattleManager.actionOpacity = function(name, actionArgs) {
    var targets = this.makeActionTargets(name);
    if (targets.length < 1) return true;
    var cmd = actionArgs[0];
    var frames = actionArgs[1] || 12;
    if (cmd.match(/(\d+)([%ï¼…])/i)) {
      var opacity = parseInt(RegExp.$1 * 0.01 * 255).clamp(0, 255);
    } else if (cmd.match(/(\d+)/i)) {
      var opacity = parseInt(RegExp.$1);
    } else {
      return false;
    }
    targets.forEach(function(target) {
      target.spriteOpacity(opacity, frames);
    });
    return false;
};

BattleManager.actionTintScreen = function(actionArgs) {
    if (actionArgs[0].toUpperCase() === 'NORMAL') {
      var tint = [0, 0, 0, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'DARK') {
      var tint = [-68, -68, -68, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'SEPIA') {
      var tint = [34, -34, -68, 170];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'SUNSET') {
      var tint = [68, -34, -34, 0];
      var frames = actionArgs[1] || 60;
    } else if (actionArgs[0].toUpperCase() === 'NIGHT') {
      var tint = [68, -68, 0, 68];
      var frames = actionArgs[1] || 60;
    } else {
      var red = actionArgs[0] || 0;
      var green = actionArgs[1] || 0;
      var blue = actionArgs[2] || 0;
      var gray = actionArgs[3] || 0;
      var frames = actionArgs[4] || 60;
      var tint = [parseInt(red), parseInt(green),
          parseInt(blue), parseInt(gray)];
    }
    $gameScreen.startTint(tint, frames);
    return false;
};

BattleManager.actionShakeScreen = function(actionArgs) {
    var power = actionArgs[0] || 5;
    var speed = actionArgs[1] || 5;
    var frames = actionArgs[2] || 60;
    $gameScreen.startShake(parseInt(power), parseInt(speed), parseInt(frames));
    return false;
};

BattleManager.actionWaitForFloat = function() {
    this._logWindow.waitForFloat();
    return false;
};

BattleManager.actionWaitForJump = function() {
    this._logWindow.waitForJump();
    return false;
};

BattleManager.actionWaitForOpacity = function() {
    this._logWindow.waitForOpacity();
    return false;
};

BattleManager.setWindowLayer = function(windowLayer) {
    this._windowLayer = windowLayer;
};

//=============================================================================
// Sprite_Battler
//=============================================================================

Yanfly.ASP2.Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    Yanfly.ASP2.Sprite_Battler_initMembers.call(this);
    this.resetFloat();
    this.setupJump(0, 0);
    this.resetOpacity();
};

Sprite_Battler.prototype.resetFloat = function() {
    this._floatHeight = 0.0;
    this._floatTarget = 0;
    this._floatDur = 0;
    this._floatRate = 0;
};

Sprite_Battler.prototype.resetOpacity = function() {
    this._opacityTarget = 255;
    this._opacityDur = 0;
    this._opacityRate = 0;
    this._opacityChanging = false;
};

Sprite_Battler.prototype.setupFloat = function(floatHeight, floatDuration) {
    floatDuration = Math.max(1, floatDuration);
    this._floatTarget = floatHeight;
    this._floatDur = floatDuration;
    var rate = Math.abs(this._floatHeight - floatHeight) / floatDuration;
    this._floatRate = rate;
};

Sprite_Battler.prototype.setupJump = function(jumpHeight, jumpDuration) {
    this._jumpHeight = jumpHeight;
    this._jumpDur = jumpDuration;
    this._jumpFull = jumpDuration;
};

Sprite_Battler.prototype.setupOpacityChange = function(target, duration) {
    duration = Math.max(1, duration);
    this._opacityTarget = target;
    this._opacityDur = duration;
    var rate = Math.abs(this.opacity - target) / duration;
    this._opacityRate = rate;
    this._opacityChanging = true;
};

Yanfly.ASP2.Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    Yanfly.ASP2.Sprite_Battler_update.call(this);
    if (this._battler) {
      this.updateFloat();
      this.updateWeapon();
      this.updateOpacity();
    }
};

Sprite_Battler.prototype.updateFloat = function() {
    if (!this._battler) return;
    if (this._floatDur > 0) this._floatDur--;
    if (this._jumpDur > 0) this._jumpDur--;
    var baseY = this._battler.anchorY();
    var floatHeight = this.getFloatHeight();
    var jumpHeight = this.getJumpHeight();
    var height = floatHeight + jumpHeight;
    if (this._mainSprite && this._mainSprite.bitmap) {
      this._mainSprite.anchor.y = (baseY + height);
      this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
    } else {
      this.anchor.y = (baseY + height);
    }
};

Sprite_Battler.prototype.updateWeapon = function() {
    if (!this._battler) return;
    if (!this._battler.isActor()) return;
    this._weaponSprite.anchor.y = this._mainSprite.anchor.y;
};

Sprite_Battler.prototype.getFloatHeight = function() {
    if (this._floatDur <= 0) {
      this._floatHeight = this._floatTarget;
    } else {
      var target = this._floatTarget;
      var rate = this._floatRate;
      if (this._floatHeight >= target) {
        this._floatHeight = Math.max(target, this._floatHeight - rate);
      } else {
        this._floatHeight = Math.min(target, this._floatHeight + rate);
      }
    }
    return this._floatHeight;
};

Sprite_Battler.prototype.getJumpHeight = function() {
    if (this._jumpDur <= 0) {
      return 0;
    } else {
      var x = this._jumpFull - this._jumpDur;
      var h = this._jumpFull / 2;
      var k = this._jumpHeight;
      var a = -k / Math.pow(h, 2);
      var height = a * Math.pow((x - h), 2) + k;
    }
    return height;
};

Sprite_Battler.prototype.updateOpacity = function() {
    if (this.antiOpacityChange()) return;
    this._opacityDur--;
    if (this._opacityDur <= 0) {
      if (this.opacity !== this._opacityTarget) {
        this.opacity = this._opacityTarget;
      }
      this._opacityChanging = false;
    } else {
      var target = this._opacityTarget;
      var rate = this._opacityRate;
      if (this.opacity >= target) {
        this.opacity = Math.max(target, this.opacity - rate);
      } else {
        this.opacity = Math.min(target, this.opacity + rate);
      }
    }
};

Sprite_Battler.prototype.antiOpacityChange = function() {
    if (!this._opacityChanging) return true;
    return false;
};

Sprite_Battler.prototype.isFloating = function() {
    return this._floatDur > 0;
};

Sprite_Battler.prototype.isJumping = function() {
    return this._jumpDur > 0;
};

Sprite_Battler.prototype.isChangingOpacity = function() {
    return this._opacityDur > 0;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.isAnyoneFloating = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isFloating();
    });
};

Spriteset_Battle.prototype.isAnyoneJumping = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isJumping();
    });
};

Spriteset_Battle.prototype.isAnyoneChangingOpacity = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite.isChangingOpacity();
    });
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.spriteFloat = function(floatHeight, floatDuration) {
    if (!this.battler()) return;
    if (!this.spriteCanMove()) return;
    if (!$gameSystem.isSideView()) return;
    this.battler().setupFloat(floatHeight, floatDuration);
};

Game_Battler.prototype.spriteJump = function(jumpHeight, jumpDuration) {
    if (!this.battler()) return;
    if (!this.spriteCanMove()) return;
    if (!$gameSystem.isSideView()) return;
    this.battler().setupJump(jumpHeight, jumpDuration);
};

Game_Battler.prototype.spriteOpacity = function(opacity, duration) {
    if (!this.battler()) return;
    this.battler().setupOpacityChange(opacity, duration);
};

//=============================================================================
// Scene_Battle
//=============================================================================

Yanfly.ASP2.Scene_Base_createWindowLayer =
    Scene_Base.prototype.createWindowLayer;
Scene_Base.prototype.createWindowLayer = function() {
    Yanfly.ASP2.Scene_Base_createWindowLayer.call(this);
    BattleManager.setWindowLayer(this._windowLayer);
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.ASP2.Window_BattleLog_updateWaitMode =
    Window_BattleLog.prototype.updateWaitMode;
Window_BattleLog.prototype.updateWaitMode = function() {
    if (this._waitMode === 'float') {
      if (this._spriteset.isAnyoneFloating()) return true;
    } else if (this._waitMode === 'jump') {
      if (this._spriteset.isAnyoneJumping()) return true;
    } else if (this._waitMode === 'opacity') {
      if (this._spriteset.isAnyoneChangingOpacity()) return true;
    }
    return Yanfly.ASP2.Window_BattleLog_updateWaitMode.call(this);
};

Window_BattleLog.prototype.waitForFloat = function() {
    this.setWaitMode('float');
};

Window_BattleLog.prototype.waitForJump = function() {
    this.setWaitMode('jump');
};

Window_BattleLog.prototype.waitForOpacity = function() {
    this.setWaitMode('opacity');
};

//=============================================================================
// End of File
//=============================================================================
};
