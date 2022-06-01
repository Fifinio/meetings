export interface IMeeting {
  title: string;
  description: string;
  TimeZone: string;
  startTime: Date;
  endTime?: Date;
  location?: string;
  attendeesIds?: string[];
}
