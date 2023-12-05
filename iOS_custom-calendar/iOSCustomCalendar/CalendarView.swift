//
//  CalendarView.swift
//  iOSCustomCalendar
//
//  Created by binghuan on 2023/12/6.
//

import SwiftUI

struct CalendarView: View {
    @Binding var selectedDate: Date
    
    // Explicit public initializer
    public init(selectedDate: Binding<Date>) {
        self._selectedDate = selectedDate
    }
    
    private var month: [Date] = Calendar.current.generateDates(
        inside: Date().monthInterval,
        matching: DateComponents(hour: 0, minute: 0, second: 0)
    )

    var body: some View {
        LazyVGrid(columns: Array(repeating: GridItem(), count: 7)) {
            ForEach(month, id: \.self) { date in
                Text("\(date, formatter: DateFormatter.dayFormatter)")
                    .frame(maxWidth: .infinity, maxHeight: .infinity)
                    .background(selectedDate.isSameDay(as: date) ? Color.blue : Color.clear)
                    .contentShape(Rectangle()) // Add contentShape modifier here
                    .onTapGesture {
                        print("Selected date: \(date)")
                        self.selectedDate = date
                    }
            }
        }
    }
}


extension DateFormatter {
    static var dayFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "d"
        return formatter
    }()
}

extension Date {
    var monthInterval: DateInterval {
        Calendar.current.dateInterval(of: .month, for: self)!
    }

    func isSameDay(as date: Date) -> Bool {
        Calendar.current.isDate(self, inSameDayAs: date)
    }
}

extension Calendar {
    func generateDates(inside interval: DateInterval, matching components: DateComponents) -> [Date] {
        var dates: [Date] = []
        dates.append(interval.start)

        enumerateDates(startingAfter: interval.start, matching: components, matchingPolicy: .nextTime) { date, _, stop in
            if let date = date {
                if date < interval.end {
                    dates.append(date)
                } else {
                    stop = true
                }
            }
        }

        return dates 

    }
}

struct CalendarView_Previews: PreviewProvider {
    struct PreviewWrapper: View {
        @State private var selectedDate = Date() // Default date for preview

        var body: some View {
            CalendarView(selectedDate: $selectedDate)
        }
    }

    static var previews: some View {
        PreviewWrapper()
    }
}
