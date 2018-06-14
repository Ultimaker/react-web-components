// Copyright (c) 2018 Ultimaker B.V.
import {createApp} from "../../../../src/utils/create_app.tsx";
import {App} from "./App.tsx";
import "../../../../src/sass/main.sass";

// create a new app on a DOM element with ID "root"
createApp("root", App, "./static/locales");
