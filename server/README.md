# Server

The structure of an API response is:

```json
{
  "status": number,
  "type": "SUCCESS" | "ERROR",
  "message": {}
}
```

- `status`: returns the HTTP status code of the response. It will usually be a
  200 (even if the word has not been found).
- `type`: indicates whether the request has been successful (the phonetics for
  the word have been found) or erroneous (this word has not been found).
- `message`: body of the response: phonetics, error message, etc.

The server provides the following API:

## Phonetics API

### `/phonetics/:word`

It returns the phonetics of a word. It is based on the
[CMU Pronouncing Dictionary](http://www.speech.cs.cmu.edu/cgi-bin/cmudict), and
it essentially gets the entry from a set of files.

In some cases, a word can have two alternative phonetics. In this case, we will
send both.

#### Example

`/phonetics/awesomely` returns:

```json
{
  "status": 200,
  "type": "SUCCESS",
  "message": {
    "phonetics": "AA1 S AH0 M L IY0",
    "alternativePhonetics": "AO1 S AH0 M L IY0",
    "word": "aviation"
  }
}
```

## Rhyming API

### `/rhymes/:word/:word`

It determines whether two words rhyme or not. Instead of returning a simple
boolean, it returns an identifier based on this
[classification](https://en.wikipedia.org/wiki/Rhyme#Perfect_rhymes). Currently
it only focuses on perfect rhymes, although there are many more. Perfect rhymes
can be classified according to the number of syllables included in the rhyme,
which is dictated by the location of the final stressed syllable.

- `single`: a rhyme in which the stress is on the final syllable of the words
  (rhyme, sublime).
- `double`: a rhyme in which the stress is on the penultimate (second from last)
  syllable of the words (picky, tricky).
- `dactylics`: a rhyme in which the stress is on the antepenultimate (third from
  last) syllable (cacophonies, Aristophanes).

#### Example

`rhymes/bee/rupee` returns:

```json
{
  "status": 200,
  "type": "SUCCESS",
  "message": {
    "type": "single",
    "rhyme": true
  }
}
```
