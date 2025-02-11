/* eslint-disable @typescript-eslint/ban-types */
import type { CSSProperties } from "react";

import { UI, DayFlag, SelectionState } from "../UI.js";
import * as components from "../components/custom-components.js";
import {
  formatCaption,
  formatDay,
  formatMonthCaption,
  formatMonthDropdown,
  formatWeekdayName,
  formatWeekNumber,
  formatYearCaption,
  formatYearDropdown
} from "../formatters/index.js";
import {
  labelDayButton,
  labelNav,
  labelGrid,
  labelGridcell,
  labelMonthDropdown,
  labelNext,
  labelPrevious,
  labelWeekday,
  labelWeekNumber,
  labelWeekNumberHeader,
  labelYearDropdown
} from "../labels/index.js";
import { dateLib } from "../lib/index.js";

/**
 * Selection modes supported by DayPicker.
 *
 * - `single`: use DayPicker to select single days.
 * - `multiple`: allow selecting multiple days.
 * - `range`: use DayPicker to select a range of days.
 *
 * @see https://daypicker.dev/next/docs/selection-modes
 */
export type Mode = "single" | "multiple" | "range";

/**
 * The components that can be changed using the `components` prop.
 *
 * @see https://daypicker.dev/next/guides/custom-components
 */
export type CustomComponents = {
  /** Render any button element in DayPicker. */
  Button: typeof components.Button;
  /** Render the chevron icon used in the navigation buttons and dropdowns. */
  Chevron: typeof components.Chevron;
  /** Render the caption label of the month grid. */
  CaptionLabel: typeof components.CaptionLabel;
  /** Render the day cell in the month grid. */
  Day: typeof components.Day;
  /** Render the button containing the day in the day cell. */
  DayButton: typeof components.DayButton;
  /** Render the dropdown element to select years and months. */
  Dropdown: typeof components.Dropdown;
  /** Render the container of the dropdowns. */
  DropdownNav: typeof components.DropdownNav;
  /** Render the footer element announced by screen readers. */
  Footer: typeof components.Footer;
  /** Render the container of the MonthGrid. */
  Month: typeof components.Month;
  /** Render the caption of the month grid. */
  MonthCaption: typeof components.MonthCaption;
  /** Render the grid of days in a month. */
  MonthGrid: typeof components.MonthGrid;
  /** Wrapper of the month grids. */
  Months: typeof components.Months;
  /** Render the navigation element with the next and previous buttons. */
  Nav: typeof components.Nav;
  /** Render the `<option>` HTML element in the dropdown. */
  Option: typeof components.Option;
  /** Render the root element of the calendar. */
  Root: typeof components.Root;
  /** Render the select element in the dropdowns. */
  Select: typeof components.Select;
  /** Render the weeks section in the month grid. */
  Weeks: typeof components.Weeks;
  /** Render the week rows. */
  Week: typeof components.Week;
  /** Render the weekday name in the header. */
  Weekday: typeof components.Weekday;
  /** Render the row containing the week days. */
  Weekdays: typeof components.Weekdays;
  /** Render the cell with the number of the week. */
  WeekNumber: typeof components.WeekNumber;
  /** Render the header of the week number column. */
  WeekNumberHeader: typeof components.WeekNumberHeader;
};

export type DateLib = typeof dateLib;

/** Represent a map of formatters used to render localized content. */
export type Formatters = {
  /** Format the caption of a month grid. */
  formatCaption: typeof formatCaption;
  /** @deprecated Use {@link Formatters.formatCaption} instead. */
  formatMonthCaption: typeof formatMonthCaption;
  /** Format the label in the month dropdown. */
  formatMonthDropdown: typeof formatMonthDropdown;
  /** @deprecated Use {@link Formatters.formatYearDropdown} instead. */
  formatYearCaption: typeof formatYearCaption;
  /** Format the label in the year dropdown. */
  formatYearDropdown: typeof formatYearDropdown;
  /** Format the day in the day cell. */
  formatDay: typeof formatDay;
  /** Format the week number. */
  formatWeekNumber: typeof formatWeekNumber;
  /** Format the week day name in the header. */
  formatWeekdayName: typeof formatWeekdayName;
};

/** Map of functions to translate ARIA labels for the relative elements. */
export type Labels = {
  /** The label for the navigation toolbar. */
  labelNav: typeof labelNav;
  /** The label for the month grid. */
  labelGrid: typeof labelGrid;
  /** The label for the gridcell, when the calendar is not interactive. */
  labelGridcell: typeof labelGridcell;
  /** The label for the month dropdown. */
  labelMonthDropdown: typeof labelMonthDropdown;
  /** The label for the year dropdown. */
  labelYearDropdown: typeof labelYearDropdown;
  /** The label for the "next month" button. */
  labelNext: typeof labelNext;
  /** The label for the "previous month" button. */
  labelPrevious: typeof labelPrevious;
  /** The label for the day button.. */
  labelDayButton: typeof labelDayButton;
  /** @deprecated Use {@link labelDayButton} instead. */
  labelDay: typeof labelDayButton;
  /** The label for the weekday. */
  labelWeekday: typeof labelWeekday;
  /** The label for the week number. */
  labelWeekNumber: typeof labelWeekNumber;
  /**
   * Return the label for the column of the week number.
   *
   * @since 9.0.0
   */
  labelWeekNumberHeader: typeof labelWeekNumberHeader;
};

/**
 * A value or a function that matches a specific day.
 *
 * Matchers can be of different types:
 *
 * ```tsx
 * // will always match the day
 * const booleanMatcher: Matcher = true;
 *
 * // will match the today's date
 * const dateMatcher: Matcher = new Date();
 *
 * // will match the days in the array
 * const arrayMatcher: Matcher = [
 *   new Date(2019, 1, 2),
 *   new Date(2019, 1, 4)
 * ];
 *
 * // will match days after the 2nd of February 2019
 * const afterMatcher: DateAfter = { after: new Date(2019, 1, 2) };
 * // will match days before the 2nd of February 2019 }
 * const beforeMatcher: DateBefore = { before: new Date(2019, 1, 2) };
 *
 * // will match Sundays
 * const dayOfWeekMatcher: DayOfWeek = {
 *   dayOfWeek: 0
 * };
 *
 * // will match the included days, except the two dates
 * const intervalMatcher: DateInterval = {
 *   after: new Date(2019, 1, 2),
 *   before: new Date(2019, 1, 5)
 * };
 *
 * // will match the included days, including the two dates
 * const rangeMatcher: DateRange = {
 *   from: new Date(2019, 1, 2),
 *   to: new Date(2019, 1, 5)
 * };
 *
 * // will match when the function return true
 * const functionMatcher: Matcher = (day: Date) => {
 *   return day.getMonth() === 2; // match when month is March
 * };
 * ```
 */
export type Matcher =
  | boolean
  | ((date: Date) => boolean)
  | Date
  | Date[]
  | DateRange
  | DateBefore
  | DateAfter
  | DateInterval
  | DayOfWeek;

/**
 * A matcher to match a day falling after the specified date, with the date not
 * included.
 */
export type DateAfter = { after: Date };

/**
 * A matcher to match a day falling before the specified date, with the date not
 * included.
 */
export type DateBefore = { before: Date };

/**
 * A matcher to match a day falling before and/or after two dates, where the
 * dates are not included.
 */
export type DateInterval = { before: Date; after: Date };

/**
 * A matcher to match a range of dates. The range can be open. Differently from
 * {@link DateInterval}, the dates here are included.
 */
export type DateRange = { from: Date | undefined; to?: Date | undefined };

/**
 * A matcher to match a date being one of the specified days of the week (`0-6`,
 * where `0` is Sunday).
 */
export type DayOfWeek = { dayOfWeek: number[] };

/** A record with `data-*` attributes passed to `<DayPicker />`. */
export type DataAttributes = Record<`data-${string}`, unknown>;

/**
 * The event handler triggered when interacting with a day.
 *
 * @template EventType - The event type that triggered the day event.
 */
export type DayEventHandler<EventType> = (
  /** The date that has triggered the event. */
  date: Date,
  /** The modifiers belonging to the date. */
  modifiers: Modifiers,
  /** The DOM event that triggered this event. */
  e: EventType
) => void;

/** The event handler when a month is changed in the calendar. */
export type MonthChangeEventHandler = (month: Date) => void;

/** Maps user interface elements, selection states, and flags to a CSS style. */
export type Styles = {
  [key in UI | SelectionState | DayFlag]: CSSProperties | undefined;
};

/** Defines the class names for various UI components and states. */
export type ClassNames = {
  [key in UI | SelectionState | DayFlag]: string;
};

/** The flags that are matching a day in the calendar. */
export type DayFlags = Record<DayFlag, boolean>;

/** The selection state that are matching a day in the calendar. */
export type SelectionStates = Record<SelectionState, boolean>;

/** The modifiers that are matching a day in the calendar. */
export type Modifiers = DayFlags & SelectionStates & CustomModifiers;

/** The custom modifiers matching a day, passed to the `modifiers` prop. */
export type CustomModifiers = Record<string, boolean>;

/** The style to apply to each day element matching a modifier. */
export type ModifiersStyles = Record<string, CSSProperties> &
  Partial<Record<DayFlag, CSSProperties>>;

/** The classnames to assign to each day element matching a modifier. */
export type ModifiersClassNames = Record<string, string> &
  Partial<Record<DayFlag & SelectionState, string>>;

/**
 * The props that have been deprecated since version 9.0.0.
 *
 * @since 9.0.0
 * @see https://daypicker.dev/next/upgrading
 */
export type V9DeprecatedProps =
  /** Use `hidden` prop instead. */
  | "fromDate"
  /** Use `hidden` prop instead. */
  | "toDate"
  /** Use `startMonth` instead. */
  | "fromMonth"
  /** Use `endMonth` instead. */
  | "toMonth"
  /** Use `startMonth` instead. */
  | "fromYear"
  /** Use `endMonth` instead. */
  | "toYear";

export type MoveFocusDir = "after" | "before";

export type MoveFocusBy =
  | "day"
  | "week"
  | "startOfWeek"
  | "endOfWeek"
  | "month"
  | "year";
