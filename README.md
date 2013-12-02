IronbaneAssets
==============

The assets for Ironbane, the open source MMO.

Instructions for importing models
---------------------------------
1. Make sure you have Python 2.7.x installed first
2. Export your model to .OBJ
3. In your assets folder, copy your [model] .OBJ file to ```images/meshes```
4. In your assets folder, copy your [texture] .png file to ```images/textures``` 
5. Log into your MySQL database for ironbane and add a new row inside ```ib_meshes``` for your newly created mesh. Follow the template of the other rows.
6. Stop the server if it is running.
7. Run ```grunt``` in the root folder.
7. Start the server.


