"use client";
import React, { useState, useEffect } from "react";
import ReviewDetails from "./ReviewDetails";
import toast from "react-hot-toast";
import { Switch } from "@/components/ui/switch";


const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "All", value: "all" },
];
const typeOptions = [
    { label: "All Types", value: "all" },
    { label: "Product", value: "product" },
    { label: "Artisan", value: "artisan" }
];

const columns = [
    "Date",
    "Title",
    "Name",
    "Type",
    "Rating",
    "Thumb",
    "Approved",
    "Action",
    "View",
];

function EyeIcon() {
    return (
        <svg width="20" height="20" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M2 12C4.5 7 12 7 12 7s7.5 0 10 5c-2.5 5-10 5-10 5s-7.5 0-10-5z" /></svg>
    );
}


const ManageReviews = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [statusFilter, setStatusFilter] = useState("all");
    const [typeFilter, setTypeFilter] = useState("all");
    const [selectedReview, setSelectedReview] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    // console.log(allReviews)
    useEffect(() => {
        filterReviews();
    }, [allReviews, statusFilter, typeFilter]);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/saveReviews');
            const data = await response.json();
            if (response.ok && data.success) {
                // Ensure all data is properly serialized
                const processedReviews = data.reviews.map(review => ({
                    ...review,
                    // Ensure all object IDs are strings
                    _id: review._id?.toString(),
                    product: review.product?._id ? {
                        _id: review.product._id.toString(),
                        title: review.product.title
                    } : null,
                    artisan: review.artisan?._id ? {
                        _id: review.artisan._id.toString(),
                        name: review.artisan.name
                    } : null,
                    // Ensure thumb is properly formatted
                    thumb: review.thumb?.url ? {
                        url: review.thumb.url,
                        key: review.thumb.key || ''
                    } : null,
                    // Ensure dates are properly formatted
                    createdAt: review.createdAt ? new Date(review.createdAt).toISOString() : new Date().toISOString(),
                    updatedAt: review.updatedAt ? new Date(review.updatedAt).toISOString() : new Date().toISOString()
                }));

                setAllReviews(processedReviews);
                setFilteredReviews(processedReviews);
            } else {
                console.error('Failed to fetch reviews:', data.message);
            }
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const filterReviews = () => {
        let filtered = [...allReviews];

        // Filter by status
        if (statusFilter === 'active') {
            filtered = filtered.filter(review => review.active && !review.deleted);
        } else if (statusFilter === 'inactive') {
            filtered = filtered.filter(review => !review.active && !review.deleted);
        } else {
            filtered = filtered.filter(review => !review.deleted);
        }

        // Filter by type
        if (typeFilter !== 'all') {
            filtered = filtered.filter(review => review.type === typeFilter);
        }
        setFilteredReviews(filtered);
        setCurrentPage(1);
    };

    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
    };

    const handleTypeChange = (e) => {
        setTypeFilter(e.target.value);
    };

    const handleAction = async (id, action) => {
        try {
            let updates = { _id: id };

            // Determine the updates based on the action
            switch (action) {
                case 'active':
                    updates.active = true;
                    updates.deleted = false;
                    break;
                case 'inactive':
                    updates.active = false;
                    updates.deleted = false;
                    break;
                default:
                    throw new Error('Invalid action');
            }

            // Send the update
            const res = await fetch('/api/saveReviews', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || 'Action completed successfully');
                fetchReviews();
            } else {
                throw new Error(data.message || 'Failed to perform action');
            }
        } catch (error) {
            console.error('Error performing action:', error);
            toast.error(error.message || 'An error occurred');
        }
    };

    const handleToggleApproved = async (review) => {
        try {
            const isApproving = !review.approved;
            const updates = {
                _id: review._id,
                approved: isApproving,
                // If approving, ensure the review is also active and not deleted
                ...(isApproving && {
                    active: true,
                    deleted: false
                })
            };

            // Only create promotion when approving an artisan review
            if (isApproving && review.type === 'artisan' && review.artisan?._id) {
                updates.createPromotion = true;
            }

            const res = await fetch(`/api/saveReviews`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates)
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || `Review ${isApproving ? 'approved' : 'disapproved'} successfully`);
                if (isApproving && review.type === 'artisan') {
                    toast.success('Promotion created for this review');
                }
                fetchReviews();
            } else {
                throw new Error(data.message || `Failed to ${isApproving ? 'approve' : 'disapprove'} review`);
            }
        } catch (error) {
            console.error('Approval error:', error);
            toast.error(error.message || "Failed to update review status");
        }
    };
    // Pagination logic
    const indexOfLast = currentPage * reviewsPerPage;
    const indexOfFirst = indexOfLast - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
    // console.log(currentReviews)
    return (
        <div className="w-full max-w-5xl mx-auto rounded-xl shadow-sm border border-border bg-card px-6 py-8 my-12">
            {/* Filter Row */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6">
            {/* Existing status filter */}
            <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground mb-1">Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-border bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {statusOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* New type filter */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-foreground mb-1">Type</label>
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-border bg-background rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        {typeOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
      
            {/* Table */}
            <div className="overflow-x-auto bg-card rounded-xl border border-border shadow-sm">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col} className="py-3 px-4 border-b border-border font-semibold text-heading text-left text-sm">{col}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6">Loading...</td>
                            </tr>
                        ) : currentReviews.length > 0 ? (
                            currentReviews.map((review) => (
                                <tr key={review._id} className="hover:bg-muted/10 transition-colors border-b border-border last:border-0">
                                    {/* Date */}
                                    <td className="align-middle min-w-[150px] px-5 py-3 border-b border-border">{review.createdAt ? new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' }) : "-"}</td>
                                    {/* Title */}
                                    <td className="align-middle truncate max-w-[180px] px-5 py-3 border-b border-border">{review.title || '-'}</td>
                                    {/* Name */}
                                    <td className="align-middle min-w-[120px] px-5 py-3 border-b border-border">{review.name || '-'}</td>
                                    {/* Type */}
                                    <td className="align-middle px-5 py-3 border-b border-border">{review.type || '-'}</td>
                                    {/* Rating */}
                                    <td className="align-middle px-5 py-3 border-b border-border">{review.rating || '-'}</td>
                                    {/* Thumb */}
                                    <td className="align-middle px-5 py-3 border-b border-border">
                                        {review.thumb && review.thumb.url ? (
                                            <img
                                                src={review.thumb.url}
                                                alt="thumb"
                                                className="w-10 h-10 object-cover rounded border shadow-sm border-border"
                                            />
                                        ) : '-'}
                                    </td>
                                    {/* Approved */}
                                    <td className="align-middle px-5 py-3 border-b border-border">
                                        <Switch
                                            checked={!!review.approved}
                                            onCheckedChange={() => handleToggleApproved(review)}
                                        />
                                    </td>
                                    {/* Active Status */}
                                    <td className="align-middle px-5 py-3 border-b border-border">
                                        <Switch
                                            checked={!review.deleted && review.active}
                                            onCheckedChange={() => handleAction(review._id, review.active ? 'inactive' : 'active')}
                                            className={`${review.deleted ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={review.deleted}
                                            title={review.deleted ? 'Cannot activate deleted review' : ''}
                                        />
                                    </td>
                                    {/* View */}
                                    <td className="align-middle px-5 py-3 border-b border-border">
                                        <button className="icon-btn hover:bg-accent rounded p-2 transition-colors" onClick={() => setSelectedReview(review)}>
                                            <EyeIcon size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-6">No reviews found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="reviewlog-pagination-row">
                    <div className="pagination">
                        <button className="icon-btn" aria-label="Prev" disabled={currentPage === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                            <button
                                key={num}
                                className={`page-btn${num === currentPage ? " active" : ""}`}
                                onClick={() => setCurrentPage(num)}
                            >
                                {num}
                            </button>
                        ))}
                        <button className="icon-btn" aria-label="Next" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2"><path d="M9 6l6 6-6 6" /></svg>
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for review details */}
            {selectedReview && (
                <ReviewDetails
                    review={selectedReview}
                    onClose={() => setSelectedReview(null)}
                    onUpdate={fetchReviews}
                    onAction={handleAction}
                />
            )}

            {/* Styles (copied from ManageReviewLog for consistency) */}

        </div>
    );

};

export default ManageReviews;