// Copyright (c) 2018 Ultimaker B.V.
import {createApp} from "../../src/utils/create_app";
import {App} from "../app"

// create a new app on a DOM element with ID "root"
createApp("root", <App/>, "./static/locales")
