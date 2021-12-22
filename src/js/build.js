/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/Dekodor.js":
/*!***************************!*\
  !*** ./src/js/Dekodor.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.AI = exports.init = exports.setCharacter = exports.setMove = exports.move = exports.OnSkull = exports.onSkull = exports.character = void 0;\r\nconst game_1 = __webpack_require__(/*! ./game */ \"./src/js/game.js\");\r\nconst Player = __webpack_require__(/*! ./Player */ \"./src/js/Player.js\");\r\nconst global_1 = __webpack_require__(/*! ./global */ \"./src/js/global.js\");\r\nconst methods_1 = __webpack_require__(/*! ./methods */ \"./src/js/methods.js\");\r\nexports.character = null;\r\nexports.onSkull = true;\r\nfunction OnSkull(bool) { exports.onSkull = bool; }\r\nexports.OnSkull = OnSkull;\r\nexports.move = \"U\";\r\nlet lastMove = 0;\r\nfunction setMove(m) { exports.move = m; }\r\nexports.setMove = setMove;\r\nfunction setCharacter(m) { exports.character = m; }\r\nexports.setCharacter = setCharacter;\r\nfunction init() {\r\n    exports.onSkull = true;\r\n    exports.move = \"U\";\r\n    lastMove = 0;\r\n    exports.character = null;\r\n    runReload = 0;\r\n    conspicuousLocal = false;\r\n}\r\nexports.init = init;\r\nlet runReload = 0, conspicuousLocal = false;\r\nfunction AI() {\r\n    if (!exports.character || !Player.character)\r\n        return;\r\n    let now = Date.now();\r\n    if (game_1.conspicuous) {\r\n        conspicuousLocal = game_1.conspicuous;\r\n    }\r\n    else if (conspicuousLocal) {\r\n        conspicuousLocal = false;\r\n        runReload = now;\r\n    }\r\n    if (!exports.character || lastMove + ((runReload + 1000 < now && !game_1.conspicuous) ? 0 : 400) >= now)\r\n        return;\r\n    let { x, y } = exports.character;\r\n    let targetMove;\r\n    if (game_1.conspicuous) {\r\n        let tx = Player.character.x - exports.character.x, ty = Player.character.y - exports.character.y;\r\n        const gD = (n) => n > 0 ? 1 : n == 0 ? 0 : -1;\r\n        let pp = [];\r\n        if (gD(tx) == -1)\r\n            pp.push(\"L\");\r\n        else if (gD(tx) == 1)\r\n            pp.push(\"R\");\r\n        if (gD(ty) == -1)\r\n            pp.push(\"U\");\r\n        else if (gD(ty) == 1)\r\n            pp.push(\"D\");\r\n        targetMove = pp[Math.floor(Math.random() * pp.length)];\r\n        let targetObject = null;\r\n        switch (targetMove) {\r\n            case \"D\":\r\n                targetObject = methods_1.getObject(x, y + 1);\r\n                break;\r\n            case \"L\":\r\n                targetObject = methods_1.getObject(x - 1, y);\r\n                break;\r\n            case \"R\":\r\n                targetObject = methods_1.getObject(x + 1, y);\r\n                break;\r\n            case \"U\":\r\n                targetObject = methods_1.getObject(x, y - 1);\r\n                break;\r\n        }\r\n        if (!targetMove)\r\n            return;\r\n        if (targetObject?.name == \"Wall\")\r\n            return AI();\r\n    }\r\n    else {\r\n        let rD = methods_1.getReverseDirection(exports.move);\r\n        let v = global_1.Direction.filter(d => {\r\n            if (d == rD)\r\n                return false;\r\n            switch (d) {\r\n                case \"D\": return methods_1.getObject(x, y + 1)?.name != \"Wall\";\r\n                case \"L\": return methods_1.getObject(x - 1, y)?.name != \"Wall\";\r\n                case \"R\": return methods_1.getObject(x + 1, y)?.name != \"Wall\";\r\n                case \"U\": return methods_1.getObject(x, y - 1)?.name != \"Wall\";\r\n            }\r\n        });\r\n        targetMove = v[Math.floor(Math.random() * v.length)];\r\n        if (v.length == 0)\r\n            targetMove = rD;\r\n    }\r\n    exports.move = targetMove;\r\n    exports.character.pos = methods_1.moveObject(exports.character.pos, exports.move);\r\n    lastMove = now;\r\n}\r\nexports.AI = AI;\r\n\n\n//# sourceURL=webpack://dekodor-game/./src/js/Dekodor.js?");

/***/ }),

/***/ "./src/js/Player.js":
/*!**************************!*\
  !*** ./src/js/Player.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.init = exports.PlayerMove = exports.setCharacter = exports.updatePlayerLastMove = exports.character = exports.playerMove = exports.playerLastMove = void 0;\r\nconst methods_1 = __webpack_require__(/*! ./methods */ \"./src/js/methods.js\");\r\nclass PlayerMoveSet extends Set {\r\n    last() { return Array.from(this)[this.size - 1]; }\r\n}\r\nexports.playerLastMove = 0;\r\nexports.playerMove = new PlayerMoveSet();\r\nexports.character = null;\r\nfunction updatePlayerLastMove() { exports.playerLastMove = Date.now(); }\r\nexports.updatePlayerLastMove = updatePlayerLastMove;\r\nfunction setCharacter(m) { exports.character = m; }\r\nexports.setCharacter = setCharacter;\r\nfunction PlayerMove() {\r\n    if (!exports.character)\r\n        return;\r\n    if (exports.playerLastMove + 250 < Date.now() && exports.playerMove.size !== 0) {\r\n        exports.character.pos = methods_1.moveObject(exports.character.pos, exports.playerMove.last());\r\n        updatePlayerLastMove();\r\n    }\r\n}\r\nexports.PlayerMove = PlayerMove;\r\nfunction init() {\r\n    exports.playerLastMove = 0;\r\n    exports.playerMove.clear();\r\n    exports.character = null;\r\n}\r\nexports.init = init;\r\n\n\n//# sourceURL=webpack://dekodor-game/./src/js/Player.js?");

/***/ }),

/***/ "./src/js/audio.js":
/*!*************************!*\
  !*** ./src/js/audio.js ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.GameAudio = void 0;\r\nclass _GameAudio extends Audio {\r\n    constructor(src, op) {\r\n        super(src);\r\n        this.playbackRate = op.speed ?? 1;\r\n        this.loop = op.loop ?? false;\r\n        this.autoplay = op.autoplay ?? false;\r\n    }\r\n    play() {\r\n        this.stop();\r\n        return super.play();\r\n    }\r\n    stop() {\r\n        super.pause();\r\n        this.currentTime = 0;\r\n    }\r\n}\r\nconst path = \"./src/mp3\";\r\nexports.GameAudio = {\r\n    \"Scary-Piano-Glissando\": new _GameAudio(`${path}/Scary-Piano-Glissando.mp3`, {\r\n        speed: 2\r\n    }),\r\n    \"Anxious-Humming\": new _GameAudio(`${path}/Anxious-Humming.mp3`, {\r\n        loop: true\r\n    })\r\n};\r\nwindow.GameAudio = exports.GameAudio;\r\n\n\n//# sourceURL=webpack://dekodor-game/./src/js/audio.js?");

/***/ }),

/***/ "./src/js/game.js":
/*!************************!*\
  !*** ./src/js/game.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.win = exports.lose = exports.conspicuous = exports.SkullCountInit = exports.SkullCount = exports.addSkullCountPick = exports.SkullCountPick = exports.currentMap = exports.currentMapSize = exports.exit = exports.openMap = void 0;\r\nconst audio_1 = __webpack_require__(/*! ./audio */ \"./src/js/audio.js\");\r\nconst Dekodor = __webpack_require__(/*! ./Dekodor */ \"./src/js/Dekodor.js\");\r\nconst Player = __webpack_require__(/*! ./Player */ \"./src/js/Player.js\");\r\nconst global_1 = __webpack_require__(/*! ./global */ \"./src/js/global.js\");\r\nconst Objects = __webpack_require__(/*! ./objects */ \"./src/js/objects.js\");\r\nconst methods_1 = __webpack_require__(/*! ./methods */ \"./src/js/methods.js\");\r\nlet musicPlayed = false;\r\nasync function openMap(map) {\r\n    alertElem.style.display = \"none\";\r\n    init();\r\n    let img = new Image();\r\n    img.src = URL.createObjectURL(await (await fetch(`./src/maps/${map}.png`)).blob());\r\n    img.onload = () => {\r\n        let canvas = document.createElement(\"canvas\");\r\n        let ctx = canvas.getContext(\"2d\");\r\n        canvas.width = img.width;\r\n        canvas.height = img.height;\r\n        ctx.drawImage(img, 0, 0, img.width, img.height);\r\n        exports.currentMapSize = [img.width, img.height];\r\n        exports.currentMap = ctx.getImageData(0, 0, img.width, img.height).data;\r\n        c_map.width = img.width;\r\n        c_map.height = img.height;\r\n        ctx_map.imageSmoothingEnabled = false;\r\n        if (!musicPlayed)\r\n            audio_1.GameAudio[\"Anxious-Humming\"].play(), musicPlayed = true;\r\n        loop();\r\n        document.onkeydown = e => {\r\n            if (!Player.character)\r\n                return;\r\n            if (global_1.DirectionKeys.includes(e.code))\r\n                Player.playerMove.add(methods_1.getDirection(e.code));\r\n        };\r\n        document.onkeyup = e => {\r\n            if (global_1.DirectionKeys.includes(e.code) && Player.playerMove.has(methods_1.getDirection(e.code)))\r\n                Player.playerMove.delete(methods_1.getDirection(e.code));\r\n        };\r\n    };\r\n}\r\nexports.openMap = openMap;\r\nfunction init() {\r\n    Player.init();\r\n    Dekodor.init();\r\n    exports.SkullCountPick = 0;\r\n    exports.SkullCount = 1;\r\n    exports.SkullCountInit = false;\r\n    _stop = false;\r\n}\r\nfunction exit() {\r\n    _stop = true;\r\n}\r\nexports.exit = exit;\r\nconst c = document.querySelector(\"#canvas\");\r\nconst c_s = document.querySelector(\"#mask\");\r\nconst c_map = document.querySelector(\"#map\");\r\nconst ctx = c.getContext(\"2d\");\r\nconst ctx_s = c_s.getContext(\"2d\");\r\nconst ctx_map = c_map.getContext(\"2d\");\r\nfunction canvasResize() {\r\n    c.width = innerWidth;\r\n    c.height = innerHeight;\r\n    ctx.imageSmoothingEnabled = false;\r\n    c_s.width = innerWidth;\r\n    c_s.height = innerHeight;\r\n    ctx_s.imageSmoothingEnabled = false;\r\n    ctx_map.imageSmoothingEnabled = false;\r\n}\r\n;\r\ncanvasResize();\r\nwindow.addEventListener(\"resize\", canvasResize);\r\nconst SPRITE = new Image();\r\nSPRITE.src = \"./sprite.png\";\r\nlet fpsInterval = 1000 / 60, then = Date.now();\r\nlet _fps = 0;\r\nlet _stop = false;\r\nfunction loop() {\r\n    if (_stop)\r\n        return;\r\n    let now = Date.now();\r\n    let elapsed = now - then;\r\n    if (elapsed > fpsInterval) {\r\n        then = now - (elapsed % fpsInterval);\r\n        Player.PlayerMove();\r\n        Dekodor.AI();\r\n        draw();\r\n        !exports.SkullCountInit && (exports.SkullCountInit = true);\r\n        updateCamera();\r\n        _fps++;\r\n    }\r\n    requestAnimationFrame(loop);\r\n}\r\nexports.SkullCountPick = 0;\r\nfunction addSkullCountPick() { return ++exports.SkullCountPick; }\r\nexports.addSkullCountPick = addSkullCountPick;\r\nexports.SkullCount = 1;\r\nexports.SkullCountInit = false;\r\nexports.conspicuous = false;\r\nlet DekodorV = false;\r\nlet scream = 0;\r\nfunction draw() {\r\n    ctx.clearRect(0, 0, c.width, c.height);\r\n    let currentMapCopy = exports.currentMap.slice(0);\r\n    for (let pos = 0; pos < exports.currentMap.length; pos += 4) {\r\n        const x = pos / 4 % exports.currentMapSize[0], y = Math.floor(pos / 4 / exports.currentMapSize[1]), c = Objects.SIZE / 2;\r\n        let needDraw = true;\r\n        if (Player.character) {\r\n            (Math.abs(Player.character.x - x) > 3 ||\r\n                Math.abs(Player.character.y - y) > 3) && (needDraw = false);\r\n        }\r\n        ctx.save();\r\n        ctx.translate(x * Objects.SIZE + c - camera.x, y * Objects.SIZE + c - camera.y);\r\n        const RGBA = methods_1.getRGBA(pos);\r\n        let obj = methods_1.getObject(RGBA);\r\n        needDraw && ctx.drawImage(SPRITE, 1 * Objects.SPRITE_SIZE, 0, Objects.SPRITE_SIZE, Objects.SPRITE_SIZE, -c, -c, Objects.SIZE, Objects.SIZE);\r\n        if (obj === null) {\r\n            ctx.restore();\r\n            continue;\r\n        }\r\n        if (Player.character?.pos == pos) {\r\n            Player.character.x = x, Player.character.y = y;\r\n        }\r\n        if (Dekodor.character?.pos == pos) {\r\n            Dekodor.setCharacter({ x, y, pos: Dekodor.character.pos });\r\n            switch (Dekodor.move) {\r\n                case \"D\":\r\n                    ctx.rotate(-180 * Math.PI / 180);\r\n                    break;\r\n                case \"L\":\r\n                    ctx.rotate(-90 * Math.PI / 180);\r\n                    break;\r\n                case \"R\":\r\n                    ctx.rotate(90 * Math.PI / 180);\r\n                    break;\r\n            }\r\n        }\r\n        if (obj.name == \"Tank-U\" && Player.character == null)\r\n            Player.setCharacter({ pos, x, y });\r\n        if (obj.name == \"Dekodor\" && Dekodor.character == null)\r\n            Dekodor.setCharacter({ pos, x, y });\r\n        if (obj.name == \"Skull\") {\r\n            if (!exports.SkullCountInit) {\r\n                if ((x + y) % 3 == 0)\r\n                    exports.SkullCount++;\r\n                else\r\n                    methods_1.setRGBA(pos, [0, 0, 0, 1]);\r\n            }\r\n            ctx.scale(.4, .4);\r\n        }\r\n        needDraw && ctx.drawImage(SPRITE, obj.spritePos * Objects.SPRITE_SIZE, 0, Objects.SPRITE_SIZE, Objects.SPRITE_SIZE, -c, -c, Objects.SIZE, Objects.SIZE);\r\n        ctx.restore();\r\n        if (obj.name == \"Dekodor\") {\r\n            methods_1.setRGBA(pos, Dekodor.onSkull ? [255, 255, 0, 255] : [0, 0, 0, 0], currentMapCopy);\r\n        }\r\n        else if (RGBA.join(\",\") === \"0,0,0,0\") {\r\n            methods_1.setRGBA(pos, [255, 255, 0, 255], currentMapCopy);\r\n        }\r\n    }\r\n    let imageData = new ImageData(currentMapCopy, exports.currentMapSize[0], exports.currentMapSize[1]);\r\n    ctx_map.putImageData(imageData, 0, 0);\r\n    if (!Player.character || 0)\r\n        return;\r\n    exports.conspicuous = false;\r\n    ctx_s.save();\r\n    ctx_s.fillRect(0, 0, c_s.width, c_s.height);\r\n    ctx_s.translate(-camera.x, -camera.y);\r\n    ctx_s.globalCompositeOperation = \"destination-out\";\r\n    ctx_s.fillRect(Player.character.x * Objects.SIZE, Player.character.y * Objects.SIZE, Objects.SIZE, Objects.SIZE);\r\n    const radius = 2;\r\n    const rect = (x = 0, y = 0) => {\r\n        ctx_s.save();\r\n        let p = Player.character;\r\n        ctx_s.translate(p.x * Objects.SIZE + x * Objects.SIZE, p.y * Objects.SIZE + y * Objects.SIZE);\r\n        ctx_s.fillRect(0, 0, Objects.SIZE, Objects.SIZE);\r\n        if (!exports.conspicuous && methods_1.getObject(p.x + x, p.y + y)?.name == \"Dekodor\")\r\n            exports.conspicuous = true;\r\n        ctx_s.restore();\r\n    };\r\n    for (let y = -1; y >= -radius; y--) {\r\n        if (methods_1.getObject(Player.character.x, Player.character.y + y)?.name === \"Wall\") {\r\n            rect(0, y);\r\n            break;\r\n        }\r\n        else\r\n            rect(0, y);\r\n    }\r\n    for (let x = 1; x <= radius; x++) {\r\n        if (methods_1.getObject(Player.character.x + x, Player.character.y)?.name === \"Wall\") {\r\n            rect(x);\r\n            break;\r\n        }\r\n        else\r\n            rect(x);\r\n    }\r\n    for (let y = 1; y <= radius; y++) {\r\n        if (methods_1.getObject(Player.character.x, Player.character.y + y)?.name === \"Wall\") {\r\n            rect(0, y);\r\n            break;\r\n        }\r\n        else\r\n            rect(0, y);\r\n    }\r\n    for (let x = -1; x >= -radius; x--) {\r\n        if (methods_1.getObject(Player.character.x + x, Player.character.y)?.name === \"Wall\") {\r\n            rect(x);\r\n            break;\r\n        }\r\n        else\r\n            rect(x);\r\n    }\r\n    for (let xy = -1; xy >= -radius; xy--) {\r\n        if (methods_1.getObject(Player.character.x + xy, Player.character.y + xy)?.name === \"Wall\") {\r\n            rect(xy, xy);\r\n            break;\r\n        }\r\n        else\r\n            rect(xy, xy);\r\n    }\r\n    for (let xy = 1; xy <= radius; xy++) {\r\n        if (methods_1.getObject(Player.character.x + xy, Player.character.y - xy)?.name === \"Wall\") {\r\n            rect(xy, -xy);\r\n            break;\r\n        }\r\n        else\r\n            rect(xy, -xy);\r\n    }\r\n    for (let xy = 1; xy <= radius; xy++) {\r\n        if (methods_1.getObject(Player.character.x + xy, Player.character.y + xy)?.name === \"Wall\") {\r\n            rect(xy, xy);\r\n            break;\r\n        }\r\n        else\r\n            rect(xy, xy);\r\n    }\r\n    for (let xy = -1; xy >= -radius; xy--) {\r\n        if (methods_1.getObject(Player.character.x + xy, Player.character.y - xy)?.name === \"Wall\") {\r\n            rect(xy, -xy);\r\n            break;\r\n        }\r\n        else\r\n            rect(xy, -xy);\r\n    }\r\n    if (methods_1.getObject(Player.character.x - 1, Player.character.y - 1)?.name !== \"Wall\")\r\n        rect(-1, -2), rect(-2, -1);\r\n    if (methods_1.getObject(Player.character.x + 1, Player.character.y - 1)?.name !== \"Wall\")\r\n        rect(1, -2), rect(2, -1);\r\n    if (methods_1.getObject(Player.character.x + 1, Player.character.y + 1)?.name !== \"Wall\")\r\n        rect(1, 2), rect(2, 1);\r\n    if (methods_1.getObject(Player.character.x - 1, Player.character.y + 1)?.name !== \"Wall\")\r\n        rect(-1, 2), rect(-2, 1);\r\n    if (scream + 16000 / 2 < Date.now()) {\r\n        if (!DekodorV && exports.conspicuous) {\r\n            DekodorV = true;\r\n            audio_1.GameAudio[\"Scary-Piano-Glissando\"].play();\r\n            scream = Date.now();\r\n        }\r\n        if (!exports.conspicuous)\r\n            DekodorV = false;\r\n    }\r\n    ctx_s.restore();\r\n}\r\nlet camera = { x: 0, y: 0 };\r\nfunction updateCamera() {\r\n    if (!Player.character)\r\n        return;\r\n    let cameraTarget = { x: 0, y: 0 };\r\n    cameraTarget.x = Player.character.x * Objects.SIZE - innerWidth / 2 + Objects.SIZE / 2;\r\n    cameraTarget.y = Player.character.y * Objects.SIZE - innerHeight / 2 + Objects.SIZE / 2;\r\n    camera.x += (cameraTarget.x - camera.x) / 20;\r\n    camera.y += (cameraTarget.y - camera.y) / 20;\r\n}\r\nconst alertElem = document.querySelector(\"#alert\");\r\nconst alertH2 = document.querySelector(\"#alert > h2\");\r\nfunction lose() {\r\n    console.log(\"lose\");\r\n    alertH2.innerHTML = \"You lose\";\r\n    alertElem.style.display = \"flex\";\r\n    _stop = true;\r\n}\r\nexports.lose = lose;\r\nfunction win() {\r\n    console.log(\"win\");\r\n    alertH2.innerHTML = \"You win\";\r\n    alertElem.style.display = \"flex\";\r\n    _stop = true;\r\n}\r\nexports.win = win;\r\nwindow.getObject = methods_1.getObject;\r\nwindow.lose = lose;\r\nwindow.win = win;\r\nconst FPS_Elem = document.querySelector(\"#fps\");\r\nsetInterval(() => {\r\n    FPS_Elem.innerHTML = `${_fps} FPS`;\r\n    _fps = 0;\r\n}, 1000);\r\n\n\n//# sourceURL=webpack://dekodor-game/./src/js/game.js?");

/***/ }),

/***/ "./src/js/global.js":
/*!**************************!*\
  !*** ./src/js/global.js ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Direction = exports.DirectionKeys = void 0;\r\nexports.DirectionKeys = [\"KeyW\", \"KeyD\", \"KeyA\", \"KeyS\"];\r\nexports.Direction = [\"U\", \"R\", \"L\", \"D\"];\r\n\n\n//# sourceURL=webpack://dekodor-game/./src/js/global.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst game_1 = __webpack_require__(/*! ./game */ \"./src/js/game.js\");\r\nconst start_btn = document.querySelector(\"#start_btn\");\r\nconst restart_btn = document.querySelector(\"#restart_btn\");\r\nconst menu_btn = document.querySelector(\"#menu_btn\");\r\nstart_btn.addEventListener(\"click\", () => {\r\n    show(\"game\");\r\n});\r\nrestart_btn.addEventListener(\"click\", () => {\r\n    game_1.openMap(0);\r\n});\r\nmenu_btn.addEventListener(\"click\", () => {\r\n    show(\"menu\");\r\n});\r\nfunction show(elemId) {\r\n    document.querySelectorAll(\"body > div\").forEach(e => e.style.display = \"none\");\r\n    document.querySelector(`body > div#${elemId}`).style.display = \"block\";\r\n    if (elemId == \"game\") {\r\n        game_1.openMap(0);\r\n    }\r\n    else if (elemId == \"menu\") {\r\n        game_1.exit();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://dekodor-game/./src/js/index.js?");

/***/ }),

/***/ "./src/js/methods.js":
/*!***************************!*\
  !*** ./src/js/methods.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.getObject = exports.setRGBA = exports.getRGBA = exports.moveObject = exports.getDirection = exports.getReverseDirection = void 0;\r\nconst game_1 = __webpack_require__(/*! ./game */ \"./src/js/game.js\");\r\nconst Objects = __webpack_require__(/*! ./objects */ \"./src/js/objects.js\");\r\nconst Dekodor = __webpack_require__(/*! ./Dekodor */ \"./src/js/Dekodor.js\");\r\nconst Player = __webpack_require__(/*! ./Player */ \"./src/js/Player.js\");\r\nfunction getReverseDirection(d) {\r\n    switch (d) {\r\n        case \"D\": return \"U\";\r\n        case \"L\": return \"R\";\r\n        case \"R\": return \"L\";\r\n        case \"U\": return \"D\";\r\n    }\r\n}\r\nexports.getReverseDirection = getReverseDirection;\r\nfunction getDirection(code) {\r\n    switch (code) {\r\n        case \"KeyW\": return \"U\";\r\n        case \"KeyD\": return \"R\";\r\n        case \"KeyA\": return \"L\";\r\n        case \"KeyS\": return \"D\";\r\n    }\r\n    throw Error();\r\n}\r\nexports.getDirection = getDirection;\r\nfunction moveObject(pos, direction) {\r\n    let _player = pos == Player.character?.pos;\r\n    let _Dekodor = pos == Dekodor.character?.pos;\r\n    let mainRGBA = getRGBA(pos);\r\n    let removeTarget = false;\r\n    let DekodorOnSkull = Dekodor.onSkull;\r\n    let moveTo;\r\n    switch (direction) {\r\n        case \"U\":\r\n            moveTo = -game_1.currentMapSize[0] * 4;\r\n            if (_player)\r\n                mainRGBA[2] = 255;\r\n            break;\r\n        case \"R\":\r\n            moveTo = 4;\r\n            if (_player)\r\n                mainRGBA[2] = 254;\r\n            break;\r\n        case \"L\":\r\n            moveTo = -4;\r\n            if (_player)\r\n                mainRGBA[2] = 253;\r\n            break;\r\n        case \"D\":\r\n            moveTo = game_1.currentMapSize[0] * 4;\r\n            if (_player)\r\n                mainRGBA[2] = 252;\r\n            break;\r\n    }\r\n    let targetRGBA = getRGBA(pos + moveTo);\r\n    switch (getObject(targetRGBA)?.name) {\r\n        case \"Wall\":\r\n            setRGBA(pos, mainRGBA);\r\n            return pos;\r\n        case \"Tank-U\":\r\n        case \"Tank-R\":\r\n        case \"Tank-L\":\r\n        case \"Tank-D\":\r\n            if (_Dekodor) {\r\n                game_1.lose();\r\n                return pos;\r\n            }\r\n        case \"Dekodor\":\r\n            if (_player) {\r\n                game_1.lose();\r\n                return pos;\r\n            }\r\n        case \"Skull\":\r\n            if (_player) {\r\n                if (game_1.addSkullCountPick() == game_1.SkullCount)\r\n                    game_1.win();\r\n                removeTarget = true;\r\n            }\r\n            if (_Dekodor && !DekodorOnSkull) {\r\n                Dekodor.OnSkull(true);\r\n                removeTarget = true;\r\n            }\r\n    }\r\n    if (_Dekodor && DekodorOnSkull && targetRGBA.join(\",\") == \"0,0,0,1\") {\r\n        Dekodor.OnSkull(false);\r\n        setRGBA(pos, [0, 0, 0, 0]);\r\n    }\r\n    else if (removeTarget)\r\n        setRGBA(pos, [0, 0, 0, 1]);\r\n    else\r\n        setRGBA(pos, targetRGBA);\r\n    setRGBA(pos + moveTo, mainRGBA);\r\n    return pos + moveTo;\r\n}\r\nexports.moveObject = moveObject;\r\nfunction getRGBA(pos) {\r\n    return [game_1.currentMap[pos + 0], game_1.currentMap[pos + 1], game_1.currentMap[pos + 2], game_1.currentMap[pos + 3]];\r\n}\r\nexports.getRGBA = getRGBA;\r\nfunction setRGBA(pos, RGBA, map = game_1.currentMap) {\r\n    map[pos + 0] = RGBA[0];\r\n    map[pos + 1] = RGBA[1];\r\n    map[pos + 2] = RGBA[2];\r\n    map[pos + 3] = RGBA[3];\r\n}\r\nexports.setRGBA = setRGBA;\r\nfunction getObject(a, b) {\r\n    if (Array.isArray(a))\r\n        return Objects.list.find(c => c.RGBA.join(\",\") == a.join(\",\")) ?? null;\r\n    else {\r\n        if (!game_1.currentMapSize)\r\n            return null;\r\n        return getObject(getRGBA(a * 4 + b * 4 * game_1.currentMapSize[1]));\r\n    }\r\n}\r\nexports.getObject = getObject;\r\n\n\n//# sourceURL=webpack://dekodor-game/./src/js/methods.js?");

/***/ }),

/***/ "./src/js/objects.js":
/*!***************************!*\
  !*** ./src/js/objects.js ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.list = exports.SIZE = exports.SPRITE_SIZE = void 0;\r\nexports.SPRITE_SIZE = 32;\r\nexports.SIZE = exports.SPRITE_SIZE * 3;\r\nexports.list = [\r\n    {\r\n        name: \"Wall\",\r\n        RGBA: [0, 0, 0, 255],\r\n        spritePos: 6\r\n    },\r\n    {\r\n        name: \"Tank-U\",\r\n        RGBA: [0, 0, 255, 255],\r\n        spritePos: 2\r\n    },\r\n    {\r\n        name: \"Tank-R\",\r\n        RGBA: [0, 0, 254, 255],\r\n        spritePos: 3\r\n    },\r\n    {\r\n        name: \"Tank-L\",\r\n        RGBA: [0, 0, 253, 255],\r\n        spritePos: 4\r\n    },\r\n    {\r\n        name: \"Tank-D\",\r\n        RGBA: [0, 0, 252, 255],\r\n        spritePos: 5\r\n    },\r\n    {\r\n        name: \"Dekodor\",\r\n        RGBA: [255, 0, 0, 255],\r\n        spritePos: 0\r\n    },\r\n    {\r\n        name: \"Skull\",\r\n        RGBA: [0, 0, 0, 0],\r\n        spritePos: 7\r\n    },\r\n];\r\n\n\n//# sourceURL=webpack://dekodor-game/./src/js/objects.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;