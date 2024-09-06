import React from "react";
import { BackgroundBeamsWithCollision } from "../Containers/Background";
import { Game } from "./Game";

export function Background() {
  return (
    (<BackgroundBeamsWithCollision>
<Game/>
    </BackgroundBeamsWithCollision>)
  );
}
