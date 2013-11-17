IronbaneAssets
==============

The assets for Ironbane, the open source MMO.

Instructions for Importing Models
---------------------------------
1) Make sure you have Python 2.7.X Installed first
2) Export your model to .OBJ
3) Copy your [model] .OBJ file to \\IronbaneAssets\images\meshes (folder)
4) Copy your [texture] .png file to \\IronbaneAssets\images\textures (folder)
5) Inside the \\IronbaneAssets\images\meshes folder, Shift+Right Click -> Open command window here
6) Type: convert_obj_three.py -i inputFile.obj -o outputFile.js
7) Log into your MySQL database for ironbane and use:
INSERT INTO `ironbane`.`ib_meshes` (
 `id`,
 `name`,
 `category`,
 `filename`,
 `scale`,
 `transparent`,
 `t1`, `ts1`,  `t2`, `ts2`,
 `t3`, `ts3`, `t4`, `ts4`,
 `t5`, `ts5`, `t6`, `ts6`,
 `t7`, `ts7`, `t8`, `ts8`, `special`
) VALUES (
  ID Number No Quotes
 'Name',
 'Category',
 'filename.obj',
 '1.00',
 '1',
 'textures/textureName', '1.00', 'tiles/1', '1.00',
 'tiles/1', '1.00', 'tiles/1', '1.00',
 'tiles/1', '1.00', 'tiles/1', '1.00',
 'tiles/1', '1.00', 'tiles/1', '1.00', '0');

8) Restart server with "grunt" then "node ironbane.js start" through command prompt at root folder.
