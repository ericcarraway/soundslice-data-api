/**
 * Value 1: Bar - Required. The zero-based bar number in the slice, as an integer.
 * Value 2: Time - Required. Timecode in the audio, in seconds, as a float.
 * Value 3: Percentage into the bar - Optional. Distance into the bar.
 *
 * "Syncpoint data format"
 * @see https://www.soundslice.com/help/data-api/#syncpointdata
 */
export type Syncpoint = Array<[number, number, number?]>;

/** https://www.soundslice.com/help/data-api/#createrecording */
interface CreateRecordingsParamsBase {
  // If not given, this will be "Audio" or "Video", depending on the type of recording.
  name?: string;

  // Required
  source: number;

  source_data?: string;

  hls_url?: string;
}

interface CreateRecordingParamsWithScorehash
  extends CreateRecordingsParamsBase {
  scorehash: string;
}

interface CreateRecordingParamsWithSlug extends CreateRecordingsParamsBase {
  slug: number | string;
}

export type CreateRecordingParams =
  | CreateRecordingParamsWithScorehash
  | CreateRecordingParamsWithSlug;
