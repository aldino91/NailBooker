import InterfaceReturnFetch from '../../interface/interfReturnfetch';

export interface BasesUseCaseUsers<T> {
	execute: (dto: T) => Promise<InterfaceReturnFetch>;
}
