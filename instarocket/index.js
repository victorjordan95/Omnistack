/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native'

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket',
    "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

AppRegistry.registerComponent(appName, () => App);
