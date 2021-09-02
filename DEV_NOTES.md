# OVERVIEW

-The main map area is DS1's Firelink Shrine / north cemetery.  
-The player icon may walk freely around the map area. Viewport scrolls to next set of 10x10 tiles when player walks to side of screen.  
-The map has collision barriers so that the player cannot walk out of bounds/overtop of walls.  
-The map has visual depth - the player icon can walk behind certain structures.  
-Player may interact with entities (bonfire, NPCs, items)

#

## COMBAT

-Enemy NPCs will walk towards player when player is in view  
-Enemies return to original spawn when player moves out of view  
-When enemy NPCs' collision box touches the player's collision box (<1 pixels away), combat will trigger.

- ??? rock paper scissors-style minigame?   
    -Shield, Magic, Sword?   
    -Each round lost, player loses 1 out of 5 hearts.  
    -Each round won, enemy loses 1 heart (skeletons only have 1 heart)  
    -If a tie, both player and enemy lose a heart.

-Player health persists outside of minigame window.  
-Health may only be replenished by drinking an Estus flask.  
-Estus flasks may only be consumed outside of combat.  
-Estus flasks restore health to full, no matter how many hearts the player has.  
-Player carries only 3 Estus flasks. Estus may be replenished by interacting with the bonfire  
-Interacting with the bonfire respawns the enemies in the world.

#

## SCALABLE DEVELOPMENT

-save instancing/sessions/database  
-More animated sprites  
-A second map area/loading screen  
-Boss battle  
-Other consumables(bombs, potions, etc)  
-hidden King-A*** NPC  