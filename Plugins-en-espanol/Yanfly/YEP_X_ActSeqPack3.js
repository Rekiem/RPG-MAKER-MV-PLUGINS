//=============================================================================
// Yanfly Engine Plugins - Battle Engine Extension - Action Sequence Pack 3
// YEP_X_ActSeqPack3.js
// Traducción al español: Rekiem
//=============================================================================

var Imported = Imported || {};
Imported.YEP_X_ActSeqPack3 = true;

var Yanfly = Yanfly || {};
Yanfly.ASP3 = Yanfly.ASP3 || {};

//=============================================================================
 /*:
 * @plugindesc v1.01 (Requires YEP_BattleEngineCore.js) Control de cámara 
 * es agregado a las secuencias de acción de Battle Engine Core.
 * @author Yanfly Engine Plugins (Es)
 *
 * @param Camera Option
 * @desc Opciones de texto usadas para el movimiento de cámara 
 * mostrado en la batalla.
 * @default Battle Camera
 *
 * @help
 * ============================================================================
 * Introducción
 * ============================================================================
 *
 * El plugin de Action Sequence Pack 3 es un plugin de extensión para el Battle
 * Engine Core y Yanfly Engine Plugins. Este plugin de extensión no funcionara
 * sin el plugin principal.
 *
 * Este plugin de extensión contiene las funciones más básicas usadas para
 * personalizar secuencias de acción en una escala visual. Este plugin se 
 * centra en el control de la cámara y zoom de la ventana.
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
 * 1. Setup Actions -  acciones de Configuración
 * Preparan el combatiente activo antes de ejecutar la mayor parte de la acción 
 * y sus efectos individuales. Normalmente lo que usted ve Aquí son cosas como
 * el combatiente activo se mueve un poco para adelante, desenfundando su arma,
 * etc. esta etapa se producirá antes que el combatiente activo gaste el costo
 * de habilidad o item.
 *
 * 2. Whole Actions - acciones Enteras
 * Estas acciones van a afectar a todos los objetivos simultáneamente. Aunque
 * esta sección no necesita ser usada, la mayoría de las acciones van a usar 
 * esto para mostrar animaciones sobre todos los enemigos. Esta etapa ocurre
 * después del costo de habilidad e item.
 *
 * 3. Target Actions - acciones de Objetivo
 * Esta sección afectara a todos los objetivos individualmente. Usada princi -
 * palmente por ataques físicos que ofrecerá más formas de daño. las acciones
 * que ocurren aquí no afectaran otros objetivos a no ser que sea ordenado
 * específicamente para afectar.
 *
 * 4. Follow Actions - acciones de Seguimiento
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
 * CAMERA CLAMP ON
 * CAMERA CLAMP OFF
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Por defecto, el clamp de la cámara está fijado. lo que fuerza a la cámara a
 * nunca pan fuera de los límites del campo de batalla. Sin embargo, en el caso
 * de que desee desactivar esta opción. Use 'camera clamp off' para desactivar.
 * el clamp, Sin embargo, se volverá a fijar al final de cada acción
 * 'perform finish'.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: camera clamp on
 *                 camera clamp off
 *=============================================================================
 *
 *=============================================================================
 * CAMERA FOCUS: target, (location), (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA FOCUS: target, FRONT BASE, (frames)
 * CAMERA FOCUS: target, BASE, (frames)
 * CAMERA FOCUS: target, BACK BASE, (frames)
 * CAMERA FOCUS: target, FRONT CENTER, (frames)
 * CAMERA FOCUS: target, CENTER, (frames)
 * CAMERA FOCUS: target, BACK CENTER, (frames)
 * CAMERA FOCUS: target, FRONT HEAD, (frames)
 * CAMERA FOCUS: target, HEAD, (frames)
 * CAMERA FOCUS: target, BACK HEAD, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Esta se centrara en uno o más objetivos (referente a el digitamiento del
 * objetivo) y localización. Si la localización fuera omitida, la cámara va a
 * enfocar el centro del(los) objetivo(s).
 * Nota: La cámara no pasara fuera de las fronteras de la pantalla.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: camera focus: user
 *                 camera focus: target, front, 40
 *                 camera focus: enemies, center, 30
 *=============================================================================
 *
 *=============================================================================
 * CAMERA OFFSET: DIRECTION, DISTANCE
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA OFFSET: LEFT, distance
 * CAMERA OFFSET: RIGHT, distance
 * CAMERA OFFSET: UP, distance
 * CAMERA OFFSET: DOWN, distance
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Mueve la cámara en una dirección por (distancia) cantidad.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: camera offset: left, 200
 *                 camera offset: right, Graphics.boxWidth / 4
 *                 camera offset: up, 300
 *                 camera offset: down, $gameVariables.value(3);
 *=============================================================================
 *
 *=============================================================================
 * CAMERA PAN - LOCALIZACIÓN DE LA CÁMARA
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA PAN: LEFT, distance, (frames)
 * CAMERA PAN: RIGHT, distance, (frames)
 * CAMERA PAN: UP, distance, (frames)
 * CAMERA PAN: DOWN, distance, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Desplaza(pan) la cámara de una dirección en una cierta distancia en pixels.
 * usted puede usar una combinación de izquierda/derecha y arriba/abajo para
 * realizar un pan de cámara diagonal. Usar 'frames' permitirá que usted ajuste
 * la duración del pan de cámara. Omitir 'frames' establecerá la duración del
 * pan de cámara a 30 frames.
 * Nota: La cámara no pasara fuera de las fronteras de la pantalla.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: camera pan: left, 200
 *                 camera pan: up, 250
 *                 camera pan: right, 500, 60
 *                 camera pan: down: 300, 60
 *=============================================================================
 *
 *=============================================================================
 * CAMERA SCREEN - CÁMARA DE PANTALLA
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * CAMERA SCREEN: TOP LEFT, (frames)
 * CAMERA SCREEN: FAR LEFT, (frames)
 * CAMERA SCREEN: BOTTOM LEFT, (frames)
 * CAMERA SCREEN: TOP CENTER, (frames)
 * CAMERA SCREEN: CENTER, (frames)
 * CAMERA SCREEN: BOTTOM CENTER, (frames)
 * CAMERA SCREEN: TOP RIGHT, (frames)
 * CAMERA SCREEN: FAR RIGHT, (frames)
 * CAMERA SCREEN: BOTTOM RIGHT, (frames)
 * CAMERA SCREEN: POINT, x, y, (frames)
 * CAMERA SCREEN: target, FRONT, (frames)
 * CAMERA SCREEN: target, BASE, (frames)
 * CAMERA SCREEN: target, BACK, (frames)
 * CAMERA SCREEN: target, FRONT CENTER, (frames)
 * CAMERA SCREEN: target, CENTER, (frames)
 * CAMERA SCREEN: target, BACK CENTER, (frames)
 * CAMERA SCREEN: target, FRONT TOP, (frames)
 * CAMERA SCREEN: target, TOP, (frames)
 * CAMERA SCREEN: target, BACK TOP, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Mueve la cámara para una cierta parte de la pantalla. Si usted escoge un
 * objetivo, la cámara se bloqueara en aquella parte del objetivo. Usar(frames)
 * determinara la duración del tiempo que la cámara se moverá para la localiza-
 * ción del objetivo. (Omitir frames) establecerá la duración del pan de cámara
 * a 30 frames.
 * Nota: La cámara no pasara fuera de las fronteras de la pantalla.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: camera screen: top left
 *                 camera screen: far right, 30
 *                 camera screen: point, 400, 300, 60
 *                 camera screen: user, base
 *                 camera screen: targets, base, 60
 *=============================================================================
 *
 *=============================================================================
 * RESET CAMERA: (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reinicia la localización de la cámara de regreso a la localización por
 * defecto. que es el centro del campo de batalla, Usar (frames) permitirá que
 * usted ajuste la duración en que la cámara reinicia. Omitir 'frames' estable-
 * cera la cámara al reiniciar en 30 frames.
 * Nota: La cámara no pasara fuera de las fronteras de la pantalla.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: reset camera
 *                 reset camera: 30
 *=============================================================================
 *
 *=============================================================================
 * RESET ZOOM: (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Reinicia el zoom de la cámara de regreso a el zoom por defecto. que es 100%.
 * Usar (frames) permitirá que usted ajuste la duración en que el zoom se
 * reiniciara. Omitir 'frames' restablecerá el zoom a reiniciar en 30 frames.
 * Nota: La cámara no pasara fuera de las fronteras de la pantalla.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: reset zoom
 *                 reset zoom: 30
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR CAMERA
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera a que la cámara termine el pan antes de pasar a la próxima acción en
 * la secuencia de acciones.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait for camera
 *=============================================================================
 *
 *=============================================================================
 * WAIT FOR ZOOM
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Espera a que el zoom termine de cambiar antes de pasar a la próxima acción
 * en la secuencia de acciones.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: wait for zoom
 *=============================================================================
 *
 *=============================================================================
 * ZOOM: x%, (frames)
 * ZOOM: x.y, (frames)
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * ZOOM a proporción X% o X.Y. Usar (frames) permitirá que usted ajuste la
 * duración en que el zoom ocurre. Omitir 'frames' restablecerá la duración del
 * zoom a 30 frames.
 *- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 * Ejemplo de uso: zoom: 200%
 *                 zoom: 1.5, 45
 *=============================================================================
 *
 * ============================================================================
 * Changelog
 * ============================================================================
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
// Parameter Variables
//=============================================================================

Yanfly.Parameters = PluginManager.parameters('YEP_X_ActSeqPack3');
Yanfly.Param = Yanfly.Param || {};

Yanfly.Param.ASP3CameraOption = String(Yanfly.Parameters['Camera Option']);

//=============================================================================
// BattleManager
//=============================================================================

Yanfly.ASP3.BattleManager_processActionSequence =
  BattleManager.processActionSequence;
BattleManager.processActionSequence = function(actionName, actionArgs) {
  // CAMERA CLAMP
  if (['CAMERA CLAMP ON', 'CAMERA CLAMP OFF'].contains(actionName)) {
    return this.actionCameraClamp(actionName);
  }
  // CAMERA FOCUS
  if (['CAMERA FOCUS', 'FOCUS CAMERA'].contains(actionName)) {
    return this.actionCameraFocus(actionArgs);
  }
  // CAMERA OFFSET
  if (['CAMERA OFFSET', 'OFFSET CAMERA'].contains(actionName)) {
    return this.actionCameraOffset(actionArgs);
  }
  // CAMERA PAN
  if (['CAMERA PAN', 'PAN CAMERA'].contains(actionName)) {
    return this.actionCameraPan(actionArgs);
  }
	// CAMERA SCREEN
  if (actionName === 'CAMERA SCREEN') {
    return this.actionCameraScreen(actionArgs);
  }
	// RESET CAMERA
  if (actionName === 'RESET CAMERA') {
    return this.actionResetCamera(actionArgs);
  }
	// RESET ZOOM
  if (actionName === 'RESET ZOOM') {
    return this.actionResetZoom(actionArgs);
  }
	// WAIT FOR CAMERA
  if (actionName === 'WAIT FOR CAMERA') {
    return this.actionWaitForCamera();
  }
	// WAIT FOR ZOOM
  if (actionName === 'WAIT FOR ZOOM') {
    return this.actionWaitForZoom();
  }
	// ZOOM
  if (actionName === 'ZOOM') {
    return this.actionZoom(actionArgs);
  }
  return Yanfly.ASP3.BattleManager_processActionSequence.call(this,
    actionName, actionArgs);
};

Yanfly.ASP3.BattleManager_actionPerformFinish =
		BattleManager.actionPerformFinish;
BattleManager.actionPerformFinish = function() {
    this.actionResetZoom([30]);
		this.resetCamera([30]);
    return Yanfly.ASP3.BattleManager_actionPerformFinish.call(this);
};

BattleManager.actionCameraClamp = function(actionName) {
		if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    if (actionName === 'CAMERA CLAMP ON') {
      this._cameraClamp = true;
    } else if (actionName === 'CAMERA CLAMP OFF') {
      this._cameraClamp = false;
    }
		return true;
};

BattleManager.actionCameraFocus = function(actionArgs) {
		if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    this._cameraFocusGroup = this.makeActionTargets(actionArgs[0]);
    if (this._cameraFocusGroup.length < 1) return false;
    var type = (actionArgs[1]) ? actionArgs[1].toUpperCase() : 'CENTER';
    var frames = actionArgs[2] || 30;
    if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
  		this._cameraFocusPosY = 'BASE';
    } else if (['BASE', 'FOOT', 'FEET'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
  		this._cameraFocusPosY = 'BASE';
    } else if (['BACK BASE', 'BACK FOOT', 'BACK FEET'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
  		this._cameraFocusPosY = 'BASE';
    } else if (['FRONT CENTER', 'FRONT MIDDLE', 'FRONT'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
  		this._cameraFocusPosY = 'MIDDLE';
    } else if (['CENTER', 'MIDDLE'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
  		this._cameraFocusPosY = 'MIDDLE';
    } else if (['BACK CENTER', 'BACK MIDDLE', 'BACK'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
  		this._cameraFocusPosY = 'MIDDLE';
    } else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
      this._cameraFocusPosX = 'FRONT';
  		this._cameraFocusPosY = 'TOP';
    } else if (['HEAD', 'TOP'].contains(type)) {
      this._cameraFocusPosX = 'MIDDLE';
  		this._cameraFocusPosY = 'TOP';
    } else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
      this._cameraFocusPosX = 'BACK';
  		this._cameraFocusPosY = 'TOP';
    } else {
      this._cameraFocusPosX = 'MIDDLE';
      this._cameraFocusPosY = 'MIDDLE';
    }
    $gameScreen.setCameraDuration(frames)
		return true;
};

BattleManager.actionCameraOffset = function(actionArgs) {
		if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
		if (['LEFT'].contains(cmd)) {
			this._cameraOffsetX = -1 * eval(actionArgs[1]) || 100;;
		} else if (['RIGHT'].contains(cmd)) {
			this._cameraOffsetX = eval(actionArgs[1]) || 100;;
		} else if (['UP'].contains(cmd)) {
			this._cameraOffsetY = -1 * eval(actionArgs[1]) || 100;;
		} else if (['DOWN'].contains(cmd)) {
			this._cameraOffsetY = eval(actionArgs[1]) || 100;;
		}
		return true;
};

BattleManager.actionCameraPan = function(actionArgs) {
		if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
		var frames = 30;
		if (['LEFT'].contains(cmd)) {
			this._cameraX -= eval(actionArgs[1]) || 100;;
			frames = actionArgs[2] || 30;
		} else if (['RIGHT'].contains(cmd)) {
			this._cameraX += eval(actionArgs[1]) || 100;;
			frames = actionArgs[2] || 30;
		} else if (['UP'].contains(cmd)) {
			this._cameraY -= eval(actionArgs[1]) || 100;;
			frames = actionArgs[2] || 30;
		} else if (['DOWN'].contains(cmd)) {
			this._cameraY += eval(actionArgs[1]) || 100;;
			frames = actionArgs[2] || 30;
		}
		$gameScreen.setCameraDuration(frames)
		return true;
};

BattleManager.actionCameraScreen = function(actionArgs) {
		if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    var cmd = actionArgs[0].toUpperCase();
		var frames = 30;
		if (['TOP LEFT', 'UPPER LEFT'].contains(cmd)) {
			this._cameraX = 0;
			this._cameraY = 0;
			frames = actionArgs[1] || 30;
		} else if (['FAR LEFT', 'ABSOLUTE LEFT'].contains(cmd)) {
			this._cameraX = 0;
			this._cameraY = Graphics.boxHeight / 2;
			frames = actionArgs[1] || 30;
		} else if (['BOTTOM LEFT', 'LOWER LEFT'].contains(cmd)) {
			this._cameraX = 0;
			this._cameraY = Graphics.boxHeight;
			frames = actionArgs[1] || 30;
		} else if (['TOP CENTER', 'UPPER CENTER'].contains(cmd)) {
			this._cameraX = Graphics.boxWidth / 2;
			this._cameraY = 0;
			frames = actionArgs[1] || 30;
		} else if (['CENTER', 'MIDDLE'].contains(cmd)) {
			this._cameraX = Graphics.boxWidth / 2;
			this._cameraY = Graphics.boxHeight / 2;
			frames = actionArgs[1] || 30;
		} else if (['BOTTOM CENTER', 'LOWER CENTER'].contains(cmd)) {
			this._cameraX = Graphics.boxWidth / 2;
			this._cameraY = Graphics.boxHeight;
			frames = actionArgs[1] || 30;
		} else if (['TOP RIGHT', 'UPPER RIGHT'].contains(cmd)) {
			this._cameraX = Graphics.boxWidth;
			this._cameraY = 0;
			frames = actionArgs[1] || 30;
		} else if (['FAR RIGHT', 'ABSOLUTE RIGHT'].contains(cmd)) {
			this._cameraX = Graphics.boxWidth;
			this._cameraY = Graphics.boxHeight / 2;
			frames = actionArgs[1] || 30;
		} else if (['BOTTOM RIGHT', 'LOWER RIGHT'].contains(cmd)) {
			this._cameraX = Graphics.boxWidth;
			this._cameraY = Graphics.boxHeight;
			frames = actionArgs[1] || 30;
		} else if (['POINT', 'POSITION', 'COORDINATE', 'SCREEN', 'SCREEN POS',
    'COORDINATES'].contains(cmd)) {
			this._cameraX = eval(actionArgs[1]) || 0;
			this._cameraY = eval(actionArgs[2]) || 0;
			frames = actionArgs[3] || 30;
		} else {
			var targets = this.makeActionTargets(actionArgs[0]);
			if (targets.length < 1) return false;
			var type = actionArgs[1].toUpperCase();
      var frames = actionArgs[2] || 30;
			if (['FRONT BASE', 'FRONT FOOT', 'FRONT FEET',
			'FRONT'].contains(type)) {
				this._cameraX = this.targetPosX(targets, 'FRONT');
				this._cameraY = this.targetPosY(targets, 'BASE');
			} else if (['BASE', 'FOOT', 'FEET'].contains(type)) {
				this._cameraX = this.targetPosX(targets, 'MIDDLE');
				this._cameraY = this.targetPosY(targets, 'BASE');
			} else if (['BACK BASE', 'BACK FOOT', 'BACK FEET',
			'BACK'].contains(type)) {
				this._cameraX = this.targetPosX(targets, 'BACK');
				this._cameraY = this.targetPosY(targets, 'BASE');
			} else if (['FRONT CENTER', 'FRONT MIDDLE'].contains(type)) {
				this._cameraX = this.targetPosX(targets, 'FRONT');
				this._cameraY = this.targetPosY(targets, 'MIDDLE');
			} else if (['CENTER', 'MIDDLE'].contains(type)) {
				this._cameraX = this.targetPosX(targets, 'MIDDLE');
				this._cameraY = this.targetPosY(targets, 'MIDDLE');
			} else if (['BACK CENTER', 'BACK MIDDLE',].contains(type)) {
				this._cameraX = this.targetPosX(targets, 'BACK');
				this._cameraY = this.targetPosY(targets, 'MIDDLE');
			} else if (['FRONT HEAD', 'FRONT TOP'].contains(type)) {
				this._cameraX = this.targetPosX(targets, 'FRONT');
				this._cameraY = this.targetPosY(targets, 'TOP');
			} else if (['HEAD', 'TOP'].contains(type)) {
				this._cameraX = this.targetPosX(targets, 'MIDDLE');
				this._cameraY = this.targetPosY(targets, 'TOP');
			} else if (['BACK HEAD', 'BACK TOP'].contains(type)) {
				this._cameraX = this.targetPosX(targets, 'BACK');
				this._cameraY = this.targetPosY(targets, 'TOP');
			} else {
				return true;
			}
		}
		$gameScreen.setCameraDuration(frames)
		return true;
};

BattleManager.actionResetCamera = function(actionArgs) {
		if (!$gameSystem.isSideView()) return true;
    var duration = parseInt(actionArgs[0]) || 30;
		this.resetCamera(duration);
		return true;
};

BattleManager.actionResetZoom = function(actionArgs) {
		if (!$gameSystem.isSideView()) return true;
    var duration = parseInt(actionArgs[0]) || 30;
		$gameScreen.startZoom(1, duration);
		return true;
};

BattleManager.actionWaitForCamera = function() {
    if (!ConfigManager.battleCamera) return true;
    this._logWindow.waitForCamera();
    return false;
};

BattleManager.actionWaitForZoom = function() {
    if (!ConfigManager.battleCamera) return true;
    this._logWindow.waitForZoom();
    return false;
};

BattleManager.actionZoom = function(actionArgs) {
		if (!$gameSystem.isSideView()) return true;
    if (!ConfigManager.battleCamera) return true;
    if (actionArgs[0].match(/(\d+)([%ï¼…])/i)) {
			var scale = parseFloat(RegExp.$1 * 0.01) || 1.0;
		} else {
			var scale = parseFloat(actionArgs[0]) || 1.0;
		}
		var duration = parseInt(actionArgs[1]) || 30;
		$gameScreen.startZoom(scale, duration);
		return true;
};

Yanfly.ASP3.BattleManager_setup = BattleManager.setup;
BattleManager.setup = function(troopId, canEscape, canLose) {
    this.resetCamera();
		this.actionResetZoom([1]);
		Yanfly.ASP3.BattleManager_setup.call(this, troopId, canEscape, canLose);
};

BattleManager.resetCamera = function(duration) {
		this._cameraX = Graphics.boxWidth / 2;
		this._cameraY = Graphics.boxHeight / 2;
    this._cameraOffsetX = 0;
    this._cameraOffsetY = 0;
		this._cameraFocusGroup = [];
		this._cameraFocusPosX = 'BASE';
		this._cameraFocusPosY = 'BASE';
    this._cameraClamp = true;
    $gameScreen.setCameraDuration(duration);
};

BattleManager.cameraClamp = function() {
    return this._cameraClamp;
};

BattleManager.cameraX = function() {
		if (this._cameraFocusGroup.length > 0) {
			var value = this.cameraFocusX();
		} else {
			var value = this._cameraX;
		}
    value += this._cameraOffsetX;
		return value;
};

BattleManager.cameraY = function() {
		if (this._cameraFocusGroup.length > 0) {
			var value = this.cameraFocusY();
		} else {
			var value = this._cameraY;
		}
    value += this._cameraOffsetY;
		return value;
};

BattleManager.cameraFocusX = function() {
		var i = this.targetPosX(this._cameraFocusGroup, this._cameraFocusPosX);
		return i;
};

BattleManager.cameraFocusY = function() {
		var i = this.targetPosY(this._cameraFocusGroup, this._cameraFocusPosY);
		return i;
};

BattleManager.targetPosX = function(group, position) {
		var value = 0;
		if (position === 'MIDDLE') {
			for (var i = 0; i < group.length; ++i) {
				var battler = group[i];
				if (!battler) continue;
				value += battler.cameraPosX();
			}
		} else if (position === 'FRONT') {
			for (var i = 0; i < group.length; ++i) {
				var battler = group[i];
				if (!battler) continue;
				if (battler.isActor()) var offset = -1 * battler.spriteWidth() / 2;
				if (battler.isEnemy()) var offset = battler.spriteWidth() / 2;
				value = Math.max(battler.cameraPosX() + offset, value);
			}
			value *= group.length;
		} else if (position === 'BACK') {
			value = Graphics.boxWidth;
			for (var i = 0; i < group.length; ++i) {
				var battler = group[i];
				if (!battler) continue;
				if (battler.isActor()) var offset = battler.spriteWidth() / 2;
				if (battler.isEnemy()) var offset = -1 * battler.spriteWidth() / 2;
				value = Math.min(battler.cameraPosX() + offset, value);
			}
			value *= group.length;
		}
		value /= group.length;
		return value;
};

BattleManager.targetPosY = function(group, position) {
		var value = 0;
		if (position === 'BASE') {
			for (var i = 0; i < group.length; ++i) {
				var battler = group[i];
				if (!battler) continue;
				value = Math.max(battler.cameraPosY(), value);
			}
			value *= group.length;
		} else if (position === 'MIDDLE') {
			for (var i = 0; i < group.length; ++i) {
				var battler = group[i];
				if (!battler) continue;
				value += battler.cameraPosY() - battler.spriteHeight() / 2;
			}
		} else if (position === 'TOP') {
			value = Graphics.boxHeight;
			for (var i = 0; i < group.length; ++i) {
				var battler = group[i];
				if (!battler) continue;
				value = Math.min(battler.cameraPosY() - battler.spriteHeight(), value);
			}
			value *= group.length;
		}
		value /= group.length;
		return value;
};

//=============================================================================
// Spriteset_Battle
//=============================================================================

Spriteset_Battle.prototype.updatePosition = function() {
    var zoom = $gameScreen.zoomScale();
    var clamp = BattleManager.cameraClamp();
    this.scale.x = zoom;
    this.scale.y = zoom;
    var screenX = -1 * $gameScreen.zoomX() * zoom + Graphics.boxWidth / 2;
    var screenY = -1 * $gameScreen.zoomY() * zoom + Graphics.boxHeight / 2;
    if (clamp && zoom >= 1.0) {
      var clampX1 = -Graphics.boxWidth * zoom + Graphics.boxWidth;
      var clampY2 = -Graphics.boxHeight * zoom + Graphics.boxHeight;
      this.x = Math.round(screenX.clamp(clampX1, 0));
      this.y = Math.round(screenY.clamp(clampY2, 0));
    } else if (clamp && zoom < 1.0) {
      this.x = Math.round((Graphics.boxWidth - Graphics.boxWidth * zoom) / 2);
      this.y = Math.round((Graphics.boxHeight - Graphics.boxHeight * zoom) / 2);
    } else {
      this.x = Math.round(screenX);
      this.y = Math.round(screenY);
    }
    this.x += Math.round($gameScreen.shake());
};

//=============================================================================
// Game_Battler
//=============================================================================

Game_Battler.prototype.cameraPosX = function() {
    var value = this.spritePosX();
    return value;
};

Game_Battler.prototype.cameraPosY = function() {
    var value = this.spritePosY();
    if (Imported.YEP_X_ActSeqPack2) {
      value -= this.battler().getFloatHeight() * this.spriteHeight();
      value -= this.battler().getJumpHeight() * this.spriteHeight();
    }
    return value;
};

//=============================================================================
// Game_Screen
//=============================================================================

Yanfly.ASP3.Game_Screen_clearZoom = Game_Screen.prototype.clearZoom;
Game_Screen.prototype.clearZoom = function() {
    Yanfly.ASP3.Game_Screen_clearZoom.call(this);
		this._cameraDuration = 0;
};

Yanfly.ASP3.Game_Screen_update = Game_Screen.prototype.update;
Game_Screen.prototype.update = function() {
    Yanfly.ASP3.Game_Screen_update.call(this);
		this.updateBattleCamera();
};

Game_Screen.prototype.startZoom = function(scale, duration) {
    this._zoomScaleTarget = scale;
    this._zoomDuration = duration;
};

Game_Screen.prototype.isZooming = function() {
		return this._zoomDuration > 0;
};

Game_Screen.prototype.setCameraDuration = function(duration) {
		this._cameraDuration = duration;
};

Game_Screen.prototype.updateBattleCamera = function() {
		if (!$gameParty.inBattle()) return;
    if (this._cameraDuration > 0) {
			var d = this._cameraDuration;
			var tx = BattleManager.cameraX();
			var ty = BattleManager.cameraY();
			this._zoomX = (this._zoomX * (d - 1) + tx) / d;
			this._zoomY = (this._zoomY * (d - 1) + ty) / d;
			this._cameraDuration--;
		} else {
			this._zoomX = BattleManager.cameraX();
			this._zoomY = BattleManager.cameraY();
		}
};

Game_Screen.prototype.isBattleCameraPanning = function() {
		if ($gameParty.inBattle()) return this._cameraDuration > 0;
		return false;
};

//=============================================================================
// ConfigManager
//=============================================================================

ConfigManager.battleCamera = true;

Yanfly.ASP3.ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = Yanfly.ASP3.ConfigManager_makeData.call(this);
    config.battleCamera = this.battleCamera;
    return config;
};

Yanfly.ASP3.ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    Yanfly.ASP3.ConfigManager_applyData.call(this, config);
    this.battleCamera = this.readConfigBattleCamera(config, 'battleCamera');
};

ConfigManager.readConfigBattleCamera = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return value;
    } else {
        return true;
    }
};

//=============================================================================
// Window_Options
//=============================================================================

Yanfly.ASP3.Window_Options_addGeneralOptions =
    Window_Options.prototype.addGeneralOptions;
Window_Options.prototype.addGeneralOptions = function() {
    Yanfly.ASP3.Window_Options_addGeneralOptions.call(this);
    this.addCommand(Yanfly.Param.ASP3CameraOption, 'battleCamera');
};

//=============================================================================
// Window_BattleLog
//=============================================================================

Yanfly.ASP3.Window_BattleLog_updateWaitMode =
    Window_BattleLog.prototype.updateWaitMode;
Window_BattleLog.prototype.updateWaitMode = function() {
    if (this._waitMode === 'camera') {
      if ($gameScreen.isBattleCameraPanning()) return true;
    } else if (this._waitMode === 'zoom') {
      if ($gameScreen.isZooming()) return true;
    }
    return Yanfly.ASP3.Window_BattleLog_updateWaitMode.call(this);
};

Window_BattleLog.prototype.waitForCamera = function() {
    this.setWaitMode('camera');
};

Window_BattleLog.prototype.waitForZoom = function() {
    this.setWaitMode('zoom');
};

//=============================================================================
// Scene_Map
//=============================================================================

Yanfly.ASP3.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
Scene_Map.prototype.onMapLoaded = function() {
    Yanfly.ASP3.Scene_Map_onMapLoaded.call(this);
		$gameScreen.clearZoom();
};

//=============================================================================
// End of File
//=============================================================================
};
