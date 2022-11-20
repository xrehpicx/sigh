import { IsoDate } from "minio";

export interface WelcomePageProps {
    welcomeDocName: string;
    blist?: BucketItemFromList[];
    welcomeDocStruct?: BucketItem[];
    welcomeDocMap: [string, string][] | null;
}

export type DocData = { docString: string; lastModified: IsoDate }
export type MapItemType = [string, DocData];