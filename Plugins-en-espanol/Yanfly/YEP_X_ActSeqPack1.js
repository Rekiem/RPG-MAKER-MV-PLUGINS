//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 1
// YEP_X_ActSeqPack1.js
// Traducción al español - Rekiem
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack1 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP1 = Yanfly.ASP1 || {};

//=============================================================================
 /*:
 * @plugindesc v1.09 Las funciones básicas son adicionadas a las
 * secuencias de acción de Battle Engine Core's.
 * @author Yanfly Engine Plugins (Es) 
 *
 * @param Default Volume
 * @desc Este es el volumen del BGM del juego.
 * @default 90
 *
 * @param Default Pitch
 * @desc Este es el pitch del BGM del juego.
 * @default 100
 *
 * @param Default Pan
 * @desc Este es el pan del BGM del juego.
 * @default 0
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
 * El plugin de Action Sequence Pack 1 es un plugin de extensión para el Battle
 * Engine Core y Yanfly Engine Plugins. Este plugin de extensión no funcionara
 * sin el plugin principal.
 *
 * Este plugin de extensión contiene las funciones más básicas usadas para
 * personalizar secuencias de acción en una escala técnica. Aquí, usted será
 * capaz de cambiar los interruptores -switches- operar variables,
 * Agregar estados, cambiar las tasas de daño, y más.
 *
 * ============================================================================
 * Action Sequences - ala Melody (Secuencias de acciones)
 * ============================================================================
 *
 * El Battle Engine Core incluye el sistema Yanfly Engine Melody Battle Engine,
 * donde cada uno de los aspectos de los efectos de habilidades y objetos 
 * pueden ser controlados a un cierto punto. Estos se llaman secuencias de
 * acciones, donde cada comando de secuencia de acción hace que el juego 
 * realice una acción individual distinta.
 *
 * Cada habilidad y item consta de cinco diferentes secuencias de acciones.
 * Estas son las siguientes:
 *
 * 1. Setup Actions -  Acciones de Configuración
 * Preparan el combatiente activo antes de ejecutar la mayor parte de la acción 
 * y sus efectos individuales. Normalmente lo que usted ve Aquí son cosas como
 * el combatiente activo se mueve un poco para adelante, desenfundando su arma,
 * etc. esta etapa se producirá antes que el combatiente activo gaste el costo
 * de habilidad o item.
 *
 * 2. Whole Actions - Acciones Enteras
 * Estas acciones van a afectar a todos los objetivos simultáneamente. Aunque
 * esta sección no necesita ser usada, la mayoría de las acciones van a usar 
 * esto para mostrar animaciones sobre todos los enemigos. Esta etapa ocurre
 * después del costo de habilidad e item.
 *
 * 3. Target Actions - Acciones de Objetivo
 * Esta sección afectara a todos los objetivos individualmente. Usada princi -
 * palmente por ataques físicos que ofrecerá más formas de daño. las acciones
 * que ocurren aquí no afectaran otros objetivos a no ser que sea ordenado
 * específicamente para afectar.
 *
 * 4. Follow Actions - Acciones de Seguimiento
 * Esta sección se dedicara a trabajos de limpieza después de las acciones de
 * los objetivos individuales. Aquí, ella  hará cosas como remover banderas 
 * inmortales -immortal flags- , comenzar eventos comunes, y más.
 *
 * 5. Finish Actions - acciones Terminadas
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
 * Ellos harán su respectivo conjunto de acciones. Los métodos para insertar
 * para la lista de acciones pueden encontrarse abajo del core del manual de
 * ayuda.
 *
 * Además, para prevenir que cada uno de sus notebox de items de su banco de 
 * datos este lleno de listas de secuencias de acciones, Hay un atajo que usted
 * puede hacer para copiar todas las acciones de Configuración, acciones
 * enteras, acciones de objetivo, acciones de seguir, y acciones terminadas con
 * apenas una línea.
 *
 * <action copy: x:y>
 *
 * Reemplace X con "item" o "skill" para establecer el tipo para el código de
 * lista de acciones para copiar directamente. El número entero y es entonces 
 * el ID atribuido para aquel tipo de objeto especifico. Por ejemplo, 
 * para copiar las secuencia de acciones de la habilidad 45º, el código seria
 * <action copy: skill:45> para cualquier cosa que acepte este código de 
 * acciones. Si usted hace uso de este notetag, el llevara prioridad sobre
 * cualquier otro custom que usted coloque en el notebox.
 *
 * ============================================================================
 * Target Typing - Digitación de Objetivo
 * ============================================================================
 *
 * Usted podrá percibir que en algunas de las acciones siguientes dirán "refer 
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
 * Lo siguiente contiene una lista de acciones que usted puede usar dentro de 
 * las cinco secuencias de acciones. Cada acción tiene una función única y 
 * requiere ciertos formatos para operar apropiadamente.
 *
 *=============================================================================
 * ACTION ANIMATION: (target), (mirror)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reproduce la animación atribuida de la habilidad/item. La animación va a
 * seleccionar automáticamente los objetivos atribuidos de la habilidad/item.
 * si el 'target' es utilizado, especifica un objetivo para reproducir la
 * animación en el. Si 'mirror' es utilizado reflejara la animación.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: action animation
 *                 action animation: target
 *                 action animation: user, mirror
 *=============================================================================
 *
 *=============================================================================
 * ACTION COMMON EVENT - EVENTO DE ACCIÓN COMÚN
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reproduce el evento común que se encuentra dentro de la lista de rasgos de
 * habilidad/item. Esto solo reproducirá el último evento común de la lista, 
 * siguiendo el proceso original del motor del juego. Nada más continuara en la
 * lista de acciones hasta que el evento común termine.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: action common event
 *=============================================================================
 *
 *=============================================================================
 * ACTION EFFECT: target
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa que el objetivo(s) tomen en daño/habilidad de curación/item y incurre
 * cualquier cambio hecho al objetivo(s) tales como los buffs y los estados.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: action effect
 *=============================================================================
 *
 *=============================================================================
 * ADD stat BUFF: target, (turns), (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Afecta al objetivo con un buff 'stat'. Remplaza 'stat' por 'hp', 'mp', 'atk'
 * ,'def', 'mat', 'mdf', 'agi', o 'luk'. Si usted incluye un número después del 
 * objetivo, le ara buff al objetivo por esa cantidad de rondas. Incluya 
 * 'show' y se mostrara al objetivo teniendo el buff aplicado en el log de
 * batalla.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: add atk buff: user, 3, show
 *                 add def buff: target, 8
 *=============================================================================
 *
 *=============================================================================
 * ADD stat DEBUFF: target, (turns), (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Afecta al objetivo con el debuff 'stat'. Reemplace 'stat' por 'hp', 'mp',
 * 'atk', 'def', 'mat', 'mdf', 'agi', o 'luk'. Si usted incluye un número
 * después del objetivo-Target-, dará debuff sobre el objetivo por esa cantidad 
 * de turnos. Incluya 'show' y se mostrara el objetivo teniendo el debuff
 * aplicado al registro de batalla.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: add atk debuff: user, 3, show
 *                 add def debuff: target, 8
 *=============================================================================
 *
 *=============================================================================
 * ADD STATE X: target, (show)
 * ADD STATE X, Y, Z: target (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Afecta al objetivo con el estado X(incluyendo Y y Z si se usa en ese formato)
 * Si 'show' esta incluido, mostrará los mensajes relacionados con el estado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: add state 5: target
 *                 add state 6, 7, 8: user, show
 *=============================================================================
 *
 *=============================================================================
 * ANIMATION X: target, (mirror)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reproduce la animación X en el objetivo. 'Mirror' hará que la animación 
 * aparezca reflejada. Tenga en cuenta que las animaciones reproducidas en los
 * personajes serán automáticamente reflejadas y configurando la opción mirror
 * será revertida, haciendo con que aparezca sin efecto alguno.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: animation 5: user
 *                 animation 6: target, mirror
 *=============================================================================
 *
 *=============================================================================
 * ANIMATION WAIT: X
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera X frames de animación, Cada frame de una animación no dura un frame
 * del juego, pero en su lugar, varios. Para facilitar, usted puede usar esto
 * para hacer que el juego espere X frames reproducidos para la animación.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: animation 5: user
 *                 animation 6: target, mirror
 *=============================================================================
 *
 *=============================================================================
 * BGM: STOP
 * BGM: MEMORIZE
 * BGM: MEMORY
 * BGM: filename, (volume), (pitch), (pan)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Cambia la música de fondo actual. "Stop" detendrá cualquier BGM de ser 
 * reproducido. 'Memorize' memoriza el BGM actual. 'Memory' repetirá una BGM
 * memorizada si hay una reproducción. Si usted escoge un filename (sin las
 * extensiones de filename), El juego va a reproducir aquella BGM en su lugar.
 * Usar esta opción abre el acceso para el volumen, pitch y pan control, siendo
 * todos estos de uso opcional. Si no se introducen valores para volumen, pitch
 * , y pan el juego usara las Configuraciones de los parámetros de este plugin.
 *
 * Filename = Nombre de archivo, Pitch = Tono, Pan = ¿Panorama?
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: bgm: stop
 *                 bgm: memorize
 *                 bgm: memory
 *                 bgm: Battle7
 *                 bgm: Theme2, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * BGS: STOP
 * BGS: MEMORIZE
 * BGS: MEMORY
 * BGS: filename, (volume), (pitch), (pan)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Cambia el sonido de fondo actual, 'Stop' detendrá cualquier BGS de ser
 * reproducido. 'Memorize' memoriza el BGS actual. 'Memory' repetirá una BGS
 * memorizada si hay una reproducción. Si usted escoge un filename (sin las
 * extensiones de filename), El juego va a reproducir aquella BGS en su lugar.
 * Usar esta opción abre el acceso para el volumen, pitch y pan control, siendo
 * todos estos de uso opcional. Si no se introducen valores para volumen, pitch
 * , y pan el juego usara las Configuraciones de los parámetros de este plugin.
 *
 * Filename = Nombre de archivo, Pitch = Tono, Pan = ¿Panorama?
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: bgs: stop
 *                 bgs: memorize
 *                 bgs: memory
 *                 bgs: City
 *                 bgs: Darkness, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * BREAK ACTION - ROTURA DE ACCIÓN
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Si desea forzar la muerte de un objetivo, incluya el comando 'force' después
 * de los objetivos.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: break action
 *=============================================================================
 *
 *=============================================================================
 * CAST ANIMATION - CARGA DE ANIMACIÓN
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reproduce una animación en la habilidad del usuario. No ocurrirá si la
 * acción es un item o el ataque normal por defecto del usuario.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: cast animation
 *=============================================================================
 *
 *=============================================================================
 * CLEAR BATTLE LOG -  LIMPIAR EL REGISTRO DE BATALLA
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Limpia todos los mensajes en la parte superior de la pantalla.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: clear battle log
 *=============================================================================
 *
 *=============================================================================
 * CHANGE SWITCH X: on/off/toggle/switch z
 * CHANGE SWITCH X..Y: on/off/toggle/switch z
 * CHANGE SWITCH X TO Y: on/off/toggle/switch z
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Cambia el interruptor del juego X a encendido[ON], apagado[OFF], alternar
 * [tooggle] (cambiando entre on/off) o para cualquier valor del interruptor Y.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: change switch 1: on
 *                 change switch 2..4: off
 *                 change switch 5 to 8: toggle
 *                 change switch 9: switch 5
 *=============================================================================
 *
 *=============================================================================
 * CHANGE VARIABLE X = Y
 * CHANGE VARIABLE X += Y
 * CHANGE VARIABLE X -= Y
 * CHANGE VARIABLE X *= Y
 * CHANGE VARIABLE X /= Y
 * CHANGE VARIABLE X %= Y
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Cambia la variable X en medio de la secuencia de acción para ser modificada
 * por el valor Y. Y puede ser tanto un número entero como una pieza de código.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: change variable 1 = 2
 *                 change variable 3 += 4
 *                 change variable 5 -= 6
 *                 change variable 7 *= 8
 *                 change variable 9 /= 10
 *                 change variable 11 %= 12
 *=============================================================================
 *
 *=============================================================================
 * COLLAPSE: target, (force)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Si el objetivo a estar muerto en este punto, este será el punto de la 
 * secuencia de acción donde usted puede solicitar a el juego matar el objetivo
 * desde que este tenga 0 de HP. Si desea forzar la muerte de un objetivo,
 * incluya el comando 'force' después de los objetivos.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: collapse: user
 *                 collapse: target, force
 *=============================================================================
 *
 *=============================================================================
 * COMMON EVENT: X
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reproduce el evento común X en ese punto de la secuencia de acción. Nada más
 * continuara hasta que el evento común termine.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: common event: 1
 *=============================================================================
 *
 *=============================================================================
 * DEATH BREAK - ROPTURA DE MUERTE
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Si es usuario muerte por cualquier motivo durante una habilidad (tanto por
 * contra-ataque o reflejo), esto forzara a las secuencias de acción restantes
 * para la parte de la habilidad/item a ser detenidas y omitidas.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: death break
 *=============================================================================
 *
 *=============================================================================
 * DISPLAY ACTION -  MOSTRAR ACCIÓN
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Muestra el nombre de la acción en la parte superior del registro de batalla.
 * Este permanecerá hasta que el registro de batalla sea limpiado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: display action
 *=============================================================================
 *
 *=============================================================================
 * EVAL: code
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Para aquellos que quieran hacer algo que el actual Battle Engine no soporte,
 * usted puede usar una función eval para que un fragmento de código ocurra.
 * tengan cuidado, aquellos que no estén familiarizados con JavaScript deberían
 * evitar la manipulación de este comando de secuencia de acción.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: eval: $gameParty.loseItem($dataItems[3], 10)
 *=============================================================================
 *
 *=============================================================================
 * GAIN ITEM X: Y           LOSE ITEM X: Y
 * GAIN WEAPON X: Y         LOSE WEAPON X: Y
 * GAIN ARMOR X: Y          LOSE ARMOR X: Y
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Si su party gana/pierde el item X, arma X, o armadura X en la cantidad Y,
 * Si usted decide omitir Y, el tendrá el valor por defecto 1.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: gain item 1: 20
 *                 lose weapon 2
 *                 gain armor 3: 50
 *=============================================================================
 *
 *=============================================================================
 * GOLD +x
 * GOLD -x
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Si su party gana/pierde el oro en medio de la batalla por la cantidad X.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: gold +2000
 *                 gold -500
 *=============================================================================
 *
 *=============================================================================
 * IF ... ELSE STATEMENTS - DECLARACIONES IF Y ELSE
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Para los que están familiarizados con programación, usted puede hacer
 * declaraciones if...else para realizar diferentes acciones basadas en
 * condiciones diferentes. Use 'if' para especificar un fragmento de código
 * para ser ejecutado, si una condición especificada es verdadera. Use 'else'
 * para especificar un fragmento de código para ser ejecutado, si la misma
 * condición es falsa. Use 'else if' para especificar una nueva condicion
 * para probar, si la primera condición es falsa. Use 'end' para especificar
 * en donde esas condiciones van a terminar.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso:
 *      if $gameSwitches.value(1)
 *          action effect
 *      else if $gameSwitches.value(2)
 *          action effect
 *          action effect
 *      else
 *          action effect
 *          action effect
 *          action effect
 *      end
 *
 * *Nota: Usted no necesita indentar el código para hacerlo funcionar. El
 * solo obtiene una apariencia mejor en sus secuencias de acciones .
 * 
 * Indentar = Mover un bloque de texto
 *=============================================================================
 *
 *=============================================================================
 * IMMORTAL: targets, true/false
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Establece los objetivos a un estado de inmortalidad para que esos no mueran
 * en medio de un ataque. Esto es para asegurar que cada efecto de acción
 * acontezca.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: immortal: targets true
 *=============================================================================
 *
 *=============================================================================
 * HP +X: target, (show)
 * HP -X: target, (show)
 * HP +X%: target, (show)
 * HP -X%: target, (show)
 * HP +VARIABLE X: target, (show)
 * HP -VARIABLE X: target, (show)
 * HP +VARIABLE X%: target, (show)
 * HP -VARIABLE X%: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Objetivo(s) ganan HP igual a los valores de X. Para mostrar el popup,
 * inserta 'show' después de objetivo en la línea de secuencia de acción.  
 * Incluir 'show' es totalmente opcional. Si 'show' es omitido, ningún popup 
 * será mostrado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: hp +500: user
 *                 hp -variable 5: target
 *                 hp +25%: target
 *                 hp -variable 7: user
 *=============================================================================
 *
 *=============================================================================
 * ME: STOP
 * ME: filename, (volume), (pitch), (pan)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa que se reproduzca en batalla música ME. 'Stop' detendrá cualquier ME
 * de ser reproducido, Si usted escoge un filename (sin las extensiones de
 * filename), el juego reproducirá aquella ME instantáneamente. Usar esta 
 * opción abre acceso para el volumen, pitch, y pan control, siendo estos de
 * uso opcional, Si ningún valor es colocado para volumen, pitch, y pan, el
 * juego usara las Configuraciones de los parámetros de este plugin.
 * 
 * Filename = Nombre de archivo, Pitch = Tono, Pan = ¿Panorama?
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: me: stop
 *                me: Victory1
 *                me: Darkness, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * MOTION WAIT: target
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Hace que el juego espere 12 frames si el(los) objetivo(s) realizan una 
 * acción a un personaje, Se el(los) objetivo(s) no es un personaje, se realiza
 * la acción sin espera alguna.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: motion wait: user
 *=============================================================================
 *
 *=============================================================================
 * MP +X: target, (show)
 * MP -X: target, (show)
 * MP +X%: target, (show)
 * MP -X%: target, (show)
 * MP +VARIABLE X: target, (show)
 * MP -VARIABLE X: target, (show)
 * MP +VARIABLE X%: target, (show)
 * MP -VARIABLE X%: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Objetivo(s) gana(n) MP igual a los valores de X. Para mostrar el popup,
 * inserta 'show' después de objetivo en la línea de secuencia de acción.
 * incluye 'show' es totalmente opcional. Si 'show' es omitido, ningún popup
 * será mostrado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: mp +500: user
 *                 mp -variable 5: target
 *                 mp +25%: target
 *                 mp -variable 7: user
 *=============================================================================
 *
 *=============================================================================
 * PERFORM ACTION - REALIZAR ACCIÓN
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa en los personajes a dar un paso al frente y desenfundar su arma, 
 * atacar, sin embargo el movimiento es determinado automáticamente por el
 * juego.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: perform action
 *=============================================================================
 *
 *=============================================================================
 * PERFORM FINISH - REALIZAR FINAL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa al personaje a ser movido de regreso para su posición inicial.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: perform finish
 *=============================================================================
 *
 *=============================================================================
 * PERFORM START - REALIZAR INICIO
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa al personaje a ser movido al frente de su posición inicial.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: perform start
 *=============================================================================
 *
 *=============================================================================
 * REFRESH STATUS -  ACTUALIZAR ESTADO
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Actualiza la ventana de estados en medio de una secuencia de acción.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: refresh status
 *=============================================================================
 *
 *=============================================================================
 * REMOVE stat BUFF: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Remueve el buff 'stat' el objetivo. Reemplace 'stat' con 'hp', 'mp', 'atk',
 * 'def', 'mat', 'mdf', 'agi', o 'luk'. Incluya 'show' y el mostrara el 
 * objetivo teniendo el buff removido en el registro de batalla.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: remove atk buff: user, show
 *                 remove def buff: target
 *=============================================================================
 *
 *=============================================================================
 * REMOVE stat DEBUFF: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Remueve el debuff 'stat' al objetivo. Remplaza 'stat' con 'hp', 'mp',
 * 'atk', 'def', 'mat', 'mdf', 'agi', o 'luk'. Incluye 'show' y el mostrara el
 * objetivo teniendo el debuff removido en el registro de batalla.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: remove atk debuff: user, show
 *                 remove def debuff: target
 *=============================================================================
 *
 *=============================================================================
 * REMOVE STATE X: target (show)
 * REMOVE STATE X, Y, Z: target (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Remueve el estado X (Incluido Y y Z si se usa en ese formato) del objetivo.
 * Si 'show' es incluido, mostrara cualquier mensaje relacionado al estado.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: remove state 5: target
 *                 remove state 6, 7, 8: user, show
 *=============================================================================
 *
 *=============================================================================
 * SE: filename, (volume), (pitch), (pan)
 * SE: PLAY OK
 * SE: PLAY CURSOR
 * SE: PLAY CANCEL
 * SE: PLAY BUZZER
 * SE: PLAY EQUIP
 * SE: PLAY SAVE
 * SE: PLAY LOAD
 * SE: PLAY BATTLE START
 * SE: PLAY ESCAPE
 * SE: PLAY ENEMY ATTACK
 * SE: PLAY ENEMY DAMAGE
 * SE: PLAY ENEMY COLLAPSE
 * SE: PLAY BOSS COLLAPSE 1
 * SE: PLAY BOSS COLLAPSE 2
 * SE: PLAY ACTOR DAMAGE
 * SE: PLAY ACTOR COLLAPSE
 * SE: PLAY RECOVERY
 * SE: PLAY MISS
 * SE: PLAY EVASION
 * SE: PLAY MAGIC EVASION
 * SE: PLAY REFLECTION
 * SE: PLAY SHOP
 * SE: PLAY USE ITEM
 * SE: PLAY USE SKILL
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Causa en la batalla a reproducir un Efecto de Sonido. Si usted escoge un
 * filename (Sin la extensión de filename), el juego reproducirá ese ME
 * instantáneamente, Usar esta opción abre acceso para el volumen, pitch, y pan
 * control, siendo estos de uso opcional, Si ningún valor es colocado para 
 * volumen, pitch, y pan, el juego usara las Configuraciones de los parámetros 
 * de este plugin. Usar las secuencias de acción con 'play x' en ellas causara
 * en el juego a reproducir un sistema de sonido establecido dentro del banco
 * de datos de RPG Maker.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: se: play enemy attack
 *                 se: Ice1
 *                 se: Laser2, 80, 100, 0
 *=============================================================================
 *
 *=============================================================================
 * TP +X: target, (show)
 * TP -X: target, (show)
 * TP +X%: target, (show)
 * TP -X%: target, (show)
 * TP +VARIABLE X: target, (show)
 * TP -VARIABLE X: target, (show)
 * TP +VARIABLE X%: target, (show)
 * TP -VARIABLE X%: target, (show)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Objetivo(s) gana(n) TP igual a los valores de X. Para mostrar el popup,
 * inserta 'show' después de objetivo en la línea de secuencia de acción.
 * incluir 'show' es enteramente opcional. Si 'show' es omitido, ningún popup
 * será mostrado. Para que TP muestre popups, otro plugin será necesario.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: tp +500: user
 *                 tp -variable 5: target
 *                 tp +25%: target
 *                 tp -variable 7: user
 *=============================================================================
 *
 *=============================================================================
 * WAIT: frames
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Hace que el juego espere una cierta cantidad de frames antes de ir a la
 * próxima acción en la secuencia de acciones.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait: 60
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR ANIMATION -  ESPERAR POR ANIMACIÓN
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera a que todas las animaciones terminen antes de pasar a la próxima
 * acción en la secuencia de acciones.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait for animation
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR EFFECT - ESPERAR POR EFECTO
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera a que todos los efectos terminen de ejecutar antes de continuar.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait for effect
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR MOVEMENT -  ESPERAR POR MOVIMIENTO
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera a que todos los movimientos del combatiente terminen antes de pasar
 * a la próxima acción en la secuencia de acciones.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait for movement
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR NEW LINE - ESPERAR POR UNA NUEVA LÍNEA
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera por una nueva línea para aparecer en la ventana de registro antes de  
 * pasar a la próxima acción en la secuencia de acciones.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait for new line
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR POPUPS - ESPERAR POR POPUPS
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera a que todos los popups terminen de reproducirse antes de pasar a la
 * siguiente acción.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait for popups
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.09:
 * - Fixed a bug that didn't allow for HP and MP buff/debuff removal.
 *
 * Version 1.08:
 * - Added 'Break Action' action sequence effect to completely cancel out all
 * of the remaining action effects.
 *
 * Version 1.07:
 * - Fixed a bug with the forcing a Collapse action sequence.
 *
 * Version 1.06:
 * - If using the Add State action sequence to add the Death state, it will
 * remove immortality settings.
 *
 * Version 1.05:
 * - Optimized status window to refresh at a minimum.
 *
 * Version 1.04:
 * - Updated help file to include Charácter X for target typing.
 *
 * Version 1.03:
 * - Fixed a bug that didn't make the sounds played work properly (again).
 *
 * Version 1.02:
 * - Fixed a bug that didn't make the sounds played work properly.
 *
 * Version 1.01:
 * - Fixed a small bug that didn't allow Change Variable to work properly with
 * evaluated strings.
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

if (Imported.YEP_BattleEngineCore) {

//=============================================================================
// Parameters
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack1');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.SoundVolume = Number(Yanfly.Parameters['Default Volume']);
Yanfly.Param.SoundPitch = Number(Yanfly.Parameters['Default Pitch']);
Yanfly.Param.SoundPan = Number(Yanfly.Parameters['Default Pan']);

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP1.BattleManager_processActionSequence =
    BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // ADD X BUFF
  if (actionName.match(/ADD[ ](.*)[ ]BUFF/i)) {
    return this.actionAddBuff(actionName, actionArgs);
  }
  // ADD X DEBUFF
  if (actionName.match(/ADD[ ](.*)[ ]DEBUFF/i)) {
    return this.actionAddDebuff(actionName, actionArgs);
  }
  // ADD STATE X
  if (actionName.match(/(?:ADD_STATE|ADD STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    return this.actionAddState(actionName, actionArgs);
  }
  // ANIMATION X
  if (actionName.match(/ANIMATION[ ](\d+)/i)) {
    return this.actionAnimation(parseInt(RegExp.$1), actionArgs);
  }
  // BGM, MUSIC, SONG
  if (['BGM', 'MUSIC', 'SONG'].contains(actionName)) {
    return this.actionBgmPlay(actionArgs);
  }
  // BGS, AMBIENCE
  if (['BGS', 'AMBIENCE'].contains(actionName)) {
    return this.actionBgsPlay(actionArgs);
  }
  // BREAK ACTION
  if (actionName === 'BREAK ACTION') {
    return this.actionBreakAction();
  }
  // COLLAPSE: target, (force)
  if (actionName === 'COLLAPSE') {
    return this.actionCollapse(actionArgs);
  }
  // COMMON EVENT: event id
  if (actionName === 'COMMON EVENT') {
    return this.actionCommonEvent(actionArgs[0]);
  }
  // CHANGE SWITCH X
  if (actionName.match(/CHANGE[ ]SWITCH[ ](.*)/i)) {
    return this.actionChangeSwitch(actionName, actionArgs);
  }
  // CHANGE VARIABLE X
  if (actionName.match(/CHANGE[ ]VARIABLE[ ](.*)/i)) {
    return this.actionChangeVariable(actionName);
  }
  // EVAL, SCRIPT
  if (['EVAL', 'SCRIPT'].contains(actionName)) {
    return this.actionEval(actionArgs);
  }
  // GAIN ITEM (item, weapon, armor) X
  if (actionName.match(/GAIN[ ](.*)[ ](\d+)/i) ||
  actionName.match(/LOSE[ ](.*)[ ](\d+)/i)) {
    return this.actionGainItem(actionName, actionArgs);
  }
  // GOLD +/- VALUE
  if (actionName.match(/GOLD[ ]([\+\-]\d+)/i)) {
    return this.actionGoldModify(parseInt(RegExp.$1));
  }
  // ME, FANFARE
  if (['ME', 'FANFARE'].contains(actionName)) {
    return this.actionMePlay(actionArgs);
  }
  // REFRESH STATUS, REFRESH WINDOW
  if (['REFRESH STATUS', 'REFRESH WINDOW'].contains(actionName)) {
    return this.actionRefreshStatus();
  }
  // REMOVE X BUFF
  if (actionName.match(/REMOVE[ ](.*)[ ]BUFF/i)) {
    return this.actionRemoveBuff(actionName, actionArgs);
  }
  // REMOVE X DEBUFF
  if (actionName.match(/REMOVE[ ](.*)[ ]DEBUFF/i)) {
    return this.actionRemoveDebuff(actionName, actionArgs);
  }
  // REMOVE STATE X
  if
  (actionName.match(/(?:REMOVE_STATE|REMOVE STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    return this.actionRemoveState(actionName, actionArgs);
  }
  // SE, SOUND, SFX
  if (['SE', 'SOUND', 'SFX'].contains(actionName)) {
    return this.actionSePlay(actionArgs);
  }
  // HP +/- VALUE
  if (actionName.match(/HP[ ](.*)/i)) {
    return this.actionHpModify(actionName, actionArgs);
  }
  // MP +/- VALUE
  if (actionName.match(/MP[ ](.*)/i)) {
    return this.actionMpModify(actionName, actionArgs);
  }
  // TP +/- VALUE
  if (actionName.match(/TP[ ](.*)/i)) {
    return this.actionTpModify(actionName, actionArgs);
  }
  return Yanfly.ASP1.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

BattleManager.getParamId = function(stat) {
    switch (stat) {
    case 'HP':
    case 'MAXHP':
    case 'MAX HP':
      return 0;
      break;
    case 'MP':
    case 'MAXMP':
    case 'MAX MP':
    case 'SP':
    case 'MAXSP':
    case 'MAX SP':
      return 1;
      break;
    case 'ATK':
    case 'STR':
      return 2;
      break;
    case 'DEF':
      return 3;
      break;
    case 'MAT':
    case 'INT' || 'SPI':
      return 4;
      break;
    case 'MDF':
    case 'RES':
      return 5;
      break;
    case 'AGI':
    case 'SPD':
      return 6;
      break;
    case 'LUK':
      return 7;
      break;
    }
    return -1;
};

BattleManager.actionAddBuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/ADD[ ](.*)[ ]BUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (actionArgs[1] && parseInt(actionArgs[1]) > 0) {
    var turns = parseInt(actionArgs[1]);
  } else {
    var turns = 5;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    target.addBuff(paramId, turns);
    if (show) this._logWindow.displayActionResults(this._subject, target);
  }, this);
  return true;
};

BattleManager.actionAddDebuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/ADD[ ](.*)[ ]DEBUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (actionArgs[1] && parseInt(actionArgs[1]) > 0) {
    var turns = parseInt(actionArgs[1]);
  } else {
    var turns = 5;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    target.addDebuff(paramId, turns);
    if (show) this._logWindow.displayActionResults(this._subject, target);
  }, this);
  return true;
};

BattleManager.actionAddState = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/(?:ADD_STATE|ADD STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    var states = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
  } else {
    return true;
  }
  targets.forEach(function(target) {
    for (var i = 0; i < states.length; ++i) {
      stateId = states[i];
      if (stateId === target.deathStateId()) {
        if (target._prevImmortalState === false) target.forceRemoveImmortal();
      }
      target.addState(stateId);
      if (show) this._logWindow.displayActionResults(this._subject, target);
    }
  }, this);
  return true;
};

BattleManager.actionAnimation = function(aniId, actionArgs) {
  if (aniId <= 0) return;
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var mirror = false;
  if (actionArgs[1] && actionArgs[1].toUpperCase() === 'MIRROR') mirror = true;
  this._logWindow.showNormalAnimation(targets, aniId, mirror);
  return true;
};

BattleManager.actionBgmPlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'STOP') {
    AudioManager.stopBgm();
  } else if (actionArgs[0].toUpperCase() === 'MEMORIZE') {
    this._battleMemorizedBgm = AudioManager.saveBgm();
    return true;
  } else if (actionArgs[0].toUpperCase() === 'MEMORY') {
    if (this._battleMemorizedBgm) {
      AudioManager.replayBgm(this._battleMemorizedBgm);
    }
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var bgm = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playBgm(bgm);
  }
  return true;
};

BattleManager.actionBgsPlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'STOP') {
    AudioManager.stopBgs();
  } else if (actionArgs[0].toUpperCase() === 'MEMORIZE') {
    this._battleMemorizedBgs = AudioManager.saveBgs();
    return true;
  } else if (actionArgs[0].toUpperCase() === 'MEMORY') {
    if (this._battleMemorizedBgs) {
      AudioManager.replayBgs(this._battleMemorizedBgs);
    }
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var bgs = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playBgs(bgs);
  }
  return true;
};

BattleManager.actionBreakAction = function() {
    this._targets = [];
    this._actionList = [];
    this._individualTargets = [];
    this._phase = 'phaseChange';
    return false;
};

BattleManager.actionCollapse = function(actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  var force = false;
  if (actionArgs[1]) var force = (actionArgs[1].toUpperCase() === 'FORCE');
  targets.forEach(function(target) {
    if (force) {
      target.removeImmortal();
      target.addState(target.deathStateId());
    }
    if (target.isDeathStateAffected()) target.performCollapse();

  }, this);
  return false;
};

BattleManager.actionCommonEvent = function(id) {
  $gameTemp.reserveCommonEvent(id);
  return false;
};

BattleManager.actionChangeSwitch = function(actionName, actionArgs) {
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
  var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  var switches = [];
  if (actionName.match(/SWITCH[ ](\d+)/i)) {
    switches = [parseInt(RegExp.$1)];
  } else if (actionName.match(/SWITCH[ ](\d+)..(\d+)/i)) {
    switches = [getRange(parseInt(RegExp.$1), parseInt(RegExp.$2))];
  } else if (actionName.match(/SWITCH[ ](\d+)[ ]TO[ ](\d+)/i)) {
      switches = [getRange(parseInt(RegExp.$1), parseInt(RegExp.$2))];
  } else {
    return true;
  }
  var result = actionArgs[0].toUpperCase();
  var value;
  if (['ON', 'TRUE'].contains(result)) {
    value = true;
  } else if (['OFF', 'FALSE'].contains(result)) {
    value = false;
  } else if (['TOGGLE', 'OPPOSITE', 'REVERSE'].contains(result)) {
    value = 'toggle';
  } else if (result.match(/SWITCH[ ](\d+)/i)) {
    value = $gameSwitches.value(parseInt(RegExp.$1));
  }
  switches.forEach(function(switchId) {
    if (value === 'toggle') {
      $gameSwitches.setValue(switchId, !$gameSwitches.value(switchId));
    } else {
      $gameSwitches.setValue(switchId, value);
    }
  }, this);
  return true;
};

BattleManager.actionChangeVariable = function(actionName) {
  var cV1 =
  /CHANGE[ ](?:VARIABLE|VAR)[ ](\d+)[ ](.*)[ ](?:VARIABLE|VAR)[ ](\d+)/i;
  var cV2 = /CHANGE[ ](?:VARIABLE|VAR)[ ](\d+)[ ](.*)[ ](.*)/i;
  var subject = this._subject;
  var user = this._subject;
  var target = this._targets[0];
  var targets = this._targets;
  var action = this._action;
  var item = this._action.item();
  if (this._actSeq[0].match(cV1)) {
    var mainVar = parseInt(RegExp.$1);
    var operation = String(RegExp.$2);
    var editVar = $gameVariables.value(parseInt(RegExp.$3));
  } else if (this._actSeq[0].match(cV2)) {
    var mainVar = parseInt(RegExp.$1);
    var operation = String(RegExp.$2);
    var editVar = eval(String(RegExp.$3));
  } else {
    return true;
  }
  var mainValue = $gameVariables.value(mainVar);
  if (['='].contains(operation)) {
    $gameVariables.setValue(mainVar, eval(editVar));
  } else if (['+=', '+'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue + eval(editVar));
  } else if (['-=', '-'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue - eval(editVar));
  } else if (['*=', '*'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue * eval(editVar));
  } else if (['/=', '/'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue / eval(editVar));
  } else if (['%=', '%'].contains(operation)) {
    $gameVariables.setValue(mainVar, mainValue % eval(editVar));
  }
  return true;
};

BattleManager.actionEval = function(actionArgs) {
    if (actionArgs.length < 1) return true;
    var subject = this._subject;
    var user = this._subject;
    var target = this._targets[0];
    var targets = this._targets;
    var action = this._action;
    var item = this._action.item();
    var text = String(actionArgs[0]);
    for (var i = 1; i < actionArgs.length; ++i) {
        text = text + ', ' + String(actionArgs[i]);
    }
    eval(text);
    return false;
};

BattleManager.actionGainItem = function(actionName, actionArgs) {
    var gainItem;
    var type;
    var itemId;
    if (actionName.match(/GAIN[ ](.*)[ ](\d+)/i)) {
      gainItem = true;
      type = String(RegExp.$1).toUpperCase();
      itemId = parseInt(RegExp.$2);
    } else if (actionName.match(/LOSE[ ](.*)[ ](\d+)/i)) {
      gainItem = false;
      type = String(RegExp.$1).toUpperCase();
      itemId = parseInt(RegExp.$2);
    } else {
      return true;
    }
    var item;
    if (type === 'ITEM') {
      item = $dataItems[itemId];
    } else if (['WPN', 'WEAPON'].contains(type)) {
      item = $dataWeapons[itemId];
    } else if (['ARM', 'ARMOR', 'ARMOUR'].contains(type)) {
      item = $dataArmors[itemId];
    } else {
      return true;
    }
    var amount = Math.max(1, parseInt(actionArgs[0]));
    if (isNaN(amount)) amount = 1;
    if (gainItem)  $gameParty.gainItem(item, amount);
    if (!gainItem) $gameParty.loseItem(item, amount);
    return true;
};

BattleManager.actionGoldModify = function(value) {
    $gameParty.gainGold(value);
    return true;
};

BattleManager.actionHpModify = function(actionName, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return false;
    var change;
    var percent;
    if (actionName.match(/HP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = false;
    } else if
    (actionName.match(/HP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)([%ï¼…])/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = true;
    } else if (actionName.match(/HP[ ]([\+\-]\d+)([%ï¼…])/i)) {
      change = parseInt(RegExp.$1);
      percent = true;
    } else if (actionName.match(/HP[ ]([\+\-]\d+)/i)) {
      change = parseInt(RegExp.$1);
      percent = false;
    } else {
      return false;
    }
    var show = false;
    for (var i = 0; i < actionArgs.length; ++i) {
      var actionArg = actionArgs[i];
      if (actionArg.toUpperCase() === 'SHOW') show = true;
    }
    var value;
    targets.forEach(function(target) {
      target.clearResult();
      value = percent ? (target.mhp * change * 0.01) : change;
      target.gainHp(parseInt(value));
      if (show) {
        target.startDamagePopup();
        this._logWindow.displayActionResults(this._subject, target);
      }
    }, this);
    return true;
};

BattleManager.actionMePlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'STOP') {
    AudioManager.stopMe();
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var me = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playMe(me);
  }
  return true;
};

BattleManager.actionMpModify = function(actionName, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return false;
    var change;
    var percent;
    if (actionName.match(/MP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = false;
    } else if
    (actionName.match(/MP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)([%ï¼…])/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = true;
    } else if (actionName.match(/MP[ ]([\+\-]\d+)([%ï¼…])/i)) {
      change = parseInt(RegExp.$1);
      percent = true;
    } else if (actionName.match(/MP[ ]([\+\-]\d+)/i)) {
      change = parseInt(RegExp.$1);
      percent = false;
    } else {
      return false;
    }
    var show = false;
    for (var i = 0; i < actionArgs.length; ++i) {
      var actionArg = actionArgs[i];
      if (actionArg.toUpperCase() === 'SHOW') show = true;
    }
    var value;
    targets.forEach(function(target) {
      target.clearResult();
      value = percent ? (target.mmp * change * 0.01) : change;
      target.gainMp(parseInt(value));
      if (show) {
        target.startDamagePopup();
        this._logWindow.displayActionResults(this._subject, target);
      }
    }, this);
    return true;
};

BattleManager.actionRefreshStatus = function() {
    this._statusWindow.refresh();
    return false;
};

BattleManager.actionRemoveBuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/REMOVE[ ](.*)[ ]BUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    if (target.isBuffAffected(paramId)) {
      target.removeBuff(paramId);
      if (show) this._logWindow.displayActionResults(this._subject, target);
    }
  }, this);
  return true;
};

BattleManager.actionRemoveDebuff = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if (actionName.match(/REMOVE[ ](.*)[ ]DEBUFF/i)) {
    var paramId = this.getParamId(String(RegExp.$1).toUpperCase());
  } else {
    return true;
  }
  if (paramId < 0) return true;
  targets.forEach(function(target) {
    if (target.isDebuffAffected(paramId)) {
      target.removeBuff(paramId);
      if (show) this._logWindow.displayActionResults(this._subject, target);
    }
  }, this);
  return true;
};

BattleManager.actionRemoveState = function(actionName, actionArgs) {
  var targets = this.makeActionTargets(actionArgs[0]);
  if (targets.length < 1) return false;
  var show = false;
  for (var i = 0; i < actionArgs.length; ++i) {
    var actionArg = actionArgs[i];
    if (actionArg.toUpperCase() === 'SHOW') show = true;
  }
  if
  (actionName.match(/(?:REMOVE_STATE|REMOVE STATE)[ ](\d+(?:\s*,\s*\d+)*)/i)) {
    var states = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
  } else {
    return true;
  }
  targets.forEach(function(target) {
    for (var i = 0; i < states.length; ++i) {
      stateId = states[i];
      if (target.isStateAffected(stateId)) {
        target.removeState(stateId);
        if (show) this._logWindow.displayActionResults(this._subject, target);
      }
    }
  }, this);
  return true;
};

BattleManager.actionSePlay = function(actionArgs) {
  if (actionArgs.length < 1) return true;
  if (actionArgs[0].toUpperCase() === 'PLAY CURSOR') {
    SoundManager.playCursor();
  } else if (actionArgs[0].toUpperCase() === 'PLAY OK') {
    SoundManager.playOk();
  } else if (actionArgs[0].toUpperCase() === 'PLAY CANCEL') {
    SoundManager.playCancel();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BUZZER') {
    SoundManager.playBuzzer();
  } else if (actionArgs[0].toUpperCase() === 'PLAY EQUIP') {
    SoundManager.playEquip();
  } else if (actionArgs[0].toUpperCase() === 'PLAY SAVE') {
    SoundManager.playSave();
  } else if (actionArgs[0].toUpperCase() === 'PLAY LOAD') {
    SoundManager.playLoad();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BATTLE START') {
    SoundManager.playBattleStart();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ESCAPE') {
    SoundManager.playEscape();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ENEMY ATTACK') {
    SoundManager.playEnemyAttack();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ENEMY DAMAGE') {
    SoundManager.playEnemyDamage();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ENEMY COLLAPSE') {
    SoundManager.playEnemyCollapse();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BOSS COLLAPSE 1') {
    SoundManager.playBossCollapse1();
  } else if (actionArgs[0].toUpperCase() === 'PLAY BOSS COLLAPSE 2') {
    SoundManager.playBossCollapse2();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ACTOR DAMAGE') {
    SoundManager.playActorDamage();
  } else if (actionArgs[0].toUpperCase() === 'PLAY ACTOR COLLAPSE') {
    SoundManager.playActorCollapse();
  } else if (actionArgs[0].toUpperCase() === 'PLAY RECOVERY') {
    SoundManager.playRecovery();
  } else if (actionArgs[0].toUpperCase() === 'PLAY MISS') {
    SoundManager.playMiss();
  } else if (actionArgs[0].toUpperCase() === 'PLAY EVASION') {
    SoundManager.playEvasion();
  } else if (actionArgs[0].toUpperCase() === 'PLAY MAGIC EVASION') {
    SoundManager.playMagicEvasion();
  } else if (actionArgs[0].toUpperCase() === 'PLAY REFLECTION') {
    SoundManager.playReflection();
  } else if (actionArgs[0].toUpperCase() === 'PLAY SHOP') {
    SoundManager.playShop();
  } else if (actionArgs[0].toUpperCase() === 'PLAY USE ITEM') {
    SoundManager.playUseItem();
  } else if (actionArgs[0].toUpperCase() === 'PLAY USE SKILL') {
    SoundManager.playUseSkill();
  } else {
    var name = actionArgs[0];
    if (!name) return true;
    var vol = actionArgs[1] || Yanfly.Param.SoundVolume;
    var pitch = actionArgs[2] || Yanfly.Param.SoundPitch;
    var pan = actionArgs[3] || Yanfly.Param.SoundPan;
    var se = {
      name: name,
      volume: vol,
      pitch: pitch,
      pan: pan
    };
    AudioManager.playSe(se);
  }
  return true;
};

BattleManager.actionTpModify = function(actionName, actionArgs) {
    var targets = this.makeActionTargets(actionArgs[0]);
    if (targets.length < 1) return false;
    var change;
    var percent;
    if (actionName.match(/TP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = false;
    } else if
    (actionName.match(/TP[ ]([+-])(?:VARIABLE|VAR)[ ](\d+)([%ï¼…])/i)) {
      change = parseInt($gameVariables.value(parseInt(RegExp.$2)));
      if (String(RegExp.$1) === '-') change *= -1;
      percent = true;
    } else if (actionName.match(/TP[ ]([\+\-]\d+)([%ï¼…])/i)) {
      change = parseInt(RegExp.$1);
      percent = true;
    } else if (actionName.match(/TP[ ]([\+\-]\d+)/i)) {
      change = parseInt(RegExp.$1);
      percent = false;
    } else {
      return false;
    }
    var show = false;
    for (var i = 0; i < actionArgs.length; ++i) {
      var actionArg = actionArgs[i];
      if (actionArg.toUpperCase() === 'SHOW') show = true;
    }
    var value;
    targets.forEach(function(target) {
      target.clearResult();
      value = percent ? (target.maxTp() * change * 0.01) : change;
      target.gainTp(parseInt(value));
      if (show) {
        target.startDamagePopup();
        this._logWindow.displayActionResults(this._subject, target);
      }
    }, this);
    return true;
};

//=============================================================================
// End of File
//=============================================================================
};
