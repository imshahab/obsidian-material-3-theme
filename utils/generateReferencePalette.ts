import {
  Hct,
  SchemeFidelity,
  hexFromArgb,
} from '@material/material-color-utilities';

import json2scss from 'json2scss-map';

const OBSIDIAN_PURPLE_ARGB = 0xff8758ff;
const PALETTE_SUPPORTED_TOKENS = [
  'black',
  'error0',
  'error10',
  'error100',
  'error20',
  'error30',
  'error40',
  'error50',
  'error60',
  'error70',
  'error80',
  'error90',
  'error95',
  'error99',
  'neutral-variant0',
  'neutral-variant10',
  'neutral-variant100',
  'neutral-variant20',
  'neutral-variant30',
  'neutral-variant40',
  'neutral-variant50',
  'neutral-variant60',
  'neutral-variant70',
  'neutral-variant80',
  'neutral-variant90',
  'neutral-variant95',
  'neutral-variant99',
  'neutral0',
  'neutral10',
  'neutral100',
  'neutral12',
  'neutral17',
  'neutral20',
  'neutral22',
  'neutral24',
  'neutral30',
  'neutral4',
  'neutral40',
  'neutral50',
  'neutral6',
  'neutral60',
  'neutral70',
  'neutral80',
  'neutral87',
  'neutral90',
  'neutral92',
  'neutral94',
  'neutral95',
  'neutral96',
  'neutral98',
  'neutral99',
  'primary0',
  'primary10',
  'primary100',
  'primary20',
  'primary30',
  'primary40',
  'primary50',
  'primary60',
  'primary70',
  'primary80',
  'primary90',
  'primary95',
  'primary99',
  'secondary0',
  'secondary10',
  'secondary100',
  'secondary20',
  'secondary30',
  'secondary40',
  'secondary50',
  'secondary60',
  'secondary70',
  'secondary80',
  'secondary90',
  'secondary95',
  'secondary99',
  'tertiary0',
  'tertiary10',
  'tertiary100',
  'tertiary20',
  'tertiary30',
  'tertiary40',
  'tertiary50',
  'tertiary60',
  'tertiary70',
  'tertiary80',
  'tertiary90',
  'tertiary95',
  'tertiary99',
  'white',
];

const color = Hct.fromInt(OBSIDIAN_PURPLE_ARGB);
const lightScheme = new SchemeFidelity(color, false, 0.0);

const newColors = {};

const re = /([^\d]+)(\d*)/;
for (const token of PALETTE_SUPPORTED_TOKENS) {
  const results = token.match(re);
  if (!results) continue;

  const paletteName = results[1];
  const tone = results[2];

  let newColor: Hct;
  switch (paletteName) {
    case 'primary':
      newColor = lightScheme.primaryPalette.getHct(Number(tone));
      break;

    case 'secondary':
      newColor = lightScheme.secondaryPalette.getHct(Number(tone));
      break;

    case 'tertiary':
      newColor = lightScheme.tertiaryPalette.getHct(Number(tone));
      break;

    case 'error':
      newColor = lightScheme.errorPalette.getHct(Number(tone));
      break;

    case 'neutral':
      newColor = lightScheme.neutralPalette.getHct(Number(tone));
      break;

    case 'neutral-variant':
      newColor = lightScheme.neutralVariantPalette.getHct(Number(tone));
      break;

    case 'white':
      newColor = Hct.fromInt(0xffffffff);
      break;

    case 'black':
      newColor = Hct.fromInt(0xff000000);
      break;

    default:
      throw new Error(`Unhandled color: ${paletteName}${tone}`);
  }

  newColors[token] = hexFromArgb(newColor.toInt());
}

const scssMap = json2scss.convertJs(newColors, {"colorConversion": false});
console.log(scssMap)
