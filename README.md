IronbaneAssets
==============

The assets for Ironbane, the open source MMO.

Instructions for importing models
---------------------------------
1. Make sure you have Python 2.7.x installed first
2. Export your model to .OBJ
3. Copy your [model] .OBJ file to \\IronbaneAssets\images\meshes (folder)
4. Copy your [texture] .png file to \\IronbaneAssets\images\textures (folder)
5. Log into your MySQL database for ironbane and add a new row inside ```ib_meshes``` for your newly created mesh. Follow the template of the other rows.
6. Stop the server if it is running.
7. Run ```grunt``` in the root folder.
7. Start the server.
