type HistoryActionType = 'task_completed' | 'award_redeemed';

type HistoryReferenceModel = 'Tasks' | 'Awards';

export interface HistoryEntry {
  _id: string;
  actionType: HistoryActionType;
  referenceModel: HistoryReferenceModel;
  date: string;
  referenceId: {
    _id: string;
    title?: string;
    description?: string;
    points?: number;
    awardTitle?: string;
    premiumImg?: string;
    awardPoints?: number;
  };
}
