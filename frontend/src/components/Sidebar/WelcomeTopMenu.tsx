import { useGetUserQuery } from '../../store/api/backendApi';

const formatDate = (dateString?: string | null): string => {
    if (!dateString) return 'Неизвестно';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU').format(date);
};

export const WelcomeTopMenu = () => {
    const { data } = useGetUserQuery();
    const user = data?.user;

    const registrationDate = user?.createdAt || new Date().toISOString();

    return (
        <div className="hidden items-end justify-center w-full xl:hidden 2xl:flex flex-5">
            <div className="flex flex-col items-center justify-center text-center text-gray-100/90">
                <p className="text-base font-semibold text-center uppercase">
                    Welcome, {user?.name?.split(' ')[0] || 'User'}!
                </p>
                <p className="text-sm">
                    Member since <br />
                    <span className="font-medium">{formatDate(registrationDate)}</span>
                </p>
            </div>
        </div>
    );
};
