'use strict';

/**
 * This file contains constant definitions of intents, slots
 * and utterances that are used in this skill.
 *
 * Refer to the following link for a list of built-in intents,
 * and what those intents do.
 * https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/built-in-intent-ref/standard-intents
 */

/**
 * This is a custom intent for this skill. It will allow
 * the user to search for real time departure times of
 * public transport vehicles near him.
 */
const SURROUNDING_AREA = "SurroundingArea";

const S_A_SLOTS = {
	"Verkehrsmittel": "PUBLIC_TRANSPORT"
};

const S_A_UTTERANCES = [
	"{Verkehrsmittel} in der Umgebung",
	"{Verkehrsmittel} im nahen Umfeld",
	"{Verkehrsmittel} um mich herum",
	"{Verkehrsmittel} in der Nähe"
];

/**
 * This is an Amazon built-in intent.
 */
const AMAZON_HELP = "AMAZON.HelpIntent";

/**
 * This is an Amazon built-in intent.
 */
const AMAZON_CANCEL = "AMAZON.CancelIntent";

/**
 * This is an Amazon built-in intent.
 */
const AMAZON_STOP = "AMAZON.StopIntent";

module.exports = {
    "SURROUNDING_AREA": SURROUNDING_AREA,
    "S_A_SLOTS": S_A_SLOTS,
    "S_A_UTTERANCES": S_A_UTTERANCES,
	"AMAZON_HELP": AMAZON_HELP,
	"AMAZON_CANCEL": AMAZON_CANCEL,
	"AMAZON_STOP": AMAZON_STOP
};
